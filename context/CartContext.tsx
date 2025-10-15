"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { Product } from '@/data/products';

export type CartItem = {
	productId: string;
	title: string;
	price: number;
	quantity: number;
	image: string;
	unit: string;
	slug: string;
};

type CartState = { items: CartItem[] };

type CartAction =
	| { type: 'ADD'; item: CartItem }
	| { type: 'REMOVE'; productId: string }
	| { type: 'SET_QTY'; productId: string; quantity: number }
	| { type: 'CLEAR' };

function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case 'ADD': {
			const exists = state.items.find(i => i.productId === action.item.productId);
			if (exists) {
				return {
					items: state.items.map(i => i.productId === action.item.productId ? { ...i, quantity: i.quantity + action.item.quantity } : i),
				};
			}
			return { items: [...state.items, action.item] };
		}
		case 'REMOVE':
			return { items: state.items.filter(i => i.productId !== action.productId) };
		case 'SET_QTY':
			return { items: state.items.map(i => i.productId === action.productId ? { ...i, quantity: action.quantity } : i) };
		case 'CLEAR':
			return { items: [] };
		default:
			return state;
	}
}

const CartContext = createContext<{
	state: CartState;
	addToCart: (product: Product, quantity?: number) => void;
	removeFromCart: (productId: string) => void;
	setQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	subtotal: number;
	totalItems: number;
    shipping: number;
    total: number;
} | null>(null);

const STORAGE_KEY = 'farming_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(
        cartReducer,
        undefined,
        () => {
            // lazy init: читаем localStorage однократно на клиенте
            if (typeof window === 'undefined') return { items: [] } as CartState;
            try {
                const raw = window.localStorage.getItem(STORAGE_KEY);
                if (!raw) return { items: [] } as CartState;
                const parsed = JSON.parse(raw) as CartState;
                if (parsed && Array.isArray(parsed.items)) {
                    return { items: parsed.items } as CartState;
                }
            } catch {}
            return { items: [] } as CartState;
        }
    );

	// persist
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch {}
	}, [state]);

	const addToCart = (product: Product, quantity = 1) => {
		dispatch({ type: 'ADD', item: {
			productId: product.id,
			title: product.title,
			price: product.price,
			quantity,
			image: product.image,
			unit: product.unit,
			slug: product.slug,
		}});
	};

	const removeFromCart = (productId: string) => dispatch({ type: 'REMOVE', productId });
	const setQuantity = (productId: string, quantity: number) => dispatch({ type: 'SET_QTY', productId, quantity });
	const clearCart = () => dispatch({ type: 'CLEAR' });

    const subtotal = useMemo(() => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0), [state.items]);
	const totalItems = useMemo(() => state.items.reduce((sum, i) => sum + i.quantity, 0), [state.items]);
    // политика доставки: 200 ₽, бесплатно при subtotal >= 1000 ₽ и если корзина не пуста
    const shipping = useMemo(() => {
        if (state.items.length === 0) return 0;
        return subtotal >= 1000 ? 0 : 200;
    }, [state.items.length, subtotal]);
    const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

	return (
        <CartContext.Provider value={{ state, addToCart, removeFromCart, setQuantity, clearCart, subtotal, totalItems, shipping, total }}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within CartProvider');
	return ctx;
}

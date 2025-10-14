"use client";

import { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export function AddToCartButton({ product }: { product: Product }) {
	const { addToCart } = useCart();
	const [qty, setQty] = useState(1);
	return (
		<div style={{display:'flex', gap: 8, alignItems:'center'}}>
			<div style={{display:'flex', alignItems:'center', gap: 6}}>
				<button className="btn" onClick={() => setQty(q => Math.max(1, q-1))}>-</button>
				<span>{qty}</span>
				<button className="btn" onClick={() => setQty(q => q+1)}>+</button>
			</div>
			<button className="btn" onClick={() => addToCart(product, qty)}>Добавить в корзину</button>
		</div>
	);
}

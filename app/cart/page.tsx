"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
	const { state, setQuantity, removeFromCart, subtotal, clearCart } = useCart();
	return (
		<div style={{display:'grid', gap: 16}}>
			<h1 style={{fontSize:24}}>Корзина</h1>
			{state.items.length === 0 ? (
				<div>
					<p>Ваша корзина пуста.</p>
					<Link className="btn" href="/products">Перейти в каталог</Link>
				</div>
			) : (
				<div style={{display:'grid', gap: 16}}>
					{state.items.map(item => (
						<div key={item.productId} className="card" style={{display:'grid', gridTemplateColumns:'100px 1fr auto', gap:12, alignItems:'center', padding:12}}>
							<Image src={item.image} alt={item.title} width={120} height={90} style={{width:100, height:70, objectFit:'cover', borderRadius:8}} />
							<div>
								<strong>{item.title}</strong>
								<div className="muted">{item.unit}</div>
								<div style={{display:'flex', gap:8, alignItems:'center', marginTop:8}}>
									<button className="btn" onClick={() => setQuantity(item.productId, Math.max(1, item.quantity - 1))}>-</button>
									<span>{item.quantity}</span>
									<button className="btn" onClick={() => setQuantity(item.productId, item.quantity + 1)}>+</button>
									<button className="btn" onClick={() => removeFromCart(item.productId)}>Удалить</button>
								</div>
							</div>
							<div style={{textAlign:'right'}}>
								<div className="price">{item.price * item.quantity} ₽</div>
							</div>
						</div>
					))}
					<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
						<button className="btn" onClick={clearCart}>Очистить</button>
						<div>
							<strong>Итого: {subtotal} ₽</strong>
						</div>
					</div>
					<div>
						<Link className="btn" href="/checkout">Оформить заказ</Link>
					</div>
				</div>
			)}
		</div>
	);
}

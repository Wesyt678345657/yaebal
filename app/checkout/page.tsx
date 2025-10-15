"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { formatCurrencyRub } from '../../lib/currency';

export default function CheckoutPage() {
	const { subtotal, shipping, total, clearCart } = useCart();
	const [status, setStatus] = useState<'idle' | 'success'>('idle');

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setStatus('success');
		clearCart();
	}

	if (status === 'success') {
		return (
			<div style={{display:'grid', gap: 12}}>
				<h1>Спасибо за заказ!</h1>
				<p className="muted">Мы свяжемся с вами для подтверждения.</p>
			</div>
		);
	}

	return (
		<div style={{display:'grid', gap: 16}}>
			<h1>Оформление заказа</h1>
			<div className="card" style={{padding: 12, display:'grid', gap: 8, maxWidth: 520}}>
				<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
					<span className="muted">Товары</span>
					<span className="price">{formatCurrencyRub(subtotal)}</span>
				</div>
				<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
					<span className="muted">Доставка</span>
					<span className="price">{shipping === 0 ? 'Бесплатно' : formatCurrencyRub(shipping)}</span>
				</div>
				<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
					<strong>Итого</strong>
					<strong className="price">{formatCurrencyRub(total)}</strong>
				</div>
			</div>
			<form onSubmit={handleSubmit} style={{display:'grid', gap: 12, maxWidth: 520}}>
				<input required placeholder="Имя" style={{padding: 10, borderRadius:8, border:'1px solid #2b3040', background:'#0c0f14', color:'white'}} />
				<input required placeholder="Телефон" style={{padding: 10, borderRadius:8, border:'1px solid #2b3040', background:'#0c0f14', color:'white'}} />
				<input required placeholder="Адрес доставки" style={{padding: 10, borderRadius:8, border:'1px solid #2b3040', background:'#0c0f14', color:'white'}} />
				<button className="btn" type="submit">Подтвердить</button>
			</form>
		</div>
	);
}

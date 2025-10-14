"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
	const { subtotal, clearCart } = useCart();
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
			<p>Сумма к оплате: <strong>{subtotal} ₽</strong></p>
			<form onSubmit={handleSubmit} style={{display:'grid', gap: 12, maxWidth: 520}}>
				<input required placeholder="Имя" style={{padding: 10, borderRadius:8, border:'1px solid #2b3040', background:'#0c0f14', color:'white'}} />
				<input required placeholder="Телефон" style={{padding: 10, borderRadius:8, border:'1px solid #2b3040', background:'#0c0f14', color:'white'}} />
				<input required placeholder="Адрес доставки" style={{padding: 10, borderRadius:8, border:'1px solid #2b3040', background:'#0c0f14', color:'white'}} />
				<button className="btn" type="submit">Подтвердить</button>
			</form>
		</div>
	);
}

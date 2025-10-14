"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
	const { totalItems } = useCart();
	return (
		<header className="header">
			<Link href="/" className="logo">Фермерский Маркет</Link>
			<nav>
				<Link href="/products">Каталог</Link>
				<Link href="/cart">Корзина ({totalItems})</Link>
			</nav>
		</header>
	);
}

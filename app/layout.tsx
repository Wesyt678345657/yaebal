import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';

export const metadata: Metadata = {
	title: 'Фермерский Маркет',
	description: 'Мини маркетплейс фермерских продуктов',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru">
			<body>
				<CartProvider>
					<Header />
					<main className="container">{children}</main>
				</CartProvider>
			</body>
		</html>
	);
}

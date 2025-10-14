import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
	return (
		<div>
			<section style={{display:'grid', gap: 16, marginBottom: 24}}>
				<h1 style={{margin: 0, fontSize: 28, lineHeight: 1.2}}>Фермерский Маркет</h1>
				<p className="muted">Свежие продукты напрямую от фермеров вашего региона</p>
				<div>
					<Link className="btn" href="/products">Каталог</Link>
				</div>
			</section>
			<section>
				<h2 style={{fontSize: 20}}>Популярное</h2>
				<div className="grid" style={{marginTop: 12}}>
					{products.map(p => (
						<ProductCard key={p.id} product={p} />
					))}
				</div>
			</section>
		</div>
	);
}

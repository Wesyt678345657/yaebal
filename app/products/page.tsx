import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function ProductsPage() {
	return (
		<div>
			<h1 style={{fontSize:24}}>Каталог</h1>
			<div className="grid" style={{marginTop: 12}}>
				{products.map(p => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
		</div>
	);
}

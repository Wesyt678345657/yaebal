"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
	const { addToCart } = useCart();
	return (
		<article className="card">
			<Link href={`/products/${product.slug}`} style={{display:'block'}}>
				<Image src={product.image} alt={product.title} width={600} height={400} style={{width:'100%', height: 180, objectFit:'cover'}} />
			</Link>
			<div style={{padding: 14, display:'grid', gap: 8}}>
				<Link href={`/products/${product.slug}`}><h3 style={{margin:0, fontSize:16}}>{product.title}</h3></Link>
				<p className="muted" style={{margin:0}}>{product.farmer}</p>
				<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
					<span className="price">{product.price} ₽ / {product.unit}</span>
					<button className="btn" onClick={() => addToCart(product)}>В корзину</button>
				</div>
			</div>
		</article>
	);
}

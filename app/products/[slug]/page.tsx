import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { AddToCartButton } from './sections';

export default function ProductDetail({ params }: { params: { slug: string } }) {
	const product = getProductBySlug(params.slug);
	if (!product) return notFound();
	return (
		<div style={{display:'grid', gap: 16}}>
			<Image src={product.image} alt={product.title} width={900} height={600} style={{width:'100%', height: 360, objectFit:'cover', borderRadius: 12}} />
			<h1 style={{marginBottom:0}}>{product.title}</h1>
			<p className="muted" style={{marginTop:0}}>{product.farmer}</p>
			<p>{product.description}</p>
			<div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
				<div><strong className="price">{product.price} ₽</strong> <span className="muted">/ {product.unit}</span></div>
				<AddToCartButton product={product} />
			</div>
		</div>
	);
}

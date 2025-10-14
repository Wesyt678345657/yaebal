export type Product = {
	id: string;
	slug: string;
	title: string;
	description: string;
	price: number; // in RUB
	image: string;
	category: string;
	farmer: string;
	unit: string; // e.g., кг, литр, шт
};

export const products: Product[] = [
	{
		id: '1',
		slug: 'organic-apples',
		title: 'Яблоки органические',
		description: 'Сладкие и хрустящие, без химии. Сад Ивана.',
		price: 180,
		image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1200&auto=format&fit=crop',
		category: 'Фрукты',
		farmer: 'Иван Петров',
		unit: 'кг',
	},
	{
		id: '2',
		slug: 'goat-milk',
		title: 'Козье молоко',
		description: 'Нежное, фермерское. Утренний надой.',
		price: 260,
		image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1200&auto=format&fit=crop',
		category: 'Молочные продукты',
		farmer: 'Ферма "Белая коза"',
		unit: 'литр',
	},
	{
		id: '3',
		slug: 'free-range-eggs',
		title: 'Яйца деревенские',
		description: 'Свободный выгул, желток яркий.',
		price: 120,
		image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984dd?q=80&w=1200&auto=format&fit=crop',
		category: 'Яйца',
		farmer: 'Агро-усадьба "Лесная"',
		unit: '10 шт',
	},
	{
		id: '4',
		slug: 'buckwheat-honey',
		title: 'Гречишный мёд',
		description: 'Ароматный, густой, 100% натуральный.',
		price: 450,
		image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
		category: 'Мёд',
		farmer: 'Пасека "Северный мёд"',
		unit: '0.5 л',
	},
];

export function getProductBySlug(slug: string): Product | undefined {
	return products.find(p => p.slug === slug);
}

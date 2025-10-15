/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"images.unsplash.com",
			"plus.unsplash.com",
			"cdn.pixabay.com"
		]
	},
	async headers() {
		const ContentSecurityPolicy = [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline'", // Next.js runtime may inline small scripts
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data: https://images.unsplash.com https://plus.unsplash.com https://cdn.pixabay.com",
			"font-src 'self' data:",
			"connect-src 'self'",
		].join('; ');

		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'Content-Security-Policy', value: ContentSecurityPolicy },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
					{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
				],
			},
		];
	}
};

export default nextConfig;

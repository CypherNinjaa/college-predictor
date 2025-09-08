/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.jsdelivr.net",
				port: "",
				pathname: "/**",
			},
		],
		formats: ["image/webp", "image/avif"],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	experimental: {
		optimizePackageImports: ["react-icons"],
		optimizeCss: true,
	},
	compress: true,
	poweredByHeader: false,
	reactStrictMode: true,
	swcMinify: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			config.optimization.splitChunks = {
				chunks: "all",
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			};
		}

		// Suppress React DevTools source map warnings in development
		if (dev) {
			config.devtool = "eval-source-map";
			config.ignoreWarnings = [
				/Failed to parse source map/,
				/Source map error/,
			];
		}

		return config;
	},
};

module.exports = nextConfig;

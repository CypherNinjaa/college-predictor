import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "600", "700"],
	preload: true,
	fallback: ["system-ui", "arial", "sans-serif"],
	adjustFontFallback: false,
});

export const metadata = {
	title:
		"Bihar Nursing College Predictor 2025 | Free DCECE ANM/GNM College Prediction by Study With Ritesh",
	description:
		"🏥 Free Bihar nursing college predictor with 95% accuracy! Get AI-powered DCECE predictions for ANM, GNM & DRESSER programs. 2,111+ colleges, expert guidance by Study With Ritesh coaching center. Start now!",
	keywords:
		"Bihar nursing college predictor, DCECE 2025, ANM college prediction, GNM college prediction, Study With Ritesh, Bihar nursing admission, DCECE rank predictor, nursing college Bihar, medical college predictor, DCECE PMM, DCECE PM, nursing coaching Bihar",
	openGraph: {
		title: "Bihar Nursing College Predictor 2025 | Study With Ritesh",
		description:
			"🏥 Get accurate nursing college predictions for Bihar DCECE 2025. Free AI-powered tool covering 2,111+ colleges. Expert guidance from Study With Ritesh coaching.",
		type: "website",
		locale: "en_IN",
		siteName: "Bihar Nursing College Predictor",
	},
	twitter: {
		card: "summary_large_image",
		title: "Bihar Nursing College Predictor 2025 | Study With Ritesh",
		description:
			"🏥 Free DCECE nursing college predictions with 95% accuracy. ANM, GNM & DRESSER programs covered.",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	alternates: {
		canonical: "https://bihar-nursing-predictor.vercel.app",
	},
	other: {
		"google-adsense-account": "ca-pub-XXXXXXXXXX", // Add your AdSense account here
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={inter.className}>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link rel="dns-prefetch" href="https://www.googletagmanager.com" />

				{/* Favicon */}
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>

				{/* Google AdSense - Replace with your actual AdSense client ID when available */}
				{process.env.NODE_ENV === "production" &&
					process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
						<script
							async
							src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
							crossOrigin="anonymous"
						></script>
					)}

				{/* Structured Data for SEO */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "WebApplication",
							name: "Bihar Nursing College Predictor",
							description:
								"Free AI-powered college predictor for Bihar nursing admissions. Get accurate DCECE rank-based predictions for ANM, GNM and DRESSER programs.",
							url: "https://bihar-nursing-predictor.vercel.app",
							applicationCategory: "EducationalApplication",
							operatingSystem: "Web Browser",
							offers: {
								"@type": "Offer",
								price: "0",
								priceCurrency: "INR",
								availability: "https://schema.org/InStock",
							},
							provider: {
								"@type": "Organization",
								name: "Study With Ritesh",
								url: "https://bihar-nursing-predictor.vercel.app",
								sameAs: [
									"https://www.youtube.com/@studywithritesh",
									"https://www.instagram.com/studywithritesh",
									"https://t.me/studywithritesh",
								],
							},
							audience: {
								"@type": "Audience",
								audienceType: "Bihar nursing students and DCECE aspirants",
							},
						}),
					}}
				/>
			</head>
			<body className={`${inter.className} antialiased`}>
				<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
					{/* Header */}
					<Header />

					{/* Main Content */}
					<main>{children}</main>

					{/* Footer */}
					<Footer />
				</div>
			</body>
		</html>
	);
}

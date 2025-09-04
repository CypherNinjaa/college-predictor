import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title:
		"Bihar Nursing College Predictor 2025 | Find Your Perfect ANM/GNM College",
	description:
		"Free DCECE ANM/GNM College Prediction with AI Guidance - Find the best nursing colleges in Bihar based on your rank and category. Get accurate predictions for Bihar nursing admissions.",
	keywords:
		"DCECE, Bihar nursing colleges, ANM, GNM, college predictor, nursing admission, DCECE rank predictor, Bihar nursing admission 2025",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
					{/* Navigation Header */}
					<header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex items-center justify-between h-16">
								{/* Logo and Brand */}
								<div className="flex items-center space-x-3">
									<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg">
										<svg
											className="w-6 h-6 text-white"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
										</svg>
									</div>
									<div>
										<h1 className="text-xl font-bold text-newton-900">
											Bihar Nursing College Predictor
										</h1>
										<p className="text-xs text-newton-600 font-medium">
											DCECE 2025 • ANM & GNM Admissions
										</p>
									</div>
								</div>

								{/* Free Badge */}
								<div className="hidden sm:flex items-center space-x-2">
									<div className="flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">
										<svg
											className="w-4 h-4"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
										<span>No Hidden Charges, 100% Free</span>
									</div>
								</div>
							</div>
						</div>
					</header>

					{/* Main Content */}
					<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{children}
					</main>

					{/* Footer */}
					<footer className="bg-newton-900 text-white mt-20">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{/* Brand Section */}
								<div className="space-y-4">
									<div className="flex items-center space-x-3">
										<div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg">
											<svg
												className="w-5 h-5 text-white"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
											</svg>
										</div>
										<span className="text-xl font-bold">
											Bihar Nursing Predictor
										</span>
									</div>
									<p className="text-newton-300 text-sm leading-relaxed">
										Get accurate AI-powered predictions for Bihar nursing
										college admissions. Find your perfect ANM & GNM college
										based on DCECE rank and category.
									</p>
								</div>

								{/* Features */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold">Features</h3>
									<ul className="space-y-2 text-newton-300 text-sm">
										<li className="flex items-center space-x-2">
											<span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
											<span>AI-Driven Predictions</span>
										</li>
										<li className="flex items-center space-x-2">
											<span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
											<span>Latest DCECE 2025 Data</span>
										</li>
										<li className="flex items-center space-x-2">
											<span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
											<span>Category-wise Analysis</span>
										</li>
										<li className="flex items-center space-x-2">
											<span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
											<span>Safety Level Indicators</span>
										</li>
									</ul>
								</div>

								{/* Contact Info */}
								<div className="space-y-4">
									<h3 className="text-lg font-semibold">Information</h3>
									<div className="text-newton-300 text-sm space-y-2">
										<p>Built for Bihar nursing students</p>
										<p>Data from DCECE 2025 official sources</p>
										<p className="text-accent-green font-medium">
											100% Free • No Registration Required
										</p>
									</div>
								</div>
							</div>

							{/* Bottom Bar */}
							<div className="border-t border-newton-700 mt-8 pt-8 text-center">
								<p className="text-newton-400 text-sm">
									© 2025 Bihar Nursing College Predictor.
									<span className="text-accent-green font-medium">
										{" "}
										AI-Powered Predictions
									</span>
								</p>
								<p className="text-newton-500 text-xs mt-2">
									Disclaimer: Predictions based on previous year trends and data
									analysis. Official counseling results may vary.
								</p>
							</div>
						</div>
					</footer>
				</div>
			</body>
		</html>
	);
}

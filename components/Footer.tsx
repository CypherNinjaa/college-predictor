import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
					{/* Brand Section */}
					<div className="lg:col-span-2 space-y-6">
						<div className="flex items-center space-x-4">
							<div className="relative">
								<Image
									src="/assets/SRW logo 1 (1).png"
									alt="Study With Ritesh Logo"
									width={60}
									height={60}
									className="rounded-xl shadow-lg"
									loading="lazy"
									style={{ width: "auto", height: "auto" }}
								/>
							</div>
							<div>
								<h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
									Study With Ritesh
								</h3>
								<p className="text-slate-300 text-sm">
									Bihar's Premier Nursing Coaching
								</p>
							</div>
						</div>

						<p className="text-slate-300 leading-relaxed max-w-lg">
							Empowering Bihar nursing students since 2016 with AI-powered
							college predictions and expert DCECE guidance. Join thousands of
							successful candidates who achieved their nursing dreams with us.
						</p>

						{/* Stats */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
							<div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
								<div className="text-xl font-bold text-blue-400">2,111+</div>
								<div className="text-xs text-slate-400">Colleges</div>
							</div>
							<div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
								<div className="text-xl font-bold text-green-400">95%</div>
								<div className="text-xs text-slate-400">Accuracy</div>
							</div>
							<div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
								<div className="text-xl font-bold text-purple-400">50K+</div>
								<div className="text-xs text-slate-400">Students</div>
							</div>
							<div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 text-center">
								<div className="text-xl font-bold text-yellow-400">FREE</div>
								<div className="text-xs text-slate-400">Forever</div>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-6">
						<h4 className="text-lg font-semibold text-blue-400 flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								/>
							</svg>
							Quick Links
						</h4>
						<div className="space-y-3">
							<Link
								href="#predictor"
								className="block text-slate-300 hover:text-blue-400 transition-colors text-sm"
							>
								🎯 College Predictor
							</Link>
							<Link
								href="#coaching"
								className="block text-slate-300 hover:text-blue-400 transition-colors text-sm"
							>
								🏫 Coaching Center
							</Link>
							<a
								href="https://www.youtube.com/@studywithritesh"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-slate-300 hover:text-blue-400 transition-colors text-sm"
							>
								📹 Free Classes
							</a>
							<a
								href="https://t.me/studywithritesh"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-slate-300 hover:text-blue-400 transition-colors text-sm"
							>
								💬 Join Community
							</a>
						</div>
					</div>

					{/* Programs & Social */}
					<div className="space-y-6">
						<h4 className="text-lg font-semibold text-green-400 flex items-center">
							<svg
								className="w-5 h-5 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Programs
						</h4>
						<div className="space-y-3">
							<div className="flex items-center space-x-2 text-sm text-slate-300">
								<span className="w-2 h-2 bg-blue-400 rounded-full"></span>
								<span>ANM (Auxiliary Nursing)</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-slate-300">
								<span className="w-2 h-2 bg-green-400 rounded-full"></span>
								<span>GNM (General Nursing)</span>
							</div>
							<div className="flex items-center space-x-2 text-sm text-slate-300">
								<span className="w-2 h-2 bg-purple-400 rounded-full"></span>
								<span>DRESSER (Medical Assistant)</span>
							</div>
						</div>

						{/* Social Links */}
						<div className="pt-4">
							<h5 className="text-sm font-medium text-slate-300 mb-3">
								Connect With Us
							</h5>
							<div className="flex space-x-3">
								<a
									href="https://www.youtube.com/@studywithritesh"
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 bg-red-500/20 hover:bg-red-500 rounded-full flex items-center justify-center transition-all group"
								>
									<svg
										className="w-5 h-5 text-red-400 group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
									</svg>
								</a>
								<a
									href="https://www.instagram.com/studywithritesh"
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all group"
								>
									<svg
										className="w-5 h-5 text-pink-400 group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
									</svg>
								</a>
								<a
									href="https://t.me/studywithritesh"
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all group"
								>
									<svg
										className="w-5 h-5 text-blue-400 group-hover:text-white"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
									</svg>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-slate-700/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
						<div className="text-center sm:text-left">
							<p className="text-slate-400 text-sm">
								© 2025{" "}
								<span className="font-medium text-blue-400">
									Study With Ritesh
								</span>{" "}
								• Bihar Nursing College Predictor
							</p>
							<p className="text-slate-500 text-xs mt-1">
								🏥 Made with ❤️ for Bihar Nursing Students • 🤖 AI-Powered
								Predictions
							</p>
						</div>
						<div className="flex items-center space-x-4 text-xs">
							<span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full font-medium">
								100% Free Forever
							</span>
							<span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full font-medium">
								95% Accuracy
							</span>
						</div>
					</div>

					{/* Disclaimer */}
					<div className="mt-6 pt-4 border-t border-slate-700/30">
						<p className="text-slate-500 text-xs text-center leading-relaxed">
							<span className="font-medium">Disclaimer:</span> Predictions are
							based on historical data analysis and AI algorithms. Official
							counseling results may vary. This tool is for guidance only.
							Please verify with official DCECE sources and counseling
							authorities.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

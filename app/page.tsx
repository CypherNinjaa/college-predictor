import PredictForm from "@/components/PredictForm";

export default function HomePage() {
	return (
		<div className="space-y-16">
			{/* Hero Section */}
			<div className="text-center space-y-8 pt-8">
				<div className="max-w-4xl mx-auto space-y-6">
					<h1 className="text-5xl md:text-6xl font-bold text-newton-900 leading-tight">
						Bihar Nursing College Predictor
						<span className="block text-primary-600 text-4xl md:text-5xl mt-2">
							2025
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-newton-600 max-w-3xl mx-auto leading-relaxed">
						Get AI-powered predictions for Bihar nursing colleges based on your
						DCECE rank. Discover ANM and GNM programs that match your profile.
					</p>

					{/* Trust Indicators */}
					<div className="flex flex-wrap justify-center items-center gap-6 text-sm pt-4">
						<div className="flex items-center text-accent-green font-medium">
							<svg
								className="w-5 h-5 mr-2"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
							No Hidden Charges, 100% Free
						</div>
						<div className="flex items-center text-newton-600">
							<svg
								className="w-5 h-5 mr-2 text-primary-500"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
								/>
							</svg>
							76,850 DCECE 2025 Aspirants have already predicted their college
						</div>
					</div>
				</div>
			</div>

			{/* Stats Section with Newton Style */}
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="bg-white rounded-2xl p-8 text-center shadow-newton hover:shadow-newton-lg transition-shadow duration-300">
						<div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
							1,575+
						</div>
						<div className="text-newton-600 font-medium">
							Nursing Colleges in Database
						</div>
						<div className="text-sm text-newton-500 mt-1">
							ANM & GNM Programs
						</div>
					</div>
					<div className="bg-white rounded-2xl p-8 text-center shadow-newton hover:shadow-newton-lg transition-shadow duration-300">
						<div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
							9
						</div>
						<div className="text-newton-600 font-medium">
							Category Types Supported
						</div>
						<div className="text-sm text-newton-500 mt-1">
							UR, SC, ST, OBC, EWS & More
						</div>
					</div>
					<div className="bg-white rounded-2xl p-8 text-center shadow-newton hover:shadow-newton-lg transition-shadow duration-300">
						<div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
							2025
						</div>
						<div className="text-newton-600 font-medium">
							Latest DCECE Cutoffs
						</div>
						<div className="text-sm text-newton-500 mt-1">
							Updated & Verified Data
						</div>
					</div>
				</div>
			</div>

			{/* AI Predictions Feature Section */}
			<div className="max-w-6xl mx-auto hidden md:block">
				<div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white">
					<div className="max-w-4xl mx-auto text-center space-y-6">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Accurate, AI-Driven Predictions Using Past Data Trends
						</h2>
						<p className="text-lg md:text-xl text-blue-100 leading-relaxed">
							Our DCECE college predictor employs a powerful AI-driven
							methodology that has been trained on years of DCECE data and
							trends. By analyzing DCECE rank vs marks patterns from previous
							years alongside official cut-off ranks and admission statistics,
							the tool can align its predictions with the latest exam difficulty
							and scoring trends.
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
								<div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
									<svg
										className="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<h3 className="text-lg font-semibold mb-2">
									Real-time Adjustments
								</h3>
								<p className="text-blue-200 text-sm">
									Adapts to exam difficulty changes and current scenario trends
								</p>
							</div>
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
								<div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
									<svg
										className="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
									</svg>
								</div>
								<h3 className="text-lg font-semibold mb-2">
									Historical Analysis
								</h3>
								<p className="text-blue-200 text-sm">
									Factors in opening & closing ranks, seat availability data
								</p>
							</div>
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
								<div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
									<svg
										className="w-6 h-6 text-white"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								</div>
								<h3 className="text-lg font-semibold mb-2">
									Accurate Estimates
								</h3>
								<p className="text-blue-200 text-sm">
									Precise college admission chances with safety indicators
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Prediction Form */}
			<div className="max-w-4xl mx-auto">
				<PredictForm />
			</div>

			{/* How it Works Section */}
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-newton-900 mb-4">
						How Our Predictor Works
					</h2>
					<p className="text-xl text-newton-600 max-w-3xl mx-auto">
						Our advanced AI algorithm combines historical data with machine
						learning to provide accurate college predictions
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="text-center space-y-4">
						<div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto">
							<span className="text-2xl font-bold text-white">1</span>
						</div>
						<h3 className="text-xl font-semibold text-newton-900">
							Enter Your Details
						</h3>
						<p className="text-newton-600">
							Input your DCECE rank and category to get started with
							personalized predictions
						</p>
					</div>

					<div className="text-center space-y-4">
						<div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto">
							<span className="text-2xl font-bold text-white">2</span>
						</div>
						<h3 className="text-xl font-semibold text-newton-900">
							AI Analysis
						</h3>
						<p className="text-newton-600">
							Our AI analyzes historical trends and current data to predict your
							college options
						</p>
					</div>

					<div className="text-center space-y-4">
						<div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto">
							<span className="text-2xl font-bold text-white">3</span>
						</div>
						<h3 className="text-xl font-semibold text-newton-900">
							Get Results
						</h3>
						<p className="text-newton-600">
							Receive detailed college list with safety levels and AI counselor
							advice
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

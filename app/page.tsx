import PredictForm from "@/components/PredictForm";
import SuccessStories from "@/components/SuccessStories";
import WhyChoosePredictor from "@/components/WhyChoosePredictor";
import CoachingSection from "@/components/CoachingSection";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
	return (
		<div className="space-y-20">
			{/* Hero Section with Medical Theme */}
			<section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
				<div className="absolute inset-0">
					{/* Medical Pattern Background */}
					<div className="absolute inset-0 opacity-5">
						<svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
							<pattern
								id="medical-cross"
								x="0"
								y="0"
								width="20"
								height="20"
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M10 3L10 17M3 10L17 10"
									stroke="#1e40af"
									strokeWidth="1"
									strokeLinecap="round"
								/>
							</pattern>
							<rect width="100" height="100" fill="url(#medical-cross)" />
						</svg>
					</div>
				</div>

				<div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
					<div className="text-center space-y-8">
						{/* Main Hero Content */}
						<div className="max-w-4xl mx-auto space-y-6">
							<div className="inline-flex items-center bg-medical-light text-medical-blue px-4 py-2 rounded-full text-sm font-medium mb-6">
								<svg
									className="w-4 h-4 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								🏥 Bihar's #1 Nursing College Predictor • 100% Free
							</div>

							<h1 className="text-4xl md:text-6xl font-bold text-medical-dark leading-tight">
								Find Your Perfect
								<span className="block text-medical-blue">Nursing College</span>
								<span className="block text-3xl md:text-4xl text-green-600 mt-2">
									DCECE 2025 🩺
								</span>
							</h1>

							<p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
								Get AI-powered predictions for Bihar nursing colleges based on
								your DCECE rank.
								<span className="text-medical-blue font-semibold">
									ANM, GNM & DRESSER programs
								</span>{" "}
								- all in one place with expert guidance from Study With Ritesh.
							</p>
						</div>

						{/* Hero Stats */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light">
								<div className="text-3xl font-bold text-medical-blue">
									2,111+
								</div>
								<div className="text-sm text-gray-600 font-medium">
									Nursing Colleges
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light">
								<div className="text-3xl font-bold text-green-600">85%</div>
								<div className="text-sm text-gray-600 font-medium">
									Accuracy Rate
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light">
								<div className="text-3xl font-bold text-purple-600">50K+</div>
								<div className="text-sm text-gray-600 font-medium">
									Students Helped
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light">
								<div className="text-3xl font-bold text-red-500">FREE</div>
								<div className="text-sm text-gray-600 font-medium">
									No Hidden Charges
								</div>
							</div>
						</div>

						{/* CTA Buttons */}
						<div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
							<a
								href="#predictor"
								className="bg-medical-blue hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center space-x-2"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span>Start Prediction Now</span>
							</a>
							<a
								href="#coaching"
								className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center space-x-2"
							>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
								</svg>
								<span>Join Our Coaching</span>
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Study With Ritesh Coaching Section */}
			<CoachingSection />

			{/* Medical Features Section */}
			<WhyChoosePredictor />

			{/* College Predictor Form */}
			<section id="predictor" className="py-16">
				<div className="max-w-4xl mx-auto px-4">
					<PredictForm />
				</div>
			</section>

			{/* Success Stories Section */}
			<SuccessStories />

			{/* SEO-Friendly FAQ Section */}
			<section className="py-16">
				<div className="max-w-4xl mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-medical-dark mb-4">
							❓ Frequently Asked Questions
						</h2>
						<p className="text-xl text-gray-600">
							Everything you need to know about Bihar nursing college admissions
						</p>
					</div>

					<div className="space-y-6">
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light">
							<h3 className="text-lg font-semibold text-medical-dark mb-2">
								How accurate is the Bihar nursing college predictor?
							</h3>
							<p className="text-gray-600">
								Our AI-powered predictor has a 95% accuracy rate, trained on
								historical DCECE data from 2020-2025. It analyzes rank trends,
								cutoff patterns, and seat availability to provide reliable
								predictions.
							</p>
						</div>

						<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light">
							<h3 className="text-lg font-semibold text-medical-dark mb-2">
								Which nursing programs are covered in the predictor?
							</h3>
							<p className="text-gray-600">
								We cover all major nursing programs in Bihar including ANM
								(Auxiliary Nursing & Midwifery), GNM (General Nursing &
								Midwifery), and DRESSER programs across 2,111+ colleges.
							</p>
						</div>

						<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light">
							<h3 className="text-lg font-semibold text-medical-dark mb-2">
								Is the college predictor really free to use?
							</h3>
							<p className="text-gray-600">
								Yes, absolutely! Our Bihar nursing college predictor is 100%
								free with no hidden charges. We believe in supporting nursing
								aspirants and making quality guidance accessible to all.
							</p>
						</div>

						<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light">
							<h3 className="text-lg font-semibold text-medical-dark mb-2">
								How does Study With Ritesh coaching help with DCECE preparation?
							</h3>
							<p className="text-gray-600">
								Study With Ritesh offers comprehensive DCECE coaching with 8+
								years of experience, 95% success rate, daily live classes, mock
								tests, and personalized mentorship for nursing aspirants.
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

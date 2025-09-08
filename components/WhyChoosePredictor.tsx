"use client";

import { useState, useEffect } from "react";

interface Feature {
	id: number;
	icon: string;
	title: string;
	description: string;
	color: string;
}

export default function WhyChoosePredictor() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	const features: Feature[] = [
		{
			id: 1,
			icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
			title: "AI-Powered Accuracy",
			description:
				"Advanced machine learning algorithms trained on years of DCECE data for 95% accurate predictions",
			color: "from-blue-500 to-blue-700",
		},
		{
			id: 2,
			icon: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z",
			title: "Complete Database",
			description:
				"2,111+ nursing colleges including ANM, GNM, and DRESSER programs with latest 2025 cutoffs",
			color: "from-green-500 to-green-700",
		},
		{
			id: 3,
			icon: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z",
			title: "Expert Guidance",
			description:
				"AI counselor advice backed by Study With Ritesh's 8+ years of nursing education expertise",
			color: "from-purple-500 to-purple-700",
		},
	];

	// Check if mobile view
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Auto slideshow for mobile only
	useEffect(() => {
		if (!isMobile) return;

		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % features.length);
		}, 3500); // Change slide every 3.5 seconds

		return () => clearInterval(interval);
	}, [features.length, isMobile]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % features.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	if (isMobile) {
		// Mobile: Slider view
		return (
			<section className="py-12 bg-medical-light/30">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-8">
						<h2 className="text-2xl md:text-3xl font-bold text-medical-dark mb-3">
							🏥 Why Choose Our Predictor?
						</h2>
						<p className="text-lg text-gray-600 max-w-3xl mx-auto">
							Built specifically for Bihar nursing students
						</p>
					</div>

					{/* Mobile Slider */}
					<div className="relative">
						<div className="overflow-hidden rounded-2xl">
							<div
								className="flex transition-transform duration-500 ease-in-out"
								style={{
									transform: `translateX(-${currentSlide * 100}%)`,
								}}
							>
								{features.map((feature) => (
									<div key={feature.id} className="w-full flex-shrink-0 px-2">
										<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light text-center">
											<div
												className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
											>
												<svg
													className="w-8 h-8 text-white"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d={feature.icon} />
												</svg>
											</div>
											<h3 className="text-xl font-bold text-medical-dark mb-3">
												{feature.title}
											</h3>
											<p className="text-gray-600 leading-relaxed">
												{feature.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Navigation Arrows */}
						<button
							onClick={prevSlide}
							className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-medical-blue p-2 rounded-full shadow-md transition-all duration-200 z-10"
							aria-label="Previous feature"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</button>

						<button
							onClick={nextSlide}
							className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-medical-blue p-2 rounded-full shadow-md transition-all duration-200 z-10"
							aria-label="Next feature"
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
								<path
									fillRule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>

					{/* Slide Indicators */}
					<div className="flex justify-center mt-6 space-x-2">
						{features.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
									index === currentSlide ? "bg-medical-blue w-8" : "bg-gray-300"
								}`}
								aria-label={`Go to feature ${index + 1}`}
							/>
						))}
					</div>

					{/* Auto-play indicator */}
					<div className="text-center mt-3">
						<div className="inline-flex items-center text-xs text-gray-500">
							<div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-1.5 animate-pulse"></div>
							Auto-sliding
						</div>
					</div>
				</div>
			</section>
		);
	}

	// Desktop: Grid view
	return (
		<section className="py-16 bg-medical-light/30">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-medical-dark mb-4">
						🏥 Why Choose Our Predictor?
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Built specifically for Bihar nursing students with medical expertise
						and data science
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature) => (
						<div
							key={feature.id}
							className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-medical-light group"
						>
							<div
								className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
							>
								<svg
									className="w-8 h-8 text-white"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d={feature.icon} />
								</svg>
							</div>
							<h3 className="text-xl font-bold text-medical-dark mb-4 text-center">
								{feature.title}
							</h3>
							<p className="text-gray-600 text-center leading-relaxed">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

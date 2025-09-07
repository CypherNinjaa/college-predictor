"use client";

import { useState, useEffect } from "react";

interface Story {
	id: number;
	name: string;
	college: string;
	program: string;
	testimonial: string;
	rating: number;
	avatar: string;
}

export default function SuccessStories() {
	const [currentSlide, setCurrentSlide] = useState(0);

	const stories: Story[] = [
		{
			id: 1,
			name: "Priya Kumari",
			college: "P.M.I. Patna",
			program: "GNM",
			testimonial:
				"Study With Ritesh sir's guidance and this predictor helped me get into my dream college. The predictions were spot on!",
			rating: 5,
			avatar: "P",
		},
		{
			id: 2,
			name: "Rahul Singh",
			college: "A.N.M.M.C.H. Gaya",
			program: "ANM",
			testimonial:
				"Excellent coaching quality and this free predictor tool made my preparation journey so much easier. Highly recommended!",
			rating: 5,
			avatar: "R",
		},
		{
			id: 3,
			name: "Sunita Devi",
			college: "S.K.M.C.H.",
			program: "DRESSER",
			testimonial:
				"The PMM prediction was accurate and Ritesh sir's classes helped me crack DCECE. Thank you so much!",
			rating: 5,
			avatar: "S",
		},
		{
			id: 4,
			name: "Amit Kumar",
			college: "D.M.C.H. Darbhanga",
			program: "GNM",
			testimonial:
				"Amazing guidance! The mock tests and prediction accuracy helped me secure admission in my preferred college.",
			rating: 5,
			avatar: "A",
		},
		{
			id: 5,
			name: "Neha Sharma",
			college: "Nursing School Muzaffarpur",
			program: "ANM",
			testimonial:
				"Study With Ritesh's teaching methodology is outstanding. The predictor gave me confidence in my choices.",
			rating: 5,
			avatar: "N",
		},
		{
			id: 6,
			name: "Vikash Gupta",
			college: "Medical College Bhagalpur",
			program: "DRESSER",
			testimonial:
				"Perfect predictions and excellent coaching. Ritesh sir's support throughout the journey was incredible!",
			rating: 5,
			avatar: "V",
		},
	];

	// Auto slideshow functionality
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % stories.length);
		}, 4000); // Change slide every 4 seconds

		return () => clearInterval(interval);
	}, [stories.length]);

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % stories.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	const getVisibleStories = () => {
		// Desktop: show 3 stories, Mobile: show 1 story
		const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
		const storiesPerView = isMobile ? 1 : 3;

		const visibleStories = [];
		for (let i = 0; i < storiesPerView; i++) {
			const index = (currentSlide + i) % stories.length;
			visibleStories.push(stories[index]);
		}
		return visibleStories;
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: rating }, (_, i) => (
			<span key={i} className="text-yellow-400">
				⭐
			</span>
		));
	};

	const getAvatarColor = (avatar: string) => {
		const colors = [
			"from-blue-500 to-blue-700",
			"from-green-500 to-green-700",
			"from-purple-500 to-purple-700",
			"from-red-500 to-red-700",
			"from-indigo-500 to-indigo-700",
			"from-pink-500 to-pink-700",
		];
		const index = avatar.charCodeAt(0) % colors.length;
		return colors[index];
	};

	return (
		<section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
			<div className="max-w-7xl mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-medical-dark mb-4">
						🌟 Success Stories
					</h2>
					<p className="text-xl text-gray-600">
						Hear from students who achieved their nursing dreams
					</p>
				</div>

				{/* Slideshow Container */}
				<div className="relative">
					{/* Stories Display */}
					<div className="overflow-hidden">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500 ease-in-out">
							{getVisibleStories().map((story, index) => (
								<div
									key={`${story.id}-${currentSlide}-${index}`}
									className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light transform transition-all duration-500 hover:shadow-xl hover:scale-105"
								>
									<div className="flex items-center mb-4">
										<div
											className={`w-12 h-12 bg-gradient-to-br ${getAvatarColor(
												story.avatar
											)} rounded-full flex items-center justify-center text-white font-bold text-lg`}
										>
											{story.avatar}
										</div>
										<div className="ml-3">
											<h4 className="font-semibold text-medical-dark">
												{story.name}
											</h4>
											<p className="text-sm text-gray-600">
												Selected in {story.college} ({story.program})
											</p>
										</div>
									</div>
									<p className="text-gray-600 italic mb-3 leading-relaxed">
										"{story.testimonial}"
									</p>
									<div className="flex">{renderStars(story.rating)}</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation Arrows */}
					<button
						onClick={prevSlide}
						className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 text-medical-blue p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-medical-blue"
						aria-label="Previous testimonial"
					>
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</button>

					<button
						onClick={nextSlide}
						className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 text-medical-blue p-3 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-medical-blue"
						aria-label="Next testimonial"
					>
						<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>

				{/* Slide Indicators */}
				<div className="flex justify-center mt-8 space-x-2">
					{stories.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-3 h-3 rounded-full transition-all duration-200 ${
								index === currentSlide
									? "bg-medical-blue w-8"
									: "bg-gray-300 hover:bg-gray-400"
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>

				{/* Auto-play indicator */}
				<div className="text-center mt-4">
					<div className="inline-flex items-center text-sm text-gray-500">
						<div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
						Auto-playing every 4 seconds
					</div>
				</div>
			</div>
		</section>
	);
}

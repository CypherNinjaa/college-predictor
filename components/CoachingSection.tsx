"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function CoachingSection() {
	const [currentSlide, setCurrentSlide] = useState(0);

	// Memoize slide change function
	const goToSlide = useCallback((index: number) => {
		setCurrentSlide(index);
	}, []);

	// Optimize auto-slide with reduced frequency
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % features.length);
		}, 4000); // Increased from 3000ms to 4000ms for better UX

		return () => clearInterval(timer);
	}, []);

	const features = [
		{
			icon: (
				<svg
					className="w-5 h-5 text-white"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			),
			text: "Complete DCECE Syllabus Coverage",
			bgColor: "bg-blue-50",
			iconColor: "bg-medical-blue",
		},
		{
			icon: (
				<svg
					className="w-5 h-5 text-white"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			),
			text: "Daily Live Classes & Doubt Sessions",
			bgColor: "bg-green-50",
			iconColor: "bg-green-600",
		},
		{
			icon: (
				<svg
					className="w-5 h-5 text-white"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			),
			text: "Mock Tests & Previous Year Papers",
			bgColor: "bg-purple-50",
			iconColor: "bg-purple-600",
		},
		{
			icon: (
				<svg
					className="w-5 h-5 text-white"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			),
			text: "Personal Mentorship & Career Guidance",
			bgColor: "bg-orange-50",
			iconColor: "bg-orange-600",
		},
		{
			icon: (
				<svg
					className="w-5 h-5 text-white"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			),
			text: "Study Materials & Notes in Hindi",
			bgColor: "bg-indigo-50",
			iconColor: "bg-indigo-600",
		},
	];

	// Auto-slide functionality for mobile
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % features.length);
		}, 3000); // Change slide every 3 seconds

		return () => clearInterval(interval);
	}, [features.length]);

	return (
		<section
			id="coaching"
			className="bg-gradient-to-br from-blue-50 via-white to-medical-light py-20"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center bg-medical-blue/10 text-medical-blue px-6 py-3 rounded-full text-sm font-medium mb-6">
						<svg
							className="w-4 h-4 mr-2"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
						</svg>
						🏥 Premium DCECE Coaching
					</div>
					<h2 className="text-4xl md:text-5xl font-bold text-medical-dark mb-6">
						Study With <span className="text-medical-blue">Ritesh</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Bihar's Premier Nursing Coaching Institute with 8+ years of proven
						excellence in DCECE preparation
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
					{/* Left Side - Brand & Stats */}
					<div className="space-y-8">
						{/* Brand Logo & Info */}
						<div className="bg-white rounded-3xl p-8 shadow-xl border border-medical-light">
							<div className="flex items-center space-x-6 mb-6">
								<div className="relative">
									<Image
										src="/assets/SRW logo 1 (1).png"
										alt="Study With Ritesh Logo"
										width={120}
										height={80}
										className="rounded-2xl shadow-lg"
										loading="lazy"
										style={{ width: "auto", height: "auto" }}
										placeholder="blur"
										blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAeEQACAQUBAQAAAAAAAAAAAAABAgADBBEFITFBkf/aAAwDAQACEQMRAD8A0XYobHURkFEI2A9RYjjgJfWIojeDgdynN2gZbQWAaAHc9gOvPT//2Q=="
									/>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-medical-dark">
										Study With Ritesh
									</h3>
									<p className="text-medical-blue font-medium">
										Bihar's Premier Nursing Coaching
									</p>
								</div>
							</div>
							<p className="text-gray-600 leading-relaxed">
								Join thousands of successful nursing students who achieved their
								dreams with our expert guidance.
								<span className="font-semibold text-medical-blue">
									Ritesh Sir
								</span>{" "}
								brings 8+ years of experience in DCECE coaching with proven
								results.
							</p>
						</div>

						{/* Stats Cards */}
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light text-center">
								<div className="text-3xl font-bold text-medical-blue mb-2">
									95%
								</div>
								<div className="text-sm text-gray-600 font-medium">
									Success Rate
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light text-center">
								<div className="text-3xl font-bold text-green-600 mb-2">
									5000+
								</div>
								<div className="text-sm text-gray-600 font-medium">
									Students Coached
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light text-center">
								<div className="text-3xl font-bold text-purple-600 mb-2">
									8+
								</div>
								<div className="text-sm text-gray-600 font-medium">
									Years Experience
								</div>
							</div>
							<div className="bg-white rounded-2xl p-6 shadow-lg border border-medical-light text-center">
								<div className="text-3xl font-bold text-red-500 mb-2">24/7</div>
								<div className="text-sm text-gray-600 font-medium">
									Doubt Support
								</div>
							</div>
						</div>

						{/* Social Media Links */}
						<div className="flex flex-col sm:flex-row gap-3">
							<a
								href="https://www.youtube.com/@studywithritesh8678"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg flex-1 text-sm"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
								</svg>
								<span className="hidden xs:inline sm:inline">
									Watch Free Classes
								</span>
								<span className="xs:hidden">YouTube</span>
							</a>
							<a
								href="https://t.me/Studywithritesh"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg flex-1 text-sm"
							>
								<svg
									className="w-4 h-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
								</svg>
								<span className="hidden xs:inline sm:inline">
									Join Community
								</span>
								<span className="xs:hidden">Telegram</span>
							</a>
						</div>
					</div>

					{/* Right Side - What We Offer */}
					<div className="space-y-8">
						<div className="bg-white rounded-3xl p-8 shadow-xl border border-medical-light">
							<div className="text-center mb-8">
								<div className="inline-flex items-center bg-medical-blue text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
									<svg
										className="w-4 h-4 mr-2"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
									What We Offer
								</div>
								<h3 className="text-2xl font-bold text-medical-dark">
									🎯 Complete DCECE Preparation
								</h3>
							</div>

							<div className="space-y-6">
								{/* Desktop View - Show all features */}
								<div className="hidden md:block space-y-6">
									{features.map((feature, index) => (
										<div
											key={index}
											className={`flex items-center space-x-4 p-4 ${feature.bgColor} rounded-xl`}
										>
											<div
												className={`w-10 h-10 ${feature.iconColor} rounded-full flex items-center justify-center flex-shrink-0`}
											>
												{feature.icon}
											</div>
											<span className="font-medium text-medical-dark">
												{feature.text}
											</span>
										</div>
									))}
								</div>

								{/* Mobile View - Auto-sliding carousel */}
								<div className="md:hidden">
									<div className="relative overflow-hidden">
										<div
											className="flex transition-transform duration-500 ease-in-out"
											style={{
												transform: `translateX(-${currentSlide * 100}%)`,
											}}
										>
											{features.map((feature, index) => (
												<div
													key={index}
													className={`flex-shrink-0 w-full flex items-center space-x-4 p-4 ${feature.bgColor} rounded-xl`}
												>
													<div
														className={`w-10 h-10 ${feature.iconColor} rounded-full flex items-center justify-center flex-shrink-0`}
													>
														{feature.icon}
													</div>
													<span className="font-medium text-medical-dark">
														{feature.text}
													</span>
												</div>
											))}
										</div>
									</div>

									{/* Slide Indicators */}
									<div className="flex justify-center mt-4 space-x-2">
										{features.map((_, index) => (
											<button
												key={index}
												onClick={() => setCurrentSlide(index)}
												className={`w-2 h-2 rounded-full transition-all ${
													currentSlide === index
														? "bg-medical-blue w-6"
														: "bg-gray-300"
												}`}
											/>
										))}
									</div>

									{/* Progress bar */}
									<div className="mt-2 bg-gray-200 rounded-full h-1 overflow-hidden">
										<div
											className="bg-medical-blue h-full transition-all duration-300 ease-out rounded-full"
											style={{
												width: `${
													((currentSlide + 1) / features.length) * 100
												}%`,
											}}
										/>
									</div>
								</div>
							</div>

							{/* CTA Button */}
							<div className="mt-8 text-center">
								<a
									href="https://t.me/Studywithritesh"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
								>
									<svg
										className="w-5 h-5 mr-2"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
									</svg>
									Join Our Coaching Program
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

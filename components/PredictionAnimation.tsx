"use client";

import { useEffect, useRef, useState } from "react";

interface PredictionAnimationProps {
	showAnimation: boolean;
	onAnimationComplete: () => void;
}

export default function PredictionAnimation({
	showAnimation,
	onAnimationComplete,
}: PredictionAnimationProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isVideoLoaded, setIsVideoLoaded] = useState(false);

	useEffect(() => {
		if (showAnimation && videoRef.current && isVideoLoaded) {
			videoRef.current.currentTime = 0;
			videoRef.current.play().catch(console.error);
		}
	}, [showAnimation, isVideoLoaded]);

	const handleVideoEnded = () => {
		// Add a small delay before completing animation for better UX
		setTimeout(() => {
			onAnimationComplete();
		}, 500);
	};

	const handleVideoLoaded = () => {
		setIsVideoLoaded(true);
	};

	if (!showAnimation) return null;

	return (
		<div className="bg-white rounded-3xl shadow-newton-lg overflow-hidden transform transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
			<div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
				<h3 className="text-2xl font-bold text-white flex items-center justify-center space-x-3">
					<svg
						className="w-8 h-8 animate-pulse"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<span>🔍 Analyzing Your Data</span>
				</h3>
				<p className="text-primary-100 mt-2 text-center">
					Our AI is processing your DCECE rank against 2,111+ colleges...
				</p>
			</div>

			<div className="p-8 space-y-6">
				<div className="relative flex justify-center">
					<video
						ref={videoRef}
						onEnded={handleVideoEnded}
						onLoadedData={handleVideoLoaded}
						className="max-w-md w-full h-auto object-contain rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50"
						muted
						playsInline
						poster="/assets/animation-poster.jpg"
					>
						<source src="/assets/animation.mp4" type="video/mp4" />
						{/* Fallback content */}
						<div className="max-w-md w-full h-64 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto">
							<div className="text-center space-y-4">
								<div className="relative">
									<div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
									<div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full mx-auto opacity-30"></div>
								</div>
								<p className="text-medical-dark font-semibold text-lg">
									Processing your prediction...
								</p>
							</div>
						</div>
					</video>

					{/* Loading overlay if video isn't loaded */}
					{!isVideoLoaded && (
						<div className="absolute inset-0 flex justify-center">
							<div className="max-w-md w-full h-64 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
								<div className="text-center space-y-4">
									<div className="relative">
										<div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
										<div className="absolute inset-0 animate-ping w-16 h-16 border-4 border-blue-300 border-t-transparent rounded-full mx-auto opacity-30"></div>
									</div>
									<p className="text-medical-dark font-semibold text-lg">
										Loading animation...
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="space-y-4 text-center">
					<div className="flex items-center justify-center space-x-3 text-lg text-medical-blue bg-blue-50 rounded-xl p-4">
						<svg
							className="w-6 h-6 animate-pulse text-blue-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span className="font-bold">Powered by Study With Ritesh AI</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
						<div className="bg-green-50 rounded-lg p-3">
							<div className="flex items-center justify-center space-x-2">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span className="font-semibold">Calculating probabilities</span>
							</div>
						</div>
						<div className="bg-blue-50 rounded-lg p-3">
							<div className="flex items-center justify-center space-x-2">
								<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
								<span className="font-semibold">Matching colleges</span>
							</div>
						</div>
						<div className="bg-purple-50 rounded-lg p-3">
							<div className="flex items-center justify-center space-x-2">
								<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
								<span className="font-semibold">Preparing results</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

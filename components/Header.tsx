"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const headerRef = useRef<HTMLElement>(null);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				headerRef.current &&
				!headerRef.current.contains(event.target as Node) &&
				mobileMenuOpen
			) {
				setMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [mobileMenuOpen]);

	// Close mobile menu when window is resized to desktop size
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768 && mobileMenuOpen) {
				setMobileMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [mobileMenuOpen]);

	return (
		<header
			ref={headerRef}
			className="bg-white shadow-lg border-b-2 border-medical-blue sticky top-0 z-50"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 sm:h-20">
					{/* Logo and Brand */}
					<div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
						<div className="relative flex-shrink-0">
							<Image
								src="/assets/SRW logo 1 (1).png"
								alt="Study With Ritesh Logo"
								width={120}
								height={50}
								priority
								className="w-20 h-8 sm:w-28 sm:h-12 md:w-36 md:h-16 rounded-lg shadow-md object-contain"
								style={{ width: "auto", height: "auto" }}
							/>
						</div>
						<div className="min-w-0 flex-1">
							<h1 className="text-sm sm:text-lg md:text-xl font-bold text-medical-dark truncate">
								Bihar Nursing College Predictor
							</h1>
							<p className="text-xs sm:text-sm text-medical-blue font-medium truncate">
								By Study With Ritesh • DCECE 2025
							</p>
						</div>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
						{/* Social Media Links */}
						<div className="flex items-center space-x-2">
							<a
								href="https://www.youtube.com/@studywithritesh"
								target="_blank"
								rel="noopener noreferrer"
								className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
								title="YouTube Channel"
							>
								<svg
									className="w-4 h-4 text-white"
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
								className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all"
								title="Instagram"
							>
								<svg
									className="w-4 h-4 text-white"
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
								className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
								title="Telegram"
							>
								<svg
									className="w-4 h-4 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
								</svg>
							</a>
						</div>

						{/* Join Coaching CTA Button */}
						<a
							href="#coaching"
							className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 xl:px-4 xl:py-2 rounded-lg font-medium text-xs xl:text-sm flex items-center space-x-1 xl:space-x-2 transition-all transform hover:scale-105 shadow-lg border border-blue-500 flex-shrink-0"
						>
							<svg
								className="w-3 h-3 xl:w-4 xl:h-4"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
							</svg>
							<span className="whitespace-nowrap">Join Coaching</span>
						</a>
					</div>

					{/* Medium screens - Hide some elements but show CTA */}
					<div className="hidden md:flex lg:hidden items-center space-x-3">
						{/* Social Media */}
						<div className="flex items-center space-x-2">
							<a
								href="https://www.youtube.com/@studywithritesh"
								target="_blank"
								rel="noopener noreferrer"
								className="w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
								title="YouTube"
							>
								<svg
									className="w-3 h-3 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
								</svg>
							</a>
							<a
								href="https://t.me/studywithritesh"
								target="_blank"
								rel="noopener noreferrer"
								className="w-7 h-7 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
								title="Telegram"
							>
								<svg
									className="w-3 h-3 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
								</svg>
							</a>
						</div>

						{/* CTA Button */}
						<a
							href="#coaching"
							className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-2 rounded-lg font-medium text-sm flex items-center space-x-1 transition-all transform hover:scale-105 shadow-lg border border-blue-500"
						>
							<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
							</svg>
							<span>Join</span>
						</a>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex-shrink-0 ml-2">
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="text-medical-dark hover:text-medical-blue p-2 rounded-md border border-gray-200 hover:border-medical-blue transition-all"
							aria-label="Toggle menu"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								{mobileMenuOpen ? (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								) : (
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{mobileMenuOpen && (
					<div className="md:hidden border-t border-gray-200 py-4">
						<div className="space-y-4">
							<div className="flex items-center space-x-3 pt-2">
								<span className="text-sm text-medical-dark">Follow us:</span>
								<div className="flex space-x-2">
									<a
										href="https://www.youtube.com/@studywithritesh"
										target="_blank"
										rel="noopener noreferrer"
										className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
									>
										<svg
											className="w-4 h-4 text-white"
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
										className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
									>
										<svg
											className="w-4 h-4 text-white"
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
										className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
									>
										<svg
											className="w-4 h-4 text-white"
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
				)}
			</div>
		</header>
	);
}

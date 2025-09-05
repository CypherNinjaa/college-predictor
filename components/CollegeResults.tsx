"use client";

import { useState } from "react";

interface College {
	institute: string;
	branch: string;
	opening_rank?: number;
	closing_rank: number;
	category: string;
}

interface ResultsData {
	colleges: College[];
	ai_explanation?: string;
	meta?: { count: number };
}

interface RoundWiseData {
	round: number;
	year: number;
	opening_rank?: number;
	closing_rank: number;
	seats_available: number;
}

interface SafetyBadgeProps {
	closingRank: number;
	userRank: number;
}

function SafetyBadge({ closingRank, userRank }: SafetyBadgeProps) {
	// Calculate how much better the user's rank is compared to closing rank
	const rankDifference = closingRank - userRank;

	// If user rank is higher than closing rank, they can't get admission
	if (userRank > closingRank) {
		return (
			<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-300">
				Very Low
			</span>
		);
	}

	let colorClass = "bg-green-100 text-green-700 border-green-300";
	let label = "High";

	// Calculate safety margin as percentage of closing rank
	const safetyMargin = (rankDifference / closingRank) * 100;

	if (safetyMargin >= 30) {
		// User rank is much better than closing rank
		colorClass = "bg-green-100 text-green-700 border-green-300";
		label = "High";
	} else if (safetyMargin >= 15) {
		// Good safety margin
		colorClass = "bg-blue-100 text-blue-700 border-blue-300";
		label = "Good";
	} else if (safetyMargin >= 5) {
		// Moderate safety margin
		colorClass = "bg-yellow-100 text-yellow-700 border-yellow-300";
		label = "Medium";
	} else {
		// Small safety margin but still eligible
		colorClass = "bg-orange-100 text-orange-700 border-orange-300";
		label = "Low";
	}

	return (
		<span
			className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${colorClass}`}
		>
			{label}
		</span>
	);
}

export default function CollegeResults({
	data,
	userRank,
	userCategory,
	examType,
	branch,
}: {
	data: ResultsData;
	userRank: number;
	userCategory: string;
	examType?: string;
	branch?: string;
}) {
	const [aiAdvice, setAiAdvice] = useState<string>("");
	const [loadingAI, setLoadingAI] = useState(false);
	const [showAI, setShowAI] = useState(false);
	const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
	const [showRoundModal, setShowRoundModal] = useState(false);
	const [roundWiseData, setRoundWiseData] = useState<RoundWiseData[]>([]);

	// Cache for AI responses (in production, you'd use localStorage or database)
	const [aiCache] = useState(new Map<string, string>());

	const fetchAIAdvice = async () => {
		if (loadingAI) return;

		const cacheKey = `${userRank}-${userCategory}-${examType}-${branch}`;

		// Check cache first
		if (aiCache.has(cacheKey)) {
			setAiAdvice(aiCache.get(cacheKey)!);
			setShowAI(true);
			return;
		}

		setLoadingAI(true);
		try {
			const response = await fetch("/api/ai-advice", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					rank: userRank,
					category: userCategory,
					examType: examType || "DCECE_PM",
					branch: branch || "All",
					colleges: data.colleges.slice(0, 10), // Limit data sent to AI
				}),
			});
			const result = await response.json();
			if (result.ai_explanation) {
				// Limit to 154 words
				const words = result.ai_explanation.split(" ");
				const limitedAdvice =
					words.slice(0, 154).join(" ") + (words.length > 154 ? "..." : "");

				// Cache the response
				aiCache.set(cacheKey, limitedAdvice);
				setAiAdvice(limitedAdvice);
				setShowAI(true);
			}
		} catch (error) {
			console.error("Failed to fetch AI advice:", error);
			setAiAdvice(
				"Unable to generate AI advice at the moment. Please try again later."
			);
			setShowAI(true);
		} finally {
			setLoadingAI(false);
		}
	};

	const fetchRoundWiseData = async (college: College) => {
		setSelectedCollege(college);
		// Mock round-wise data - in production, fetch from database
		const mockData: RoundWiseData[] = [
			{
				round: 1,
				year: 2024,
				opening_rank: college.opening_rank,
				closing_rank: college.closing_rank + 50,
				seats_available: 60,
			},
			{
				round: 2,
				year: 2024,
				opening_rank: college.opening_rank,
				closing_rank: college.closing_rank + 20,
				seats_available: 45,
			},
			{
				round: 3,
				year: 2024,
				opening_rank: college.opening_rank,
				closing_rank: college.closing_rank + 10,
				seats_available: 30,
			},
			{
				round: 4,
				year: 2024,
				opening_rank: college.opening_rank,
				closing_rank: college.closing_rank + 5,
				seats_available: 20,
			},
			{
				round: 5,
				year: 2024,
				opening_rank: college.opening_rank,
				closing_rank: college.closing_rank,
				seats_available: 15,
			},
		];
		setRoundWiseData(mockData);
		setShowRoundModal(true);
	};
	return (
		<div className="space-y-8">
			{/* Header with Stats */}
			<div className="text-center space-y-4">
				<h2 className="text-3xl font-bold text-newton-900">
					Colleges chosen by Students with Similar Ranks
				</h2>
				<p className="text-newton-600 text-lg">
					Results shown for Ranks close to {userRank.toLocaleString()}
				</p>

				{/* User Avatar Section */}
				<div className="flex justify-center items-center space-x-3 pt-2">
					<div className="flex -space-x-2">
						<div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-white">
							S1
						</div>
						<div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-white">
							S2
						</div>
						<div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-white">
							S3
						</div>
					</div>
					<span className="text-newton-600 font-medium">
						{data.colleges.length > 0
							? `${Math.min(data.colleges.length * 50, 5000)}+ Students`
							: "Be the first"}
					</span>
				</div>
			</div>

			{/* AI Counselor Advice Section */}
			<div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 overflow-hidden">
				<div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
					<div className="flex items-center justify-between">
						<h3 className="text-xl font-bold text-white flex items-center">
							<svg
								className="w-6 h-6 mr-3"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
							AI Counselor Advice
						</h3>
						{!showAI && (
							<button
								onClick={fetchAIAdvice}
								disabled={loadingAI}
								className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
							>
								{loadingAI ? (
									<>
										<svg
											className="animate-spin w-4 h-4"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										<span>Getting Advice...</span>
									</>
								) : (
									<>
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M13 10V3L4 14h7v7l9-11h-7z"
											/>
										</svg>
										<span>Get AI Advice</span>
									</>
								)}
							</button>
						)}
					</div>
				</div>

				{showAI ? (
					<div className="p-6">
						<div className="text-newton-800 leading-relaxed text-lg whitespace-pre-line">
							{aiAdvice}
						</div>
						<div className="mt-4 flex items-center justify-between">
							<div className="text-sm text-blue-600 font-medium">
								✨ Personalized advice based on your rank and category
							</div>
							<button
								onClick={() => setShowAI(false)}
								className="text-blue-600 hover:text-blue-700 text-sm font-medium"
							>
								Hide Advice
							</button>
						</div>
					</div>
				) : (
					<div className="p-6 text-center">
						<div className="text-newton-600 text-lg mb-4">
							Get personalized college counseling advice from AI
						</div>
					</div>
				)}
			</div>

			{/* College Results Table */}
			<div className="bg-white rounded-2xl shadow-newton-lg overflow-hidden border border-newton-200">
				{/* Table Header */}
				<div className="bg-newton-50 border-b border-newton-200 px-6 py-4">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
						<h3 className="text-xl font-bold text-newton-900 flex items-center">
							<svg
								className="w-6 h-6 mr-3 text-primary-600"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
							</svg>
							DCECE 2025
						</h3>
						<div className="flex items-center space-x-4">
							<span className="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1.5 rounded-full">
								{data.colleges.length} Colleges Found
							</span>
							<button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
									/>
								</svg>
								<span>New Prediction</span>
							</button>
						</div>
					</div>
				</div>

				{data.colleges.length > 0 ? (
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-newton-50">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-bold text-newton-700 uppercase tracking-wider">
										College
									</th>
									<th className="px-6 py-4 text-left text-xs font-bold text-newton-700 uppercase tracking-wider">
										Branch
									</th>
									<th className="px-6 py-4 text-center text-xs font-bold text-newton-700 uppercase tracking-wider">
										Opening Rank
									</th>
									<th className="px-6 py-4 text-center text-xs font-bold text-newton-700 uppercase tracking-wider">
										Closing Rank
									</th>
									<th className="px-6 py-4 text-center text-xs font-bold text-newton-700 uppercase tracking-wider">
										Probability
									</th>
									<th className="px-6 py-4 text-center text-xs font-bold text-newton-700 uppercase tracking-wider">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-newton-100">
								{data.colleges.map((college, index) => (
									<tr
										key={index}
										className="hover:bg-newton-25 transition-colors duration-150"
									>
										<td className="px-6 py-4">
											<div className="space-y-1">
												<div className="font-semibold text-newton-900 text-sm leading-tight">
													{college.institute}
												</div>
												<div className="text-newton-500 text-xs">
													{college.institute.includes("Patna")
														? "Patna, Bihar"
														: college.institute.includes("Gaya")
														? "Gaya, Bihar"
														: college.institute.includes("Muzaffarpur")
														? "Muzaffarpur, Bihar"
														: "Bihar, India"}
												</div>
												<div className="text-xs">
													<span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-medium">
														DCECE Based
													</span>
												</div>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="space-y-1">
												<div className="font-medium text-newton-800 text-sm">
													{college.branch}
												</div>
												<div className="text-newton-500 text-xs">
													Bachelor of Technology
												</div>
											</div>
										</td>
										<td className="px-6 py-4 text-center">
											<div className="text-sm font-medium text-newton-900">
												{college.opening_rank
													? college.opening_rank.toLocaleString()
													: "-"}
											</div>
										</td>
										<td className="px-6 py-4 text-center">
											<div className="text-sm font-medium text-newton-900">
												{college.closing_rank.toLocaleString()}
											</div>
										</td>
										<td className="px-6 py-4 text-center">
											<SafetyBadge
												closingRank={college.closing_rank}
												userRank={userRank}
											/>
										</td>
										<td className="px-6 py-4 text-center">
											<button
												onClick={() => fetchRoundWiseData(college)}
												className="text-primary-600 hover:text-primary-700 font-medium text-sm hover:underline transition-colors duration-200"
											>
												Round-wise Details
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="px-6 py-16 text-center">
						<div className="w-24 h-24 bg-newton-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg
								className="w-12 h-12 text-newton-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={1.5}
									d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-newton-900 mb-2">
							No colleges found for your rank
						</h3>
						<p className="text-newton-600 max-w-md mx-auto">
							Try adjusting your rank or category. Consider improving your rank
							for better college options in Bihar nursing admissions.
						</p>
					</div>
				)}
			</div>

			{/* Round-wise Details Modal */}
			{showRoundModal && selectedCollege && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
						{/* Modal Header */}
						<div className="bg-gradient-to-r from-newton-600 to-newton-700 px-6 py-4 rounded-t-2xl">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-xl font-bold text-white">
										Round-wise Cutoff Trends
									</h3>
									<p className="text-newton-100 text-sm mt-1">
										{selectedCollege.institute} - {selectedCollege.branch}
									</p>
								</div>
								<button
									onClick={() => setShowRoundModal(false)}
									className="text-white hover:text-newton-200 transition-colors duration-200"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
						</div>

						{/* Modal Content */}
						<div className="p-6">
							{/* Stats Cards */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
								<div className="bg-green-50 border border-green-200 rounded-xl p-4">
									<div className="text-green-600 text-sm font-medium">
										Final Closing Rank
									</div>
									<div className="text-2xl font-bold text-green-700">
										{selectedCollege.closing_rank.toLocaleString()}
									</div>
								</div>
								<div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
									<div className="text-blue-600 text-sm font-medium">
										Total Rounds
									</div>
									<div className="text-2xl font-bold text-blue-700">
										{roundWiseData.length}
									</div>
								</div>
								<div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
									<div className="text-purple-600 text-sm font-medium">
										Rank Improvement
									</div>
									<div className="text-2xl font-bold text-purple-700">
										{roundWiseData.length > 0
											? (
													roundWiseData[0].closing_rank -
													roundWiseData[roundWiseData.length - 1].closing_rank
											  ).toLocaleString()
											: "0"}
									</div>
								</div>
							</div>

							{/* Round-wise Table */}
							<div className="bg-white border border-newton-200 rounded-xl overflow-hidden">
								<div className="bg-newton-50 px-4 py-3 border-b border-newton-200">
									<h4 className="font-semibold text-newton-900">
										DCECE 2024 Round-wise Cutoffs
									</h4>
								</div>
								<div className="overflow-x-auto">
									<table className="min-w-full">
										<thead className="bg-newton-25">
											<tr>
												<th className="px-4 py-3 text-left text-xs font-bold text-newton-700 uppercase">
													Round
												</th>
												<th className="px-4 py-3 text-center text-xs font-bold text-newton-700 uppercase">
													Opening Rank
												</th>
												<th className="px-4 py-3 text-center text-xs font-bold text-newton-700 uppercase">
													Closing Rank
												</th>
												<th className="px-4 py-3 text-center text-xs font-bold text-newton-700 uppercase">
													Seats Available
												</th>
												<th className="px-4 py-3 text-center text-xs font-bold text-newton-700 uppercase">
													Status
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-newton-100">
											{roundWiseData.map((round, index) => (
												<tr key={index} className="hover:bg-newton-25">
													<td className="px-4 py-3">
														<div className="flex items-center space-x-2">
															<div
																className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
																	index === roundWiseData.length - 1
																		? "bg-green-100 text-green-700"
																		: "bg-newton-100 text-newton-700"
																}`}
															>
																{round.round}
															</div>
															<span className="font-medium text-newton-900">
																Round {round.round}
															</span>
														</div>
													</td>
													<td className="px-4 py-3 text-center">
														<span className="text-sm font-medium text-newton-800">
															{round.opening_rank
																? round.opening_rank.toLocaleString()
																: "-"}
														</span>
													</td>
													<td className="px-4 py-3 text-center">
														<span className="text-sm font-bold text-newton-900">
															{round.closing_rank.toLocaleString()}
														</span>
													</td>
													<td className="px-4 py-3 text-center">
														<span className="text-sm text-newton-700">
															{round.seats_available}
														</span>
													</td>
													<td className="px-4 py-3 text-center">
														{userRank <= round.closing_rank ? (
															<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
																✓ Qualified
															</span>
														) : (
															<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
																✗ Not Qualified
															</span>
														)}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							{/* Insights */}
							<div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
								<h5 className="font-semibold text-blue-900 mb-2">
									💡 Key Insights
								</h5>
								<ul className="text-blue-800 text-sm space-y-1">
									<li>
										• Cutoff ranks typically improve (decrease) in later rounds
									</li>
									<li>
										• Round 1 has the highest cutoffs, Round 5 has the lowest
									</li>
									<li>
										• Seat availability decreases in each subsequent round
									</li>
									<li>
										• Consider participating in multiple rounds for better
										chances
									</li>
								</ul>
							</div>
						</div>

						{/* Modal Footer */}
						<div className="bg-newton-50 px-6 py-4 rounded-b-2xl border-t border-newton-200">
							<div className="flex justify-end space-x-3">
								<button
									onClick={() => setShowRoundModal(false)}
									className="px-4 py-2 text-newton-700 hover:text-newton-800 font-medium transition-colors duration-200"
								>
									Close
								</button>
								<button className="bg-newton-600 hover:bg-newton-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
									Download Report
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

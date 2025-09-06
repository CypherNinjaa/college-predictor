"use client";

import { useState } from "react";
import CollegeResults from "./CollegeResults";
import LoadingSpinner from "./LoadingSpinner";

interface PredictFormData {
	rank: string;
	category: string;
	examType: string;
	branch: string;
	collegeType: string;
	year: number;
}

interface PredictionResult {
	colleges: Array<{
		institute: string;
		branch: string;
		opening_rank?: number;
		closing_rank: number;
		category: string;
	}>;
	ai_explanation: string;
	meta?: { count: number };
}

export default function PredictForm() {
	const [formData, setFormData] = useState<PredictFormData>({
		rank: "",
		category: "UR",
		examType: "DCECE_PM",
		branch: "All",
		collegeType: "All",
		year: 2025,
	});

	const [loading, setLoading] = useState(false);
	const [result, setResult] = useState<PredictionResult | null>(null);
	const [error, setError] = useState<string | null>(null);

	const categories = [
		{ value: "UR", label: "Unreserved (UR)" },
		{ value: "SC", label: "Scheduled Caste (SC)" },
		{ value: "ST", label: "Scheduled Tribe (ST)" },
		{ value: "BC", label: "Backward Class (BC)" },
		{ value: "EWS", label: "Economically Weaker Section (EWS)" },
		{ value: "EBC", label: "Extremely Backward Class (EBC)" },
		{ value: "RCG", label: "Recommended Category (RCG)" },
		{ value: "DQ", label: "Disabled Quota (DQ)" },
	];

	const examTypes = [
		{
			value: "DCECE_PM",
			label: "DCECE [PM] - Physics, Chemistry, Mathematics",
		},
		{
			value: "DCECE_PMM",
			label: "DCECE [PMM] - Physics, Chemistry, Mathematics (Coming Soon)",
			disabled: true,
		},
	];

	const branches = [
		{ value: "All", label: "All Branches" },
		{ value: "G.N.M.", label: "General Nursing & Midwifery (GNM)" },
		{ value: "A.N.M.", label: "Auxiliary Nursing & Midwifery (ANM)" },
		{ value: "DIPLOMA IN\nPHARMACY", label: "Diploma in Pharmacy" },
		{ value: "O.T. ASSISTANT", label: "Operation Theatre Assistant (OT)" },
		{ value: "LABORATORY\nTECHNICIAN", label: "Laboratory Technician" },
		{ value: "X' RAY\nTECHNICIAN", label: "X-Ray Technician" },
		{ value: "OPTHALMIC\nASSISTANT", label: "Ophthalmic Assistant" },
		{ value: "Other", label: "Other Medical Programs" },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setResult(null);

		try {
			const response = await fetch("/api/predict", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					rank: parseInt(formData.rank),
					category: formData.category,
					examType: formData.examType,
					branch: formData.branch,
					collegeType: formData.collegeType,
					year: formData.year,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to predict colleges");
			}

			setResult(data);
		} catch (err: any) {
			setError(err.message || "Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* Form Card */}
			<div className="bg-white rounded-3xl shadow-newton-lg overflow-hidden">
				{/* Form Header */}
				<div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
					<h3 className="text-2xl font-bold text-white">
						🎯 Predict Your Nursing College
					</h3>
					<p className="text-primary-100 mt-2">
						Enter your DCECE rank, category, exam type, and preferred branch to
						get personalized college predictions with safety probability levels.
					</p>
				</div>

				{/* Form Content */}
				<div className="p-8">
					<form
						onSubmit={handleSubmit}
						className="grid grid-cols-1 md:grid-cols-2 gap-6"
					>
						{/* DCECE Exam Type Selection */}
						<div className="md:col-span-2 space-y-2">
							<label
								htmlFor="examType"
								className="block text-sm font-semibold text-newton-700"
							>
								DCECE Exam Type *
							</label>
							<select
								id="examType"
								value={formData.examType}
								onChange={(e) =>
									setFormData({ ...formData, examType: e.target.value })
								}
								className="w-full h-12 px-4 border-2 border-newton-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-newton-900 bg-white"
							>
								{examTypes.map((exam) => (
									<option
										key={exam.value}
										value={exam.value}
										disabled={exam.disabled}
									>
										{exam.label}
									</option>
								))}
							</select>
							<p className="text-xs text-newton-500">
								Select your DCECE exam type. Currently supporting DCECE [PM]
								data.
							</p>
						</div>

						{/* DCECE Rank Input */}
						<div className="space-y-2">
							<label
								htmlFor="rank"
								className="block text-sm font-semibold text-newton-700"
							>
								DCECE Rank *
							</label>
							<div className="relative">
								<input
									id="rank"
									type="number"
									value={formData.rank}
									onChange={(e) =>
										setFormData({ ...formData, rank: e.target.value })
									}
									className="w-full h-12 px-4 border-2 border-newton-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-newton-900 placeholder-newton-400"
									placeholder="Enter your Rank"
									required
									min="1"
									max="100000"
								/>
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
									<svg
										className="h-5 w-5 text-newton-400"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
							</div>
							<p className="text-xs text-newton-500">
								Enter your overall DCECE rank as mentioned in your result
							</p>
						</div>

						{/* Category Selection */}
						<div className="space-y-2">
							<label
								htmlFor="category"
								className="block text-sm font-semibold text-newton-700"
							>
								Category *
							</label>
							<select
								id="category"
								value={formData.category}
								onChange={(e) =>
									setFormData({ ...formData, category: e.target.value })
								}
								className="w-full h-12 px-4 border-2 border-newton-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-newton-900 bg-white"
							>
								{categories.map((cat) => (
									<option key={cat.value} value={cat.value}>
										{cat.label}
									</option>
								))}
							</select>
							<p className="text-xs text-newton-500">
								Select your reservation category as per DCECE result
							</p>
						</div>

						{/* Branch Selection */}
						<div className="md:col-span-2 space-y-2">
							<label
								htmlFor="branch"
								className="block text-sm font-semibold text-newton-700"
							>
								Preferred Branch *
							</label>
							<select
								id="branch"
								value={formData.branch}
								onChange={(e) =>
									setFormData({ ...formData, branch: e.target.value })
								}
								className="w-full h-12 px-4 border-2 border-newton-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-newton-900 bg-white"
							>
								{branches.map((branch) => (
									<option key={branch.value} value={branch.value}>
										{branch.label}
									</option>
								))}
							</select>
							<p className="text-xs text-newton-500">
								Select your preferred branch or "All Branches" to see all
								available options
							</p>
						</div>

						{/* College Type Selection */}
						<div className="md:col-span-2 space-y-2">
							<label
								htmlFor="collegeType"
								className="block text-sm font-semibold text-newton-700"
							>
								College Type *
							</label>
							<select
								id="collegeType"
								value={formData.collegeType}
								onChange={(e) =>
									setFormData({ ...formData, collegeType: e.target.value })
								}
								className="w-full h-12 px-4 border-2 border-newton-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-newton-900 bg-white"
							>
								<option value="All">All Colleges</option>
								<option value="Government">Government Colleges</option>
								<option value="Private">Private Colleges</option>
							</select>
							<p className="text-xs text-newton-500">
								Government colleges include: Nursing schools, Medical colleges
								(P.M.I., D.M.C.H., etc.), and government institutions. Private
								colleges have different naming patterns.
							</p>
						</div>

						{/* Submit Button */}
						<div className="md:col-span-2 pt-4">
							<button
								type="submit"
								disabled={loading || !formData.rank}
								className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-newton-300 disabled:to-newton-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
							>
								{loading ? (
									<>
										<LoadingSpinner />
										<span>Predicting...</span>
									</>
								) : (
									<>
										<svg
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										<span>Predict</span>
									</>
								)}
							</button>
						</div>
					</form>

					{/* Error Display */}
					{error && (
						<div className="mt-6 bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
							<div className="flex">
								<svg
									className="w-5 h-5 text-red-400 mt-0.5 mr-3"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clipRule="evenodd"
									/>
								</svg>
								<div>
									<h3 className="text-sm font-semibold text-red-800">Error</h3>
									<p className="text-sm text-red-700 mt-1">{error}</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Trust Indicators */}
			<div className="flex flex-wrap justify-center items-center gap-8 text-sm text-newton-600 bg-white/50 backdrop-blur-sm rounded-2xl p-6">
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
						<svg
							className="w-4 h-4 text-green-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<span className="font-medium">1,575+ Colleges</span>
				</div>
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
						<svg
							className="w-4 h-4 text-blue-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<span className="font-medium">AI-Powered Analysis</span>
				</div>
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
						<svg
							className="w-4 h-4 text-yellow-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<span className="font-medium">Instant Results</span>
				</div>
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
						<svg
							className="w-4 h-4 text-purple-600"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<span className="font-medium">100% Secure</span>
				</div>
			</div>

			{/* Results */}
			{result && (
				<CollegeResults
					data={result}
					userRank={parseInt(formData.rank)}
					userCategory={formData.category}
					examType={formData.examType}
					branch={formData.branch}
					collegeType={formData.collegeType}
				/>
			)}

			{/* Subtle Disclaimer */}
			<div className="mt-8 text-center">
				<p className="text-xs text-gray-400 opacity-75">
					This is a prediction tool for guidance only. Please verify with
					official sources.
				</p>
			</div>
		</div>
	);
}

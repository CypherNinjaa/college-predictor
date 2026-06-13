import { supabase } from "./supabase";
import type { College } from "./supabase";

// Helper to determine college type based on robust prefix rules
export function getCollegeType(institute: string): "Government" | "Private" {
	const inst = institute.toUpperCase().trim();
	
	// Rule 1: Starts with Government Nursing/ANM/GNM School prefix
	const govPrefixes = [
		'A.N.M. SCHOOL', 'ANM SCHOOL', 
		'A.N.M. TRAINING SCHOOL', 'ANM TRAINING SCHOOL',
		'G.N.M. SCHOOL', 'GNM SCHOOL',
		'G.N.M. TRAINING SCHOOL', 'GNM TRAINING SCHOOL',
		'P.M.I.', 'P.H.I.', 'G.P.I.',
		'UNDER CIVIL SURGEON',
		'PATNA DENTAL COLLEGE'
	];

	for (const prefix of govPrefixes) {
		if (inst.startsWith(prefix)) {
			return 'Government';
		}
	}

	// Rule 2: Starts with Government Medical College acronyms
	const govMedicalAcronyms = [
		'P.M.C.H.', 'PMCH',
		'N.M.C.H.', 'NMCH',
		'D.M.C.H.', 'DMCH',
		'A.N.M.M.C.H.', 'ANMMCH',
		'J.L.N.M.C.H.', 'J.L.N.M.C.',
		'S.K.M.C.H.', 'SKMCH',
		'B.M.I.M.S.', 'B.M.I.M.S',
		'G.M.C.', 'GMC'
	];

	for (const acronym of govMedicalAcronyms) {
		if (inst.startsWith(acronym)) {
			return 'Government';
		}
	}

	return 'Private';
}

// Get database connection - for Supabase, we don't need explicit connections
export function getDatabase() {
	return supabase;
}

// Query colleges with filters - Supabase version
export async function queryColleges(
	rank: number,
	category: string,
	examType: string,
	branch: string,
	collegeType: string,
	year: number = 2025
): Promise<College[]> {
	try {
		let query = supabase
			.from("nursing_cutoffs")
			.select("*")
			.eq("year", year)
			.eq("category", category)
			.gte("closing_rank", rank);

		// Add branch filter if not "All"
		if (branch !== "All") {
			query = query.eq("branch", branch);
		}

		// Order results by closing_rank ascending
		const { data, error } = await query.order("closing_rank", { ascending: true });

		if (error) {
			console.error("Supabase query error:", error);
			throw error;
		}

		if (!data) return [];

		// Classify and filter in memory
		const results: College[] = [];
		for (const row of data) {
			const type = getCollegeType(row.institute);
			if (collegeType === "All" || type === collegeType) {
				results.push({
					...row,
					college_type: type
				});
			}
		}

		// Limit to 50 results (consistent with original behavior)
		return results.slice(0, 50);
	} catch (error) {
		console.error("Database query failed:", error);
		return [];
	}
}

// Alternative approach (maintained for backwards compatibility)
export async function queryCollegesWithView(
	rank: number,
	category: string,
	examType: string,
	branch: string,
	collegeType: string,
	year: number = 2025
): Promise<College[]> {
	return await queryColleges(rank, category, examType, branch, collegeType, year);
}


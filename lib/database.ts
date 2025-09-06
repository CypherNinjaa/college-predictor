import { supabase } from "./supabase";
import type { College } from "./supabase";

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
	// Use the simpler view-based approach for better performance
	return await queryCollegesWithView(
		rank,
		category,
		examType,
		branch,
		collegeType,
		year
	);
}

// Alternative approach using the college_predictions view for easier college type filtering
export async function queryCollegesWithView(
	rank: number,
	category: string,
	examType: string,
	branch: string,
	collegeType: string,
	year: number = 2025
): Promise<College[]> {
	try {
		let query = supabase
			.from("college_predictions")
			.select("*")
			.eq("year", year)
			.eq("category", category)
			.gte("closing_rank", rank);

		// Add branch filter if not "All"
		if (branch !== "All") {
			query = query.eq("branch", branch);
		}

		// Add college type filter using the view's college_type column
		if (collegeType !== "All") {
			query = query.eq("college_type", collegeType);
		}

		// Order and limit results
		const { data, error } = await query
			.order("closing_rank", { ascending: true })
			.limit(50);

		if (error) {
			console.error("Supabase query error:", error);
			throw error;
		}

		return data || [];
	} catch (error) {
		console.error("Database query failed:", error);
		return [];
	}
}

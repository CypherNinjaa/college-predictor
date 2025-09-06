import { NextRequest, NextResponse } from "next/server";
import { queryColleges } from "@/lib/database";
import type { College } from "@/lib/supabase";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const {
			rank,
			category,
			examType = "DCECE[PM]",
			branch = "All",
			collegeType = "All",
			year = 2025,
		} = body;

		// Validate required fields
		if (!rank || !category) {
			return NextResponse.json(
				{
					error: "Missing required fields: rank and category",
					colleges: [],
				},
				{ status: 400 }
			);
		}

		if (typeof rank !== "number" || rank <= 0) {
			return NextResponse.json(
				{
					error: "Invalid rank: must be a positive number",
					colleges: [],
				},
				{ status: 400 }
			);
		}

		// Query colleges using Supabase
		const colleges = await queryColleges(
			rank,
			category,
			examType,
			branch,
			collegeType,
			year
		);

		console.log(
			`API: Found ${colleges.length} colleges for rank ${rank}, category ${category}, branch ${branch}, type ${collegeType}`
		);

		return NextResponse.json({
			success: true,
			colleges,
			filters: {
				rank,
				category,
				examType,
				branch,
				collegeType,
				year,
			},
		});
	} catch (error: any) {
		console.error("Prediction API error:", error);
		return NextResponse.json(
			{
				error: "Failed to predict colleges. Please try again.",
				colleges: [],
			},
			{ status: 500 }
		);
	}
}

// Handle GET requests with error message
export async function GET() {
	return NextResponse.json(
		{
			error: "This endpoint only accepts POST requests",
			usage:
				"Send POST request with { rank: number, category: string, examType?: string, branch?: string, collegeType?: string, year?: number }",
		},
		{ status: 405 }
	);
}

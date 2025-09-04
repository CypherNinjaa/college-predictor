import { NextRequest, NextResponse } from "next/server";

interface College {
	institute: string;
	branch: string;
	opening_rank?: number;
	closing_rank: number;
	category: string;
}

async function getGroqAdvice(
	rank: number,
	category: string,
	colleges: College[]
): Promise<string> {
	const prompt = `You are a Bihar nursing education counselor. A student has DCECE rank ${rank}, category ${category}.

Available nursing colleges: ${JSON.stringify(colleges).slice(0, 4000)}

Please provide:
1. Top 3 best ANM/GNM college recommendations
2. 2-3 safe backup options
3. Brief advice about nursing career prospects in Bihar
4. Keep response EXACTLY under 154 words, friendly tone

IMPORTANT: Write in plain text format. Do not use asterisks (*), markdown formatting, or special characters. Write naturally like speaking to a student. Keep it under 154 words.

Focus on Bihar nursing education and avoid engineering college advice.`;

	try {
		const response = await fetch(
			"https://api.groq.com/openai/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: "llama-3.1-8b-instant", // Updated working model
					messages: [{ role: "user", content: prompt }],
					temperature: 0.5,
					max_tokens: 500,
				}),
			}
		);

		if (!response.ok) {
			throw new Error(`Groq API error: ${response.status}`);
		}

		const json = await response.json();
		return (
			json.choices?.[0]?.message?.content ||
			"Unable to generate advice at the moment."
		);
	} catch (error) {
		console.error("Groq API error:", error);
		// Fallback advice if AI fails
		return `Based on your rank ${rank} in category ${category}, you have ${colleges.length} college options. Consider applying to multiple colleges to increase your chances. ANM programs typically have lower cutoffs than GNM programs. Focus on colleges in your preferred location and check their facilities before making final decisions.`;
	}
}

export async function POST(req: NextRequest) {
	try {
		const { rank, category, colleges } = await req.json();

		// Validate inputs
		if (!rank || !category || !colleges) {
			return NextResponse.json(
				{ error: "Missing required fields: rank, category, and colleges" },
				{ status: 400 }
			);
		}

		if (rank < 1 || rank > 100000) {
			return NextResponse.json(
				{ error: "Rank must be between 1 and 100,000" },
				{ status: 400 }
			);
		}

		// Get AI explanation
		const ai_explanation = await getGroqAdvice(rank, category, colleges);

		return NextResponse.json({
			ai_explanation,
			meta: {
				provider: "groq",
				query_rank: rank,
				query_category: category,
				colleges_count: colleges.length,
			},
		});
	} catch (error: any) {
		console.error("AI Advice API error:", error);
		return NextResponse.json(
			{
				error: "Failed to generate AI advice. Please try again.",
				ai_explanation:
					"Unable to generate advice at the moment. Please check your inputs and try again.",
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
				"Send POST request with { rank: number, category: string, colleges: College[] }",
		},
		{ status: 405 }
	);
}

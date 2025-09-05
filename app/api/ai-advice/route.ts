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
	examType: string,
	branch: string,
	colleges: College[]
): Promise<string> {
	// Analyze college data for better insights
	const totalColleges = colleges.length;
	const branches = Array.from(new Set(colleges.map((c) => c.branch)));
	const safeColleges = colleges.filter(
		(c) => c.closing_rank - rank > rank * 0.2
	).length;
	const averageClosingRank = Math.round(
		colleges.reduce((sum, c) => sum + c.closing_rank, 0) / totalColleges
	);

	// Branch-specific context
	const branchContext =
		branch === "All"
			? `Student is open to all nursing branches (${branches.join(", ")})`
			: `Student specifically wants ${branch} programs`;

	// Category-specific advice
	const categoryAdvice = {
		UR: "As an unreserved category student, focus on colleges with competitive cutoffs.",
		SC: "SC category provides reservation benefits. You have good chances in government colleges.",
		ST: "ST reservation gives you significant advantages in government institutions.",
		OBC: "OBC category offers moderate reservation benefits in Bihar nursing colleges.",
		EWS: "EWS category provides 10% reservation in government nursing institutions.",
		EBC: "EBC category gets reservation benefits specific to Bihar state.",
		RCG: "Recommended category may have special provisions.",
		DQ: "Disability quota provides reserved seats with relaxed criteria.",
	};

	const prompt = `You are an expert Bihar nursing education counselor. 

STUDENT PROFILE:
- DCECE Rank: ${rank} (Category: ${category})
- Exam Type: ${examType.replace("_", " ")}
- Branch Preference: ${
		branch === "All" ? "Open to all nursing branches" : branch
	}

DATA ANALYSIS:
- Total matching colleges: ${totalColleges}
- Available branches: ${branches.join(", ")}
- Safe options (good probability): ${safeColleges} colleges
- Average closing rank: ${averageClosingRank}
- Your rank position: ${
		rank < averageClosingRank ? "Better than average" : "Below average"
	}

CONTEXT: ${branchContext}. ${
		categoryAdvice[category as keyof typeof categoryAdvice] ||
		"Consider all available options."
	}

AVAILABLE COLLEGES: ${JSON.stringify(colleges.slice(0, 8))}

Provide EXACTLY 154 words of personalized advice covering:
1. Top 2-3 specific college recommendations with reasons
2. Branch-specific strategy (ANM vs GNM vs other programs)
3. Safety/backup college advice
4. Category-specific tips
5. Bihar nursing career prospects

IMPORTANT: Write in plain conversational tone without asterisks, bullets, or special formatting. Be specific and actionable.`;

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
					model: "llama-3.1-8b-instant",
					messages: [{ role: "user", content: prompt }],
					temperature: 0.7, // Slightly higher for more personalized responses
					max_tokens: 200, // Increased for better responses
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
		// Enhanced fallback advice
		const branchAdvice =
			branch === "All"
				? "Consider both ANM and GNM programs as ANM typically has lower cutoffs than GNM."
				: `Focusing on ${branch} is good as it aligns with your career goals.`;

		return `Based on your rank ${rank} in ${category} category for ${examType.replace(
			"_",
			" "
		)}, you have ${totalColleges} college options. ${branchAdvice} With ${safeColleges} safer options available, apply to multiple colleges including both government and private institutions. ${
			categoryAdvice[category as keyof typeof categoryAdvice] || ""
		} Bihar nursing sector offers excellent career prospects with growing healthcare demands. Consider location preferences and college infrastructure when making final decisions.`;
	}
}

export async function POST(req: NextRequest) {
	try {
		const { rank, category, examType, branch, colleges } = await req.json();

		// Validate inputs
		if (!rank || !category || !examType || !branch || !colleges) {
			return NextResponse.json(
				{
					error:
						"Missing required fields: rank, category, examType, branch, and colleges",
				},
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
		const ai_explanation = await getGroqAdvice(
			rank,
			category,
			examType,
			branch,
			colleges
		);

		return NextResponse.json({
			ai_explanation,
			meta: {
				provider: "groq",
				query_rank: rank,
				query_category: category,
				query_examType: examType,
				query_branch: branch,
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
				"Send POST request with { rank: number, category: string, examType: string, branch: string, colleges: College[] }",
		},
		{ status: 405 }
	);
}

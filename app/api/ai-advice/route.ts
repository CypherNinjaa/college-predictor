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
	collegeType: string,
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
	const getBranchDisplayName = (branchValue: string): string => {
		const branchMap: { [key: string]: string } = {
			"G.N.M.": "General Nursing & Midwifery (GNM)",
			"A.N.M.": "Auxiliary Nursing & Midwifery (ANM)",
			"DIPLOMA IN\nPHARMACY": "Diploma in Pharmacy",
			"O.T. ASSISTANT": "Operation Theatre Assistant (OT)",
			"LABORATORY\nTECHNICIAN": "Laboratory Technician",
			"X' RAY\nTECHNICIAN": "X-Ray Technician",
			"OPTHALMIC\nASSISTANT": "Ophthalmic Assistant",
			DRESSER: "Dresser (Medical Assistant)",
		};
		return branchMap[branchValue] || branchValue;
	};

	const branchContext =
		branch === "All"
			? `Student is open to all nursing branches (${branches
					.map(getBranchDisplayName)
					.join(", ")})`
			: `Student specifically wants ${getBranchDisplayName(branch)} programs`;

	// College type specific context
	const collegeTypeContext = {
		All: "Student is considering both government and private colleges for maximum options.",
		Government:
			"Student prefers GOVERNMENT colleges which include: Nursing schools (G.N.M./GNM SCHOOL, A.N.M./ANM SCHOOL), Medical colleges (P.M.I., D.M.C.H., N.M.C.H., S.K.M.C.H., A.N.M.M.C.H., etc.), and other government institutions. These offer lower fees, government job opportunities, better infrastructure, and strong placement support.",
		Private:
			"Student prefers PRIVATE colleges (non-government institutions). These may offer flexible admission processes, different fee structures, modern facilities, but typically have higher fees than government colleges.",
	};

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
		branch === "All"
			? "Open to all nursing branches"
			: getBranchDisplayName(branch)
	}
- College Type Preference: ${collegeType}

DATA ANALYSIS:
- Total matching colleges: ${totalColleges}
- Available branches: ${branches.map(getBranchDisplayName).join(", ")}
- Safe options (good probability): ${safeColleges} colleges
- Average closing rank: ${averageClosingRank}
- Your rank position: ${
		rank < averageClosingRank ? "Better than average" : "Below average"
	}

CONTEXT: ${branchContext}. ${
		collegeTypeContext[collegeType as keyof typeof collegeTypeContext] ||
		"Student is considering all college types."
	} ${
		categoryAdvice[category as keyof typeof categoryAdvice] ||
		"Consider all available options."
	}

AVAILABLE COLLEGES: ${JSON.stringify(colleges.slice(0, 8))}

Provide EXACTLY 154 words of personalized advice covering:
1. Top 2-3 specific college recommendations with reasons
2. ${
		collegeType === "Government"
			? "Government college advantages (lower fees, govt jobs, infrastructure)"
			: collegeType === "Private"
			? "Private college considerations (fees, facilities, admission flexibility)"
			: "Government vs Private college comparison"
	}
3. Branch-specific strategy (${
		branch === "All"
			? "ANM vs GNM vs Pharmacy vs OT vs Lab Technician vs Dresser programs"
			: `${getBranchDisplayName(branch)} program strategy`
	})
4. Safety/backup college advice based on college type preference
5. Category-specific tips and Bihar nursing career prospects

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
		const getBranchAdvice = (branchValue: string): string => {
			switch (branchValue) {
				case "All":
					return "Consider ANM, GNM, Pharmacy, and paramedical programs. ANM typically has lower cutoffs than GNM, while Pharmacy and lab technician programs have specialized career paths.";
				case "G.N.M.":
					return "GNM is a comprehensive 3-year program with excellent nursing career prospects and higher eligibility for government jobs.";
				case "A.N.M.":
					return "ANM is a 2-year program with relatively lower cutoffs and good job opportunities in rural healthcare settings.";
				case "DIPLOMA IN\nPHARMACY":
					return "Pharmacy diploma offers excellent opportunities in pharmaceutical sector with both government and private career options.";
				case "O.T. ASSISTANT":
					return "Operation Theatre Assistant is a specialized program with high demand in hospitals and surgical centers.";
				case "LABORATORY\nTECHNICIAN":
					return "Laboratory Technician programs offer stable careers in diagnostic centers, hospitals, and research facilities.";
				case "X' RAY\nTECHNICIAN":
					return "X-Ray Technician is a specialized radiology program with excellent job prospects in hospitals and diagnostic centers.";
				case "OPTHALMIC\nASSISTANT":
					return "Ophthalmic Assistant specializes in eye care with growing demand in ophthalmology clinics and hospitals.";
				default:
					return `Focusing on ${getBranchDisplayName(
						branchValue
					)} aligns with your career goals.`;
			}
		};

		const branchAdvice = getBranchAdvice(branch);

		const typeAdvice =
			collegeType === "Government"
				? "Government colleges (including medical colleges like P.M.I., D.M.C.H., nursing schools) offer lower fees, government job opportunities, and strong placements."
				: collegeType === "Private"
				? "Private colleges may offer modern facilities, flexible admission processes, but typically have higher fees than government institutions."
				: "Both government and private colleges have their advantages - government colleges for lower fees and job security, private for flexibility.";

		return `Based on your rank ${rank} in ${category} category for ${examType.replace(
			"_",
			" "
		)}, you have ${totalColleges} college options. ${branchAdvice} ${typeAdvice} With ${safeColleges} safer options available, apply to multiple colleges. ${
			categoryAdvice[category as keyof typeof categoryAdvice] || ""
		} Bihar nursing sector offers excellent career prospects with growing healthcare demands.`;
	}
}

export async function POST(req: NextRequest) {
	try {
		const { rank, category, examType, branch, collegeType, colleges } =
			await req.json();

		// Validate inputs
		if (
			!rank ||
			!category ||
			!examType ||
			!branch ||
			!collegeType ||
			!colleges
		) {
			return NextResponse.json(
				{
					error:
						"Missing required fields: rank, category, examType, branch, collegeType, and colleges",
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
			collegeType,
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
				query_collegeType: collegeType,
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
				"Send POST request with { rank: number, category: string, examType: string, branch: string, collegeType: string, colleges: College[] }",
		},
		{ status: 405 }
	);
}

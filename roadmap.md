# Bihar Nursing College Predictor – Detailed Roadmap

> **OPTIMIZED STACK**: Next.js (App Router), Supabase Free Tier, Groq AI, Vercel Free Hosting
> **Goal**: DCECE Nursing College Predictor for ANM/GNM admissions based on rank/category
> **Reference**: Newton School's clean, fast, free college predictor design
> **Total Monthly Cost**: $0 (Free tier limits: 500MB DB, 100GB bandwidth, 200K Groq tokens)

---

## 1. High-Level Phases (Optimized for Cost & Speed)

| Phase | Focus                | Deliverables                                      | Timeline |
| ----- | -------------------- | ------------------------------------------------- | -------- |
| P0    | **Data Setup**       | Clean CSV → Supabase, 2025 DCECE data loaded      | 1 day    |
| P1    | **Core MVP**         | Next.js app + `/api/predict` + Groq integration   | 2-3 days |
| P2    | **Newton-style UI**  | Clean form + results table + AI explanations      | 1-2 days |
| P3    | **Production Ready** | Error handling, loading states, mobile responsive | 1 day    |
| P4    | **Growth Features**  | Trends, filters, sharing, analytics               | Optional |
| P5    | **Monetization**     | Premium features, ads, partnerships               | Later    |

---

## 2. Architecture Overview (Cost-Optimized)

```
User → Next.js (Vercel Free) → Supabase Free → Groq API
                             ↓
                    AI Nursing Guidance
```

**Why This Stack?**

- **Vercel Free**: 100GB bandwidth, unlimited static sites
- **Supabase Free**: 500MB DB (enough for ~50K nursing college records)
- **Groq API**: $0.27/1M tokens (vs OpenAI $3/1M) - ~200K free tokens monthly
- **Next.js**: Built-in API routes, no separate backend needed

**Data Flow**

1. User submits: rank, category (UR/SC/ST/OBC/EWS/EBC), year (2025)
2. Query Supabase: `WHERE closing_rank >= user_rank AND category = user_category`
3. Results → Groq API with nursing-specific prompt
4. Return: `{ colleges: [...], ai_explanation: "..." }`

---

## 3. Data Layer (Supabase Free Tier)

### 3.1 Optimized Table Schema for DCECE Nursing Data

```sql
create table if not exists nursing_cutoffs (
  id bigint generated always as identity primary key,
  year int not null default 2025,
  institute text not null,
  branch text not null, -- ANM, GNM
  category text not null, -- UR, SC, ST, OBC, EWS, EBC, RCG, DQ, BC
  opening_rank int,
  closing_rank int not null,
  created_at timestamp default now()
);
```

**Key Changes from Generic Schema:**

- Nursing-specific branch types (ANM, GNM)
- Bihar-specific categories (RCG, EBC, DQ, BC)
- Smaller data footprint (nursing vs engineering colleges)

### 3.2 Data Storage Strategy - WHERE TO STORE CSV

**Option 1: Direct Supabase Upload (RECOMMENDED)**

```bash
# Clean CSV first, then upload via Supabase Dashboard
# Location: Store cleaned CSV in `/data/` folder in your project
# Supabase path: Project → Table Editor → Import CSV
```

**Option 2: GitHub + Processing Script**

```bash
# Store raw CSV in /data/raw/ folder
# Store cleaned CSV in /data/processed/
# Use Node.js script to clean + bulk insert
```

**Option 3: Supabase Storage + Processing (If CSV > 25MB)**

```bash
# Upload large CSV to Supabase Storage bucket
# Process via background function
```

### 3.3 Data Cleaning Steps (Your CSV Issues)

Your CSV has formatting issues that need fixing:

```javascript
// data-cleaning.js
const fs = require("fs");
const csv = require("csv-parser");

function cleanDCECEData() {
	const cleanRows = [];

	fs.createReadStream("DC_PM25_SOCFF (2).csv")
		.pipe(csv({ skipLinesWithError: true }))
		.on("data", (row) => {
			// Skip header/page rows
			if (
				(row.INSTITUTE && row.INSTITUTE.includes("SCHOOL")) ||
				row.INSTITUTE.includes("College")
			) {
				cleanRows.push({
					year: 2025,
					institute: row.INSTITUTE.trim(),
					branch: row.BRANCH || "A.N.M.",
					category: row.CATEGORY || "UR",
					opening_rank: parseInt(row["UR OPENING RANK"]) || null,
					closing_rank:
						parseInt(row["UR CLOSING RANK"]) ||
						parseInt(row["CAT CLOSING RANK"]),
				});
			}
		})
		.on("end", () => {
			// Write cleaned CSV
			console.log(`Cleaned ${cleanRows.length} records`);
		});
}
```

## 4. Backend API (Groq Integration)

### 4.1 Why Groq Over OpenAI

| Feature       | Groq                      | OpenAI GPT-4o-mini   |
| ------------- | ------------------------- | -------------------- |
| **Cost**      | $0.27/1M tokens           | $3.00/1M tokens      |
| **Speed**     | 100-300 tokens/sec        | 20-50 tokens/sec     |
| **Free Tier** | ~200K tokens/month        | $5 credit (expires)  |
| **Quality**   | Llama 3.1 70B (excellent) | GPT-4o-mini (better) |

**Recommendation**: Start with Groq for MVP, add OpenAI as premium feature later.

### 4.2 Groq API Implementation

```typescript
// app/api/predict/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function queryColleges(
	rank: number,
	category: string,
	year: number = 2025
) {
	const { data, error } = await supabase
		.from("nursing_cutoffs")
		.select("institute, branch, opening_rank, closing_rank, category")
		.eq("year", year)
		.eq("category", category)
		.lte("closing_rank", rank) // User can get admission here
		.order("closing_rank", { ascending: true })
		.limit(50);

	if (error) throw error;
	return data || [];
}

async function getGroqAdvice(rank: number, category: string, colleges: any[]) {
	const prompt = `You are a Bihar nursing education counselor. A student has DCECE rank ${rank}, category ${category}.

Available nursing colleges: ${JSON.stringify(colleges).slice(0, 4000)}

Please provide:
1. Top 3 best ANM/GNM college recommendations
2. 2-3 safe backup options
3. Brief advice about nursing career prospects
4. Keep response under 300 words, friendly tone

Focus on Bihar nursing education and avoid engineering college advice.`;

	const response = await fetch(
		"https://api.groq.com/openai/v1/chat/completions",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "llama-3.1-70b-versatile", // Most cost-effective
				messages: [{ role: "user", content: prompt }],
				temperature: 0.5,
				max_tokens: 500,
			}),
		}
	);

	const json = await response.json();
	return (
		json.choices?.[0]?.message?.content ||
		"Unable to generate advice at the moment."
	);
}

export async function POST(req: NextRequest) {
	try {
		const { rank, category, year = 2025 } = await req.json();

		// Validate Bihar nursing categories
		const validCategories = [
			"UR",
			"SC",
			"ST",
			"OBC",
			"EWS",
			"EBC",
			"RCG",
			"DQ",
			"BC",
		];
		if (!validCategories.includes(category)) {
			return NextResponse.json({ error: "Invalid category" }, { status: 400 });
		}

		const colleges = await queryColleges(rank, category, year);
		const ai_explanation = await getGroqAdvice(rank, category, colleges);

		return NextResponse.json({
			colleges,
			ai_explanation,
			meta: { count: colleges.length, provider: "groq" },
		});
	} catch (error: any) {
		console.error("Prediction error:", error);
		return NextResponse.json(
			{
				error: "Failed to predict colleges",
				colleges: [],
				ai_explanation: "Please try again later.",
			},
			{ status: 500 }
		);
	}
}
```

### 3.3 Data Ingestion Steps

1. Extract from PDF → CSV (already have). Ensure headers match schema.
2. Normalize text (trim, consistent case, remove duplicate rows).
3. Validate numeric fields (non-negative, opening_rank <= closing_rank).
4. Bulk load via Supabase UI or `supabase-js` script.
5. Spot check: select count, distinct institutes, sample rows.

### 3.4 Yearly Updates

- Append rows with new `year` (no destructive updates).
- Maintain a changelog table (optional) if manual corrections needed.

### 3.5 Row Level Security (RLS)

```sql
alter table cutoffs enable row level security;
create policy "public-read" on cutoffs for select using (true);
```

(If using service role key only on server, RLS can still be enabled for defense in depth.)

---

## 4. Backend API

### 4.1 Responsibilities

- Validate input.
- Query Supabase with filters.
- Limit + sort results.
- Construct safe prompt (truncate oversized JSON).
- Call AI provider (Groq or OpenAI) with fallback.
- Return combined payload.

### 4.2 Endpoint Contract

`POST /api/predict`
Request JSON:

```json
{ "rank": 2500, "category": "GEN", "year": 2024 }
```

Response JSON:

```json
{
	"colleges": [
		{
			"institute": "NIT Trichy",
			"branch": "ECE",
			"opening_rank": 1200,
			"closing_rank": 3000,
			"category": "GEN"
		}
	],
	"ai_explanation": "With your rank..."
}
```

Errors:

- 400: Missing/invalid fields.
- 500: Internal or upstream AI error.

### 4.3 Input Validation Rules

- rank: integer > 0 and < 2_000_000.
- category: whitelist (e.g., GEN, OBC, SC, ST, EWS); centralize list.
- year: between 2018 and current_year+1.

### 4.4 Query Logic

- `closing_rank <= rank` ensures feasible options.
- Sort ascending by `closing_rank` (most competitive first).
- Limit 100; if >100 possible, consider adding pagination flag.

### 4.5 Prompt Strategy

Template (user role):

```
A student has rank {rank}, category {category}, year {year}.
Eligible colleges JSON (truncated): {json}
Tasks:
1. List top 3 best-fit institute+branch (balance quality + feasibility).
2. Give 2-3 safe backups.
3. If list empty, advise realistic next steps.
4. Be concise, friendly, no tables.
```

Add system message (OpenAI) for tone consistency:

```
You are an educational counselor. Provide actionable, encouraging, honest guidance.
```

### 4.6 AI Provider Abstraction

Environment vars:

```
AI_PROVIDER=groq|openai
GROQ_API_KEY=...
OPENAI_API_KEY=...
```

Interface:

```
async function generateAdvice(prompt: string): Promise<string>
```

Add timeout (e.g., 12s) and fallback message.

### 4.7 Error Handling & Observability

- Wrap AI call with try/catch; include a `ai_explanation` fallback.
- Log (server-side) latency buckets for: dbQueryMs, aiMs.
- Return `meta: { db_count, truncated }` optionally for debugging (omit in prod if noisy).

### 4.8 Rate Limiting (Optional Early)

- Simple: in-memory LRU (per IP) if deploying serverless with shared memory (not guaranteed).
- Better: Upstash Redis or Supabase edge functions with rate tables.

---

## 5. Frontend (React / Next.js)

### 5.1 Pages / Components

- `PredictForm`: inputs (rank, category select, year select), submit.
- `ResultsTable`: renders colleges.
- `AIAdvicePanel`: shows explanation with loading skeleton.
- `Layout`: header + simple branding.

### 5.2 UX Flow

1. User enters fields → Submit.
2. Disable button + show spinner.
3. Parallel states: table loads; AI explanation may stream (future improvement) or appear when ready.
4. Error banner on failure with retry.

### 5.3 State Management

- Local component state is enough for MVP.
- Add React Query (optional) if caching repeated queries.

### 5.4 Accessibility & Performance

- Use semantic `<table>` for results.
- Provide aria-live region for AI explanation updates.
- Defer large packages; tree-shake charts until Phase P4.

### 5.5 Input Helpers

- Category dropdown with canonical labels.
- Year auto-filled to latest available year (fetched from backend: `/api/meta`).

---

## 6. Environment & Config

`.env` (server):

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
AI_PROVIDER=groq
GROQ_API_KEY=...
OPENAI_API_KEY=... # optional
```

Client-safe `.env` (Next.js): only public keys if needed (avoid service role!).

Secrets management: Vercel / Netlify dashboard for production.

---

## 7. Security Considerations

- Never expose `SERVICE_ROLE_KEY` client-side.
- Enforce input validation to avoid prompt injection via malformed JSON (sanitize or build JSON server-side only).
- Rate limit to deter abuse of AI credits.
- Monitor AI spend (set monthly usage alarms).

---

## 8. Testing Strategy

### 8.1 Levels

- Unit: prompt builder, validation utils.
- Integration: call `/api/predict` with a seeded test Supabase (or mock client).
- E2E (later): Playwright/Cypress—form submission route.

### 8.2 Sample Unit Test Cases

1. rank <= 0 ⇒ validation error.
2. category outside whitelist ⇒ error.
3. Empty DB result ⇒ AI prompt still generated; explanation contains fallback phrase.
4. Large result (>100) ⇒ truncated flag true.

### 8.3 Mocking AI

- Provide fake implementation returning deterministic string when `NODE_ENV=test`.

### 8.4 CI

- GitHub Actions: run lint + tests on push; optional preview deploy.

---

## 9. Deployment Plan

### 9.1 Recommended: Next.js on Vercel

- API route `app/api/predict/route.ts` for backend.
- Edge vs Node runtime: Start with Node (OpenAI/Groq compatibility).

### 9.2 Alternative: Express on Render/Railway

- Separate frontend build (Netlify/Vercel) pointing to API base URL.

### 9.3 Steps

1. Create Supabase project; load data.
2. Push code to Git repo (GitHub).
3. Configure environment variables in hosting platform.
4. Deploy (preview). Run sanity test.
5. Switch domain / add custom domain.

### 9.4 Observability

- Add simple logging (console) + Vercel Analytics (optional).
- Later: hook into Logflare or Axiom for structured logs.

---

## 10. Performance & Scaling

- DB indices keep query fast (<50ms usually).
- Limit returned rows: 100.
- Consider caching identical queries (rank+category+year) for 10–30 minutes.
- AI call dominates latency; can pre-compute popular rank buckets (optional optimization).

---

## 11. Future Enhancements (Backlog)

| Priority | Feature                          | Notes                                          |
| -------- | -------------------------------- | ---------------------------------------------- |
| High     | Filters (state, branch keywords) | Additional WHERE clauses + UI inputs           |
| High     | Save Predictions (Auth)          | Supabase Auth + user_predictions table         |
| Medium   | Trend Graphs                     | ChartJS or Recharts; show closing rank vs year |
| Medium   | Sharing Link                     | Serialize query params to URL                  |
| Medium   | AI Streaming                     | Use fetch streaming for Chat API               |
| Low      | Multi-language Output            | Add `language` param in prompt                 |
| Low      | Monetization                     | Stripe + limited free tier                     |

---

## 12. Data Quality & Maintenance

- Quarterly: run DISTINCT checks for institute/branch anomalies.
- Add constraint (optional): unique (year, institute, branch, category).

```sql
alter table cutoffs add constraint cutoffs_unique_year_inst_branch_cat
  unique (year, institute, branch, category);
```

- If duplicates arise (multiple counseling rounds) keep the latest round only or add `round int` column.

---

## 13. Project Structure (Proposed Next.js)

```
/ (repo root)
  app/
    api/
      predict/route.ts
  components/
    PredictForm.tsx
    ResultsTable.tsx
    AIAdvicePanel.tsx
  lib/
    supabase.ts
    validation.ts
    ai.ts
  tests/
    validation.test.ts
    prompt.test.ts
  public/
  roadmap.md
  package.json
  README.md
```

---

## 14. Implementation Checklist (Condensed)

- [ ] Create Supabase table + indices.
- [ ] Load initial CSV data.
- [ ] Implement validation utils.
- [ ] Implement Supabase query function.
- [ ] Implement AI abstraction.
- [ ] Implement `/api/predict` endpoint.
- [ ] Build React components (form, table, advice panel).
- [ ] Add loading + error states.
- [ ] Deploy to Vercel with env vars.
- [ ] Add tests & CI workflow.
- [ ] Add filters & charts (Phase P4).

---

## 15. Timeline (Example Aggressive)

| Week | Milestone                                       |
| ---- | ----------------------------------------------- |
| 1    | Data ingestion + backend endpoint functional    |
| 2    | Frontend MVP + deploy preview                   |
| 3    | Hardening, validation, tests, minor UX polish   |
| 4    | Filters + charts + saved predictions groundwork |

(Adjust according to bandwidth.)

---

## 16. Risk & Mitigation

| Risk                        | Impact               | Mitigation                                  |
| --------------------------- | -------------------- | ------------------------------------------- |
| AI latency/cost             | Slow UX / high bills | Cache repeated prompts; rank bucketing      |
| Incomplete data             | Poor suggestions     | Display transparency note; allow feedback   |
| Prompt injection (unlikely) | Skewed output        | Fixed template, no user free-text in prompt |
| Scaling traffic             | Rate-limit errors    | Add Redis rate limiting early               |

---

## 17. Definition of Done (MVP)

- User can enter (rank, category, year) and receive: table + AI narrative under 6 seconds median.
- Endpoint handles invalid inputs gracefully.
- Logging present for DB and AI latency.
- README documents setup.

---

## 18. Quick Start (Future README Extract)

1. Clone repo.
2. Copy `.env.example` → `.env.local`.
3. Install deps & run `dev`.
4. Open `/` and test prediction.

---

## 19. Notes

- Keep AI explanation short (<= 1500 chars) to reduce tokens.
- Consider adding `round` if counseling rounds differ significantly.
- Multi-provider switch lets you test cost/performance trade-offs quickly.

---

Happy building! Iterate vertically: thin slice from input → result first, then layer on sophistication.

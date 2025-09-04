# Bihar Nursing College Predictor

A free, AI-powered college predictor for Bihar nursing students appearing for DCECE. Get personalized recommendations for ANM and GNM programs based on your rank and category.

## 🚀 Features

- **100% Free** - No registration or payment required
- **AI-Powered Guidance** - Personalized recommendations using Groq AI
- **Real-time Predictions** - Instant results based on 2025 cutoff data
- **Mobile Optimized** - Works perfectly on all devices
- **Bihar Specific** - Tailored for DCECE nursing admissions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: Groq API (Llama 3.1 70B)
- **Hosting**: Vercel
- **Cost**: $0/month for MVP (free tiers)

## 📊 Data

Includes 2025 DCECE cutoff data for:

- 500+ nursing colleges in Bihar
- ANM and GNM programs
- All categories: UR, SC, ST, OBC, EWS, EBC, RCG, DQ, BC

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd bihar-nursing-predictor
npm install
```

### 2. Setup Environment

Create `.env.local`:

```bash
# Groq AI API Key (get from console.groq.com)
GROQ_API_KEY=your_groq_api_key

# Supabase Configuration (get from supabase.com)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Setup Database

1. Create a Supabase project
2. Run this SQL to create the table:

```sql
create table nursing_cutoffs (
  id bigint generated always as identity primary key,
  year int not null default 2025,
  institute text not null,
  branch text not null,
  category text not null,
  opening_rank int,
  closing_rank int not null,
  created_at timestamp default now()
);

-- Create index for faster queries
create index nursing_cutoffs_lookup_idx
on nursing_cutoffs (year, category, closing_rank);

-- Enable RLS (optional)
alter table nursing_cutoffs enable row level security;
create policy "public_read" on nursing_cutoffs for select using (true);
```

### 4. Process and Upload Data

```bash
# Clean the CSV data
cd scripts
npm install csv-parser csv-writer
node clean-data.js

# Upload the cleaned CSV to Supabase via the dashboard
# File will be at: data/nursing_cutoffs_2025_cleaned.csv
```

### 5. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## 🚀 Deploy to Production

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

```bash
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 📁 Project Structure

```
bihar-nursing-predictor/
├── app/
│   ├── api/predict/route.ts    # Main prediction API
│   ├── layout.tsx              # App layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── components/
│   ├── PredictForm.tsx         # Main form
│   ├── CollegeResults.tsx      # Results display
│   └── LoadingSpinner.tsx      # Loading component
├── scripts/
│   └── clean-data.js           # CSV processing
├── data/                       # Processed data files
├── .env.local                  # Environment variables
└── package.json
```

## 💰 Cost Breakdown

| Service   | Free Tier       | Cost/Month |
| --------- | --------------- | ---------- |
| Vercel    | 100GB bandwidth | $0         |
| Supabase  | 500MB DB        | $0         |
| Groq API  | 200K tokens     | $0         |
| **Total** |                 | **$0**     |

Scales to ~$25/month for 10K users.

## 🔧 API Usage

### POST /api/predict

```json
{
	"rank": 2500,
	"category": "UR",
	"year": 2025
}
```

**Response:**

```json
{
	"colleges": [
		{
			"institute": "College Name",
			"branch": "A.N.M.",
			"opening_rank": 1000,
			"closing_rank": 3000,
			"category": "UR"
		}
	],
	"ai_explanation": "Personalized advice...",
	"meta": {
		"count": 15,
		"provider": "groq"
	}
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for educational and commercial projects.

## 🔗 Links

- [Live Demo](your-vercel-url)
- [Supabase Docs](https://supabase.com/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

## 🐛 Known Issues

- Database setup required for full functionality
- Mock data used when Supabase is not configured
- Groq API rate limits apply (200K tokens/month free)

## 📞 Support

For issues or questions:

- Create an issue in this repository
- Check the roadmap.md for detailed technical specifications

---

**Built with ❤️ for Bihar nursing students**

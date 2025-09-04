## 6. Environment & Config (Free Tier Setup)

```bash
# .env.local (Next.js)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... # Public key, safe for client

# Server-only env vars
SUPABASE_SERVICE_ROLE_KEY=eyJ... # NEVER expose to client
GROQ_API_KEY=gsk_... # Get free from console.groq.com
```

### 6.1 Free Tier Limits & Monitoring

| Service      | Free Limit               | Monthly Cost | Upgrade Trigger        |
| ------------ | ------------------------ | ------------ | ---------------------- |
| **Vercel**   | 100GB bandwidth          | $0           | >1M requests           |
| **Supabase** | 500MB DB + 5GB bandwidth | $0           | >50K users             |
| **Groq**     | ~200K tokens             | $0           | >740 predictions       |
| **Domain**   | .vercel.app subdomain    | $0           | Custom domain $12/year |

**Cost Monitoring**: Add simple usage tracking to warn before limits.

---

## 7. Deployment Strategy (Zero-Cost Production)

### 7.1 5-Minute Deploy Process

```bash
# 1. Create Next.js project
npx create-next-app@latest bihar-nursing-predictor --typescript --tailwind --app

# 2. Add dependencies
npm install @supabase/supabase-js

# 3. Deploy to Vercel (auto-deploy from Git)
# - Connect GitHub repo
# - Add environment variables in Vercel dashboard
# - Deploy automatically on every push

# 4. Setup Supabase
# - Create free project at supabase.com
# - Run SQL to create nursing_cutoffs table
# - Upload cleaned CSV via Table Editor

# 5. Get Groq API key
# - Sign up at console.groq.com
# - Create API key (free tier: 200K tokens/month)
```

### 7.2 Production Checklist

- [ ] CSV cleaned and uploaded to Supabase
- [ ] Environment variables set in Vercel
- [ ] Groq API key working
- [ ] Mobile responsive design tested
- [ ] Error handling for API failures
- [ ] Basic analytics (Vercel Analytics - free)
- [ ] Custom domain (optional, $12/year)

---

## 8. Cost Optimization & Scaling

### 8.1 Free Tier Optimization

```typescript
// Reduce Groq token usage
const optimizedPrompt = `Bihar nursing student: rank ${rank}, category ${category}.
Colleges: ${JSON.stringify(colleges).slice(0, 2000)} // Truncate to save tokens

Give: Top 3 picks, 2 backups, brief advice. <300 words.`;

// Cache frequent predictions
const cache = new Map();
const cacheKey = `${rank}-${category}-${year}`;
if (cache.has(cacheKey)) {
	return cache.get(cacheKey);
}
```

### 8.2 Monetization Strategy (Future)

| Feature                | Free Tier | Premium ($5/month) |
| ---------------------- | --------- | ------------------ |
| Basic Prediction       | ✅        | ✅                 |
| Historical Trends      | ❌        | ✅                 |
| Multiple Year Analysis | ❌        | ✅                 |
| Detailed AI Reports    | ❌        | ✅                 |
| WhatsApp Updates       | ❌        | ✅                 |

### 8.3 Growth Path

1. **Phase 1**: Free MVP (0-1K users)
2. **Phase 2**: Premium features (1K-10K users)
3. **Phase 3**: Partner with coaching institutes
4. **Phase 4**: Expand to other state nursing exams

---

## 9. Immediate Next Steps (This Week)

### Day 1: Data Setup

```bash
# 1. Clean your CSV file
node data-cleaning.js

# 2. Create Supabase project
# 3. Upload cleaned data
# 4. Test sample queries
```

### Day 2-3: Core Development

```bash
# 1. Setup Next.js project
# 2. Implement /api/predict endpoint
# 3. Create basic form + results UI
# 4. Test Groq integration
```

### Day 4: Polish & Deploy

```bash
# 1. Add loading states and error handling
# 2. Make mobile responsive
# 3. Deploy to Vercel
# 4. Test end-to-end
```

**Total Development Time**: 3-4 days for MVP
**Total Monthly Cost**: $0 (free tiers)
**Scaling Cost**: ~$25/month for 10K users

---

## 10. Sample File Structure

```
bihar-nursing-predictor/
├── app/
│   ├── api/predict/route.ts
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── PredictForm.tsx
│   ├── CollegeResults.tsx
│   └── SafetyBadge.tsx
├── lib/
│   ├── supabase.ts
│   ├── hooks.ts
│   └── utils.ts
├── data/
│   ├── raw/DC_PM25_SOCFF.csv
│   ├── processed/nursing_cutoffs_2025.csv
│   └── data-cleaning.js
├── public/
├── .env.local
├── package.json
└── README.md
```

## 11. Key Recommendations Summary

### ✅ BEST SOLUTION FOR YOUR NEEDS:

1. **Storage**: Store CSV in `/data/` folder → Clean → Upload to Supabase Table Editor
2. **AI**: Use Groq API (11x cheaper than OpenAI, fast, 200K free tokens)
3. **Hosting**: Vercel Free (100GB bandwidth) + Supabase Free (500MB DB)
4. **UI**: Newton School inspired - clean, mobile-first, instant results
5. **Development**: Next.js App Router (all-in-one, no separate backend needed)

### 💰 COST BREAKDOWN:

- **Development**: 3-4 days
- **Monthly Cost**: $0 for first 1K users
- **Scaling**: ~$25/month for 10K users
- **Domain**: Optional $12/year for custom domain

### 🚀 COMPETITIVE ADVANTAGES:

- **Free vs Newton School's paid competitors**
- **Bihar-specific nursing focus** (underserved market)
- **AI explanations** (unique for nursing admissions)
- **Mobile-optimized** for rural students
- **No registration required** (friction-free)

**Ready to start building? The roadmap is optimized for zero-cost deployment with professional results!**

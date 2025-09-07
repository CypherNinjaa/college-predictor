-- Supabase Migration Script for Nursing College Predictor
-- Run this in Supabase SQL Editor
-- Updated: Re-runnable script for existing tables

-- Create the nursing_cutoffs table (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS nursing_cutoffs (
    id BIGSERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    institute TEXT NOT NULL,
    branch TEXT NOT NULL,
    category TEXT NOT NULL,
    opening_rank INTEGER,
    closing_rank INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_nursing_category ON nursing_cutoffs(category);
CREATE INDEX IF NOT EXISTS idx_nursing_closing_rank ON nursing_cutoffs(closing_rank);
CREATE INDEX IF NOT EXISTS idx_nursing_branch ON nursing_cutoffs(branch);
CREATE INDEX IF NOT EXISTS idx_nursing_institute ON nursing_cutoffs(institute);
CREATE INDEX IF NOT EXISTS idx_nursing_year ON nursing_cutoffs(year);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_nursing_category_rank ON nursing_cutoffs(category, closing_rank);
CREATE INDEX IF NOT EXISTS idx_nursing_branch_category ON nursing_cutoffs(branch, category);
CREATE INDEX IF NOT EXISTS idx_nursing_year_category_rank ON nursing_cutoffs(year, category, closing_rank);

-- Enable Row Level Security (optional - can disable if not needed)
-- Note: This will not fail if RLS is already enabled
DO $$ 
BEGIN
    ALTER TABLE nursing_cutoffs ENABLE ROW LEVEL SECURITY;
EXCEPTION 
    WHEN OTHERS THEN NULL;
END $$;

-- Create or replace policy to allow public read access (for your app)
DROP POLICY IF EXISTS "Enable read access for all users" ON nursing_cutoffs;
CREATE POLICY "Enable read access for all users" ON nursing_cutoffs
    FOR SELECT USING (true);

-- Optional: Create policy for insert/update if you need admin access
-- DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON nursing_cutoffs;
-- CREATE POLICY "Enable insert for authenticated users only" ON nursing_cutoffs
--     FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create or replace the view for easier querying
-- This view adds a college_type column that categorizes institutions as Government or Private
-- DRESSER branch institutions (PMM exam) are specifically categorized as Government colleges
CREATE OR REPLACE VIEW college_predictions AS
SELECT 
    id,
    year,
    institute,
    branch,
    category,
    opening_rank,
    closing_rank,
    CASE 
        WHEN institute LIKE 'G.N.M.%' OR institute LIKE 'GNM %' OR institute LIKE '%GNM SCHOOL%' 
             OR institute LIKE '%GNM TRAINING%' OR institute LIKE '%(GNM)%'
             OR institute LIKE 'A.N.M.%' OR institute LIKE 'ANM %' OR institute LIKE '%ANM SCHOOL%' 
             OR institute LIKE '%ANM TRAINING%' OR institute LIKE '%(ANM%' OR institute LIKE '%ANM)%'
             OR institute LIKE 'S.K.M.C.H.%' OR institute LIKE 'P.M.I.%' OR institute LIKE 'A.H.S.%' 
             OR institute LIKE 'A.N.M.M.C.H.%' OR institute LIKE 'B.M.I.M.S.%' OR institute LIKE 'D.M.C.H.%' 
             OR institute LIKE 'G.M.C.%' OR institute LIKE 'G.P.I.%' OR institute LIKE 'J.L.N.M.C.H.%' 
             OR institute LIKE 'N.M.C.H.%' OR institute LIKE 'P.H.I.%' OR institute LIKE 'P.M.C.H.%' 
             OR institute LIKE 'PATNA DENTAL%' OR institute LIKE 'GOVERNMENT%' OR institute LIKE 'GOVT%' 
             OR institute LIKE 'STATE%' OR institute LIKE 'DISTRICT%' OR institute LIKE '%CHC%' 
             OR institute LIKE '%PHC%' OR institute LIKE '%SDH%' OR institute LIKE '%SADAR%' 
             OR institute LIKE 'CIVIL%' OR institute LIKE '%MEDICAL COLLEGE%'
             -- Additional DRESSER branch government institutions
             OR institute = 'A.N.M.M.C.H.' OR institute = 'B.M.I.M.S' OR institute = 'D.M.C.H.'
             OR institute = 'G.M.C.' OR institute = 'J.L.N.M.C.H.' OR institute = 'N.M.C.H.'
             OR institute = 'P.M.C.H.' OR institute = 'P.M.I.' OR institute = 'S.K.M.C.H.'
             OR institute LIKE 'UNDER%'
        THEN 'Government'
        ELSE 'Private'
    END as college_type,
    created_at
FROM nursing_cutoffs;

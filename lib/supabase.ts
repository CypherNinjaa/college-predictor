import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript
export interface College {
	id?: number;
	year: number;
	institute: string;
	branch: string;
	category: string;
	opening_rank?: number;
	closing_rank: number;
	college_type?: "Government" | "Private";
	created_at?: string;
}

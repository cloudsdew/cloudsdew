import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Registration {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  current_role_title?: string
  experience_level: "beginner" | "intermediate" | "advanced"
  program_type: "mentorship" | "bootcamp"
  areas_of_interest?: string
  schedule_preference?: "weekdays" | "evenings" | "weekends" | "flexible"
  goals_expectations?: string
  terms_accepted: boolean
  status: "pending" | "approved" | "rejected" | "completed"
  created_at: string
  updated_at: string
}

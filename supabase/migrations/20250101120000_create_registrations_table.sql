-- Create simplified schema for CloudsDew registration system
-- This migration creates only the registrations table (no contact forms or newsletter)

-- Create enum types for better data integrity
CREATE TYPE program_type AS ENUM ('mentorship', 'bootcamp');
CREATE TYPE experience_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE schedule_preference AS ENUM ('weekdays', 'evenings', 'weekends', 'flexible');
CREATE TYPE registration_status AS ENUM ('pending', 'approved', 'rejected', 'completed');

-- Create registrations table for program signups
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    current_role_title VARCHAR(200),
    experience_level experience_level NOT NULL,
    program_type program_type NOT NULL,
    areas_of_interest VARCHAR(500), -- For mentorship program
    schedule_preference schedule_preference, -- For bootcamp program
    goals_expectations TEXT,
    terms_accepted BOOLEAN NOT NULL DEFAULT false,
    status registration_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_program_type ON public.registrations(program_type);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for registrations table
-- Allow public to insert (register)
CREATE POLICY "Allow public registration insert" ON public.registrations
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow service role to manage all registrations (for admin functions)
CREATE POLICY "Service role can manage registrations" ON public.registrations
    FOR ALL TO service_role
    USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_registrations_updated_at 
    BEFORE UPDATE ON public.registrations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create admin function to get registration statistics
CREATE OR REPLACE FUNCTION get_registration_stats()
RETURNS TABLE (
    total_registrations BIGINT,
    mentorship_registrations BIGINT,
    bootcamp_registrations BIGINT,
    pending_registrations BIGINT,
    approved_registrations BIGINT,
    this_month_registrations BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_registrations,
        COUNT(*) FILTER (WHERE program_type = 'mentorship') as mentorship_registrations,
        COUNT(*) FILTER (WHERE program_type = 'bootcamp') as bootcamp_registrations,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_registrations,
        COUNT(*) FILTER (WHERE status = 'approved') as approved_registrations,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('month', CURRENT_DATE)) as this_month_registrations
    FROM public.registrations;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update registration status
CREATE OR REPLACE FUNCTION update_registration_status(
    registration_id UUID,
    new_status registration_status
)
RETURNS BOOLEAN AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE public.registrations 
    SET status = new_status, updated_at = NOW()
    WHERE id = registration_id;
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    
    RETURN updated_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to service role
GRANT EXECUTE ON FUNCTION get_registration_stats() TO service_role;
GRANT EXECUTE ON FUNCTION update_registration_status(UUID, registration_status) TO service_role; 
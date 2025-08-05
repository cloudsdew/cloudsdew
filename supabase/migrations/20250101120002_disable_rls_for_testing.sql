-- Temporarily disable RLS for public registration forms
-- This is common for public-facing registration forms

-- Disable RLS temporarily to allow public registrations
ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to anon and authenticated users
GRANT INSERT, SELECT ON public.registrations TO anon;
GRANT ALL ON public.registrations TO authenticated;
GRANT ALL ON public.registrations TO service_role;

-- Grant usage on sequences (for UUID generation)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated; 
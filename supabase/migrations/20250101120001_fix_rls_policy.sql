-- Fix Row Level Security policy to allow public registration
-- This migration ensures anonymous users can insert registration data

-- Drop existing policy to recreate it properly
DROP POLICY IF EXISTS "Allow public registration insert" ON public.registrations;

-- Create new policy that explicitly allows anonymous users to insert
CREATE POLICY "Allow public registration insert" ON public.registrations
    FOR INSERT TO anon
    WITH CHECK (true);

-- Ensure anon role has proper permissions
GRANT INSERT ON public.registrations TO anon;
GRANT USAGE ON SCHEMA public TO anon; 
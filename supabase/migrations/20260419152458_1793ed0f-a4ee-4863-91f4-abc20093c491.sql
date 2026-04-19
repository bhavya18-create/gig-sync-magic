-- Create users table for signup data
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (signup is public)
CREATE POLICY "Anyone can sign up"
  ON public.users FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read users (for dashboard listing)
CREATE POLICY "Users are viewable by everyone"
  ON public.users FOR SELECT
  USING (true);
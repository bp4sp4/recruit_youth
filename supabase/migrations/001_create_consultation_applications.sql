-- Drop existing table if exists (for development)
DROP TABLE IF EXISTS consultation_applications CASCADE;

-- Create consultation_applications table
CREATE TABLE consultation_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  checkbox_selection TEXT[], -- 체크박스 선택 (배열로 저장)
  region TEXT NOT NULL CHECK (region IN ('서울', '경기인천', '그 외지역')),
  privacy_consent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_consultation_applications_created_at ON consultation_applications(created_at DESC);

-- Enable Row Level Security
ALTER TABLE consultation_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (admins) to read all applications
CREATE POLICY "Authenticated users can read all applications"
  ON consultation_applications
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create policy for inserting applications (public access for form submission)
CREATE POLICY "Anyone can insert applications"
  ON consultation_applications
  FOR INSERT
  WITH CHECK (true);

-- Create policy for deleting applications (admins)
CREATE POLICY "Authenticated users can delete applications"
  ON consultation_applications
  FOR DELETE
  USING (auth.role() = 'authenticated');


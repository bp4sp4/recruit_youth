-- Add delivery tracking fields to consultation_applications table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'consultation_applications' AND column_name = 'delivered_to') THEN
    ALTER TABLE consultation_applications ADD COLUMN delivered_to TEXT;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'consultation_applications' AND column_name = 'delivered_at') THEN
    ALTER TABLE consultation_applications ADD COLUMN delivered_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Create index for filtering delivered/undelivered applications
CREATE INDEX IF NOT EXISTS idx_consultation_applications_delivered_at 
  ON consultation_applications(delivered_at DESC);

-- Create policy for authenticated users (admins) to update applications (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'consultation_applications' 
    AND policyname = 'Authenticated users can update applications'
  ) THEN
    CREATE POLICY "Authenticated users can update applications"
      ON consultation_applications
      FOR UPDATE
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;


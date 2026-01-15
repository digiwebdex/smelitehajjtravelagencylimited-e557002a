-- Add contact info columns to footer_content table
ALTER TABLE public.footer_content 
ADD COLUMN IF NOT EXISTS contact_address TEXT,
ADD COLUMN IF NOT EXISTS contact_phones TEXT[],
ADD COLUMN IF NOT EXISTS contact_email TEXT;
-- Add WhatsApp number field to team_members table
ALTER TABLE public.team_members
ADD COLUMN whatsapp_number TEXT;
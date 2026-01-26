-- Create gallery_videos table for custom video management
CREATE TABLE public.gallery_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gallery_videos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (videos are displayed publicly)
CREATE POLICY "Gallery videos are viewable by everyone" 
ON public.gallery_videos 
FOR SELECT 
USING (true);

-- Create policies for admin management
CREATE POLICY "Admins can insert gallery videos" 
ON public.gallery_videos 
FOR INSERT 
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update gallery videos" 
ON public.gallery_videos 
FOR UPDATE 
USING (public.is_admin());

CREATE POLICY "Admins can delete gallery videos" 
ON public.gallery_videos 
FOR DELETE 
USING (public.is_admin());

-- Create trigger for updated_at
CREATE TRIGGER update_gallery_videos_updated_at
BEFORE UPDATE ON public.gallery_videos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
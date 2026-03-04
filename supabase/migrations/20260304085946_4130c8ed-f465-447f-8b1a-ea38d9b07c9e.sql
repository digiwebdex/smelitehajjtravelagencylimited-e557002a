
-- 1. Create tenants table
CREATE TABLE public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tenants" ON public.tenants FOR SELECT USING (true);
CREATE POLICY "Admins can manage tenants" ON public.tenants FOR ALL USING (is_admin());

-- 2. Add tenant_id to profiles
ALTER TABLE public.profiles ADD COLUMN tenant_id uuid REFERENCES public.tenants(id);

-- 3. Add tenant_id to packages
ALTER TABLE public.packages ADD COLUMN tenant_id uuid REFERENCES public.tenants(id);

-- 4. Insert default tenant
INSERT INTO public.tenants (name, domain) VALUES ('SM Elite Hajj', 'smelitehajj.com');

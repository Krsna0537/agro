-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('farmer', 'veterinarian', 'extension_worker', 'regulator', 'researcher');

-- Create enum for farm types  
CREATE TYPE public.farm_type AS ENUM ('pig', 'poultry', 'mixed');

-- Create enum for assessment status
CREATE TYPE public.assessment_status AS ENUM ('draft', 'completed', 'reviewed');

-- Create enum for alert severity
CREATE TYPE public.alert_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create farms table
CREATE TABLE public.farms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  farm_type farm_type NOT NULL,
  location TEXT NOT NULL,
  size_hectares DECIMAL,
  animal_count INTEGER,
  registration_number TEXT,
  coordinates POINT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create biosecurity_assessments table
CREATE TABLE public.biosecurity_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  assessor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status assessment_status NOT NULL DEFAULT 'draft',
  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  assessment_data JSONB NOT NULL DEFAULT '{}',
  recommendations TEXT,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create training_modules table
CREATE TABLE public.training_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  farm_type farm_type,
  duration_minutes INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_training_progress table
CREATE TABLE public.user_training_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.training_modules(id) ON DELETE CASCADE,
  progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100) DEFAULT 0,
  completed BOOLEAN NOT NULL DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Create compliance_records table
CREATE TABLE public.compliance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
  checklist_item TEXT NOT NULL,
  is_compliant BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  evidence_url TEXT,
  checked_by UUID NOT NULL REFERENCES auth.users(id),
  checked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity alert_severity NOT NULL DEFAULT 'medium',
  farm_type farm_type,
  location TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create user_alerts table for tracking which users have seen alerts
CREATE TABLE public.user_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_id UUID NOT NULL REFERENCES public.alerts(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, alert_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biosecurity_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_training_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_alerts ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name)
  VALUES (NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_roles  
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Regulators can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'regulator'));

-- RLS Policies for farms
CREATE POLICY "Farm owners can manage their farms" ON public.farms
  FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "Veterinarians and extension workers can view farms" ON public.farms
  FOR SELECT USING (
    public.has_role(auth.uid(), 'veterinarian') OR 
    public.has_role(auth.uid(), 'extension_worker') OR
    public.has_role(auth.uid(), 'regulator')
  );

-- RLS Policies for biosecurity_assessments
CREATE POLICY "Farm owners can view their assessments" ON public.biosecurity_assessments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.farms 
      WHERE id = farm_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Assessors can manage assessments they created" ON public.biosecurity_assessments
  FOR ALL USING (auth.uid() = assessor_id);

CREATE POLICY "Regulators can view all assessments" ON public.biosecurity_assessments
  FOR SELECT USING (public.has_role(auth.uid(), 'regulator'));

-- RLS Policies for training_modules
CREATE POLICY "Everyone can view published modules" ON public.training_modules
  FOR SELECT USING (is_published = true OR auth.uid() = created_by);

CREATE POLICY "Extension workers and regulators can manage modules" ON public.training_modules
  FOR ALL USING (
    public.has_role(auth.uid(), 'extension_worker') OR 
    public.has_role(auth.uid(), 'regulator')
  );

-- RLS Policies for user_training_progress
CREATE POLICY "Users can manage their own progress" ON public.user_training_progress
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for compliance_records
CREATE POLICY "Farm owners can view their compliance records" ON public.compliance_records
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.farms 
      WHERE id = farm_id AND owner_id = auth.uid()
    )
  );

CREATE POLICY "Authorized users can create compliance records" ON public.compliance_records
  FOR INSERT WITH CHECK (
    public.has_role(auth.uid(), 'veterinarian') OR 
    public.has_role(auth.uid(), 'extension_worker') OR
    public.has_role(auth.uid(), 'regulator') OR
    EXISTS (
      SELECT 1 FROM public.farms 
      WHERE id = farm_id AND owner_id = auth.uid()
    )
  );

-- RLS Policies for alerts
CREATE POLICY "Everyone can view active alerts" ON public.alerts
  FOR SELECT USING (is_active = true);

CREATE POLICY "Regulators can manage alerts" ON public.alerts
  FOR ALL USING (public.has_role(auth.uid(), 'regulator'));

-- RLS Policies for user_alerts
CREATE POLICY "Users can manage their own alert tracking" ON public.user_alerts
  FOR ALL USING (auth.uid() = user_id);

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farms_updated_at
  BEFORE UPDATE ON public.farms
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_biosecurity_assessments_updated_at
  BEFORE UPDATE ON public.biosecurity_assessments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_modules_updated_at
  BEFORE UPDATE ON public.training_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_training_progress_updated_at
  BEFORE UPDATE ON public.user_training_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
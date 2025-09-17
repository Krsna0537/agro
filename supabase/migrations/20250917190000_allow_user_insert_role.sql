-- Allow authenticated users to insert their own role row
CREATE POLICY "Users can insert their own role" ON public.user_roles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);



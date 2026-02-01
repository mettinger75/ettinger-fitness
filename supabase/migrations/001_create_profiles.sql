-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('superadmin','admin','member')),
  initials TEXT NOT NULL,
  sport TEXT,
  date_of_birth DATE,
  bio TEXT,
  color TEXT DEFAULT '#C9A227',
  avatar_url TEXT,
  level TEXT DEFAULT 'Beginner',
  streak_count INTEGER DEFAULT 0,
  streak_last_active DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Family can view all profiles"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = auth_id OR
    EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role IN ('superadmin','admin')));

CREATE POLICY "Superadmin manages profiles"
  ON profiles FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role = 'superadmin'));

CREATE POLICY "Superadmin deletes profiles"
  ON profiles FOR DELETE
  USING (EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role = 'superadmin'));

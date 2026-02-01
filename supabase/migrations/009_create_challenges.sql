CREATE TABLE IF NOT EXISTS family_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  metric TEXT NOT NULL,
  target_value INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT DEFAULT 'active',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE family_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view challenges" ON family_challenges FOR SELECT USING (true);
CREATE POLICY "Admins manage challenges" ON family_challenges FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role IN ('superadmin','admin'))
);
CREATE POLICY "Admins update challenges" ON family_challenges FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role IN ('superadmin','admin'))
);
CREATE POLICY "Admins delete challenges" ON family_challenges FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE auth_id = auth.uid() AND role IN ('superadmin','admin'))
);

CREATE TABLE IF NOT EXISTS challenge_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES family_challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  current_value INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(challenge_id, user_id)
);

ALTER TABLE challenge_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view progress" ON challenge_progress FOR SELECT USING (true);
CREATE POLICY "Users manage own progress" ON challenge_progress FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own progress" ON challenge_progress FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own progress" ON challenge_progress FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

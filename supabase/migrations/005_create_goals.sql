CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  target_value DECIMAL,
  current_value DECIMAL,
  unit TEXT,
  progress_pct INTEGER DEFAULT 0,
  note TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','completed','paused','archived')),
  due_date DATE,
  created_at TIMESTAMPTz DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view goals" ON goals FOR SELECT USING (true);
CREATE POLICY "Users manage own goals" ON goals FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own goals" ON goals FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own goals" ON goals FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  earned_at TIMESTAMPTz DEFAULT now()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view achievements" ON achievements FOR SELECT USING (true);
CREATE POLICY "Users manage own achievements" ON achievements FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own achievements" ON achievements FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own achievements" ON achievements FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

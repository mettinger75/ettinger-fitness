CREATE TABLE IF NOT EXISTS nutrition_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  calories_goal INTEGER DEFAULT 2400,
  protein_goal INTEGER DEFAULT 180,
  carbs_goal INTEGER DEFAULT 250,
  fat_goal INTEGER DEFAULT 80,
  water_goal INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE nutrition_daily ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view nutrition" ON nutrition_daily FOR SELECT USING (true);
CREATE POLICY "Users manage own nutrition" ON nutrition_daily FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own nutrition" ON nutrition_daily FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own nutrition" ON nutrition_daily FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  name TEXT NOT NULL,
  calories INTEGER DEFAULT 0,
  protein INTEGER DEFAULT 0,
  carbs INTEGER DEFAULT 0,
  fat INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTz DEFAULT now()
);

ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view meals" ON meals FOR SELECT USING (true);
CREATE POLICY "Users manage own meals" ON meals FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own meals" ON meals FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own meals" ON meals FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

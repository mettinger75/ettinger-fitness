CREATE TABLE IF NOT EXISTS body_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight DECIMAL(5,1),
  body_fat_pct DECIMAL(4,1),
  resting_hr INTEGER,
  vo2_max DECIMAL(4,1),
  sleep_hours DECIMAL(3,1),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE body_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view metrics" ON body_metrics FOR SELECT USING (true);
CREATE POLICY "Users manage own metrics" ON body_metrics FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own metrics" ON body_metrics FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own metrics" ON body_metrics FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

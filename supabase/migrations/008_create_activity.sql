CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  activity_type TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 0,
  calories INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view activity" ON activity_log FOR SELECT USING (true);
CREATE POLICY "Users manage own activity" ON activity_log FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own activity" ON activity_log FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own activity" ON activity_log FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

CREATE TABLE IF NOT EXISTS swim_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  course TEXT DEFAULT 'SCY' CHECK (course IN ('SCY','SCM','LCM')),
  personal_best TEXT,
  previous_best TEXT,
  goal_time TEXT,
  time_drop DECIMAL(5,2),
  splits JSONB DEFAULT '[]',
  updated_at TIMESTAMPTz DEFAULT now()
);

ALTER TABLE swim_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view swim events" ON swim_events FOR SELECT USING (true);
CREATE POLICY "Users manage own swim events" ON swim_events FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own swim events" ON swim_events FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own swim events" ON swim_events FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

CREATE TABLE IF NOT EXISTS swim_meets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meet_name TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTz DEFAULT now()
);

ALTER TABLE swim_meets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view swim meets" ON swim_meets FOR SELECT USING (true);
CREATE POLICY "Users manage own swim meets" ON swim_meets FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own swim meets" ON swim_meets FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own swim meets" ON swim_meets FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

CREATE TABLE IF NOT EXISTS swim_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meet_id UUID REFERENCES swim_meets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  time TEXT NOT NULL,
  place TEXT,
  splits JSONB DEFAULT '[]',
  is_pb BOOLEAN DEFAULT FALSE,
  reaction_time DECIMAL(4,2),
  stroke_count INTEGER,
  swolf INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE swim_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view swim results" ON swim_results FOR SELECT USING (true);
CREATE POLICY "Users manage own swim results" ON swim_results FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own swim results" ON swim_results FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own swim results" ON swim_results FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

CREATE TABLE IF NOT EXISTS swim_training (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  week_label TEXT,
  week_start DATE NOT NULL,
  total_yardage INTEGER DEFAULT 0,
  dryland_sessions INTEGER DEFAULT 0,
  practice_count INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE swim_training ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view swim training" ON swim_training FOR SELECT USING (true);
CREATE POLICY "Users manage own swim training" ON swim_training FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own swim training" ON swim_training FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own swim training" ON swim_training FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

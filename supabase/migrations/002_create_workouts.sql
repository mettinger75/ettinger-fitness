CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  workout_type TEXT CHECK (workout_type IN ('crossfit','strength','cardio','goruck','hiit','yoga','general')),
  duration_minutes INTEGER,
  result TEXT,
  is_pr BOOLEAN DEFAULT FALSE,
  calories_burned INTEGER,
  notes TEXT,
  ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view all workouts" ON workouts FOR SELECT USING (true);
CREATE POLICY "Users manage own workouts" ON workouts FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own workouts" ON workouts FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own workouts" ON workouts FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

CREATE TABLE IF NOT EXISTS ai_workout_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  equipment JSONB DEFAULT '[]',
  goal TEXT,
  last_generated_at TIMESTAMPTZ,
  last_workout JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE ai_workout_configs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view ai configs" ON ai_workout_configs FOR SELECT USING (true);
CREATE POLICY "Users manage own ai configs" ON ai_workout_configs FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own ai configs" ON ai_workout_configs FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own ai configs" ON ai_workout_configs FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

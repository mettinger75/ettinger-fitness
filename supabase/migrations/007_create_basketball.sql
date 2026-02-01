CREATE TABLE IF NOT EXISTS basketball_seasons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  season_name TEXT NOT NULL,
  team_name TEXT,
  position TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE basketball_seasons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view seasons" ON basketball_seasons FOR SELECT USING (true);
CREATE POLICY "Users manage own seasons" ON basketball_seasons FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own seasons" ON basketball_seasons FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own seasons" ON basketball_seasons FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

CREATE TABLE IF NOT EXISTS basketball_games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id UUID REFERENCES basketball_seasons(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  opponent TEXT NOT NULL,
  result TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  rebounds INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  steals INTEGER DEFAULT 0,
  blocks INTEGER DEFAULT 0,
  fg_pct DECIMAL(4,1),
  ft_pct DECIMAL(4,1),
  three_pt_made INTEGER DEFAULT 0,
  three_pt_attempted INTEGER DEFAULT 0,
  turnovers INTEGER DEFAULT 0,
  minutes INTEGER DEFAULT 0,
  fouls INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE basketball_games ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Family can view games" ON basketball_games FOR SELECT USING (true);
CREATE POLICY "Users manage own games" ON basketball_games FOR INSERT WITH CHECK (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users update own games" ON basketball_games FOR UPDATE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));
CREATE POLICY "Users delete own games" ON basketball_games FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid()));

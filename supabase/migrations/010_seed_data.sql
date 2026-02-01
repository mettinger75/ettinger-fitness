-- Seed 5 family member profiles
-- Note: auth_id will be linked after Supabase Auth users are created
INSERT INTO profiles (id, name, full_name, role, initials, sport, date_of_birth, bio, color, level, streak_count) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Mark', 'Dr. Mark Ettinger', 'superadmin', 'ME', 'CrossFit / GoRuck', '1982-01-01', 'Anesthesiologist • Pilot • Entrepreneur', '#C9A227', 'Elite', 12),
  ('22222222-2222-2222-2222-222222222222', 'Gena', 'Gena Ettinger', 'admin', 'GE', 'General Fitness', '1983-01-01', 'PA-C • GI Alliance Executive', '#E879A8', 'Advanced', 8),
  ('33333333-3333-3333-3333-333333333333', 'Eli', 'Eli Ettinger', 'member', 'EE', 'Competitive Swimming', '2009-08-14', 'LAC National Group • Byron Nelson HS • 6''2"', '#38BDF8', 'Competitive', 21),
  ('44444444-4444-4444-4444-444444444444', 'Gavin', 'Gavin Ettinger', 'member', 'GV', 'Basketball', '2013-10-11', 'Point Guard • AAU Basketball', '#FB923C', 'Rising Star', 6),
  ('55555555-5555-5555-5555-555555555555', 'Savannah', 'Savannah Ettinger', 'member', 'SE', 'Multi-Sport Athlete', '2016-01-29', 'Gifted Athlete • Multi-Sport', '#A78BFA', 'Junior Pro', 4);

-- Eli's full swim data (14 events, 11 meets, 50+ results) is in 011_eli_swim_data.sql

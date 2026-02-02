'use client';

import { useState } from 'react';
import { User, Save, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useUserStore } from '@/lib/store/useUserStore';
import {
  ALL_SPORTS,
  ALL_ACTIVITY_TYPES,
  ALL_GOAL_CATEGORIES,
  ACCENT_COLORS,
  AVATARS,
  USERS,
} from '@/lib/constants/users';

function ToggleChip({ label, active, color, onClick }: { label: string; active: boolean; color: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
        active ? '' : 'opacity-50 hover:opacity-75'
      }`}
      style={{
        backgroundColor: active ? `${color}25` : `${color}10`,
        color: active ? color : undefined,
        boxShadow: active ? `0 0 0 1px ${color}, 0 0 0 3px var(--color-bg-card)` : undefined,
      }}
    >
      {label}
    </button>
  );
}

export default function ProfilePage() {
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const updateUser = useUserStore((s) => s.updateUser);
  const user = getActiveUser();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(String(user.age));
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [accentColor, setAccentColor] = useState(user.accentColor);
  const [sports, setSports] = useState<string[]>(user.sports);
  const [trackedActivities, setTrackedActivities] = useState<string[]>(user.trackedActivities);
  const [goalCategories, setGoalCategories] = useState<string[]>(user.goalCategories);
  const [saved, setSaved] = useState(false);

  function toggle(arr: string[], item: string): string[] {
    return arr.includes(item) ? arr.filter((a) => a !== item) : [...arr, item];
  }

  function handleSave() {
    updateUser(user.id, {
      name,
      age: Number(age) || user.age,
      bio,
      avatar,
      accentColor,
      sports,
      trackedActivities,
      goalCategories,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    const base = USERS.find((u) => u.id === user.id);
    if (!base) return;
    setName(base.name);
    setAge(String(base.age));
    setBio(base.bio);
    setAvatar(base.avatar);
    setAccentColor(base.accentColor);
    setSports(base.sports);
    setTrackedActivities(base.trackedActivities);
    setGoalCategories(base.goalCategories);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            {avatar}
          </div>
          <div>
            <h1 className="text-xl font-display tracking-wide text-text-primary">{name}&apos;s Profile</h1>
            <p className="text-sm text-text-muted capitalize">{user.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw size={14} /> Reset
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save size={14} /> {saved ? 'Saved!' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Basic Info */}
      <Card>
        <div className="flex items-center gap-2 mb-5">
          <User size={18} style={{ color: accentColor }} />
          <h3 className="text-sm font-semibold text-text-primary">Basic Info</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input id="profile-name" label="Display Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input id="profile-age" label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="mt-4">
          <Input id="profile-bio" label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short description..." />
        </div>
      </Card>

      {/* Avatar & Color */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Avatar</h3>
          <div className="flex flex-wrap gap-2">
            {AVATARS.map((a) => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                  avatar === a ? 'scale-110' : 'hover:scale-105 opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: avatar === a ? `${accentColor}25` : `${accentColor}10`,
                  boxShadow: avatar === a ? `0 0 0 2px var(--color-bg-card), 0 0 0 4px ${accentColor}` : undefined,
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-4">Accent Color</h3>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setAccentColor(c.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer ${
                  accentColor === c.value ? '' : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: `${c.value}15`,
                  boxShadow: accentColor === c.value ? `0 0 0 2px var(--color-bg-card), 0 0 0 4px ${c.value}` : undefined,
                }}
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.value }} />
                <span className="text-xs text-text-primary">{c.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Sports */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">Sports &amp; Activities</h3>
        <p className="text-xs text-text-dim mb-4">Select the sports you participate in. This controls which pages appear in your sidebar navigation.</p>
        <div className="flex flex-wrap gap-2">
          {ALL_SPORTS.map((s) => (
            <ToggleChip
              key={s}
              label={s}
              active={sports.includes(s)}
              color={accentColor}
              onClick={() => setSports(toggle(sports, s))}
            />
          ))}
        </div>
      </Card>

      {/* Tracked Activities */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">Tracked Activities</h3>
        <p className="text-xs text-text-dim mb-4">Choose which activity types show up when you log activities. You can always add more later.</p>
        <div className="flex flex-wrap gap-2">
          {ALL_ACTIVITY_TYPES.map((a) => (
            <ToggleChip
              key={a}
              label={a}
              active={trackedActivities.includes(a)}
              color={accentColor}
              onClick={() => setTrackedActivities(toggle(trackedActivities, a))}
            />
          ))}
        </div>
      </Card>

      {/* Goal Categories */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-2">Goal Categories</h3>
        <p className="text-xs text-text-dim mb-4">Select which goal categories are most relevant to your training. These appear when creating new goals.</p>
        <div className="flex flex-wrap gap-2">
          {ALL_GOAL_CATEGORIES.map((g) => (
            <ToggleChip
              key={g}
              label={g}
              active={goalCategories.includes(g)}
              color={accentColor}
              onClick={() => setGoalCategories(toggle(goalCategories, g))}
            />
          ))}
        </div>
      </Card>

      {/* Badges */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-4">Badges</h3>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((b) => (
            <Badge key={b} label={b} color={accentColor} />
          ))}
        </div>
        <p className="text-xs text-text-dim mt-3">Badges are earned automatically as you hit milestones.</p>
      </Card>
    </div>
  );
}

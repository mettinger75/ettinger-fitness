export interface UserProfile {
  id: string;
  name: string;
  role: 'parent' | 'child';
  avatar: string;
  age: number;
  bio: string;
  accentColor: string;
  sports: string[];
  badges: string[];
  trackedActivities: string[];
  goalCategories: string[];
}

export const ALL_SPORTS = [
  'Strength', 'Conditioning', 'Yoga', 'Wellness', 'Swimming',
  'Basketball', 'Soccer', 'Tennis', 'Running', 'Cycling',
  'Dance', 'Gymnastics', 'Martial Arts', 'General Fitness',
];

export const ALL_ACTIVITY_TYPES = [
  'Strength Training', 'Conditioning', 'HIIT', 'Running', 'Walking',
  'Cycling', 'Yoga', 'Pilates', 'Swimming', 'Basketball Practice',
  'Basketball Game', 'Soccer', 'Tennis', 'Dance', 'Gymnastics',
  'Martial Arts', 'Stretching', 'Recovery', 'Cross Training', 'Other',
];

export const ALL_GOAL_CATEGORIES = [
  'Strength', 'Endurance', 'Weight', 'Nutrition', 'Flexibility',
  'Speed', 'Skills', 'Consistency', 'Competition', 'Recovery',
];

export const ACCENT_COLORS = [
  { label: 'Gold', value: '#C9A227' },
  { label: 'Rose', value: '#E879A8' },
  { label: 'Sky', value: '#38BDF8' },
  { label: 'Orange', value: '#FB923C' },
  { label: 'Violet', value: '#A78BFA' },
  { label: 'Emerald', value: '#34D399' },
  { label: 'Red', value: '#F87171' },
  { label: 'Cyan', value: '#22D3EE' },
];

export const AVATARS = ['💪', '🧘', '🏊', '🏀', '🎯', '🏃', '⚽', '🎾', '🚴', '💃', '🥋', '⭐', '🔥', '🏆'];

export const USERS: UserProfile[] = [
  {
    id: 'mark',
    name: 'Mark',
    role: 'parent',
    avatar: '💪',
    age: 47,
    bio: 'Family fitness leader. Strength & conditioning enthusiast.',
    accentColor: '#C9A227',
    sports: ['Strength', 'Conditioning'],
    badges: ['Admin', 'Coach'],
    trackedActivities: ['Strength Training', 'Conditioning', 'HIIT', 'Running', 'Cross Training'],
    goalCategories: ['Strength', 'Endurance', 'Weight', 'Consistency'],
  },
  {
    id: 'gena',
    name: 'Gena',
    role: 'parent',
    avatar: '🧘',
    age: 44,
    bio: 'Yoga & wellness advocate. Nutrition-focused.',
    accentColor: '#E879A8',
    sports: ['Yoga', 'Wellness'],
    badges: ['Admin'],
    trackedActivities: ['Yoga', 'Pilates', 'Walking', 'Stretching', 'Recovery'],
    goalCategories: ['Flexibility', 'Nutrition', 'Weight', 'Consistency'],
  },
  {
    id: 'eli',
    name: 'Eli',
    role: 'child',
    avatar: '🏊',
    age: 16,
    bio: 'Competitive swimmer. Chasing PBs every meet.',
    accentColor: '#38BDF8',
    sports: ['Swimming'],
    badges: ['Swimmer'],
    trackedActivities: ['Swimming', 'Strength Training', 'Conditioning', 'Stretching'],
    goalCategories: ['Speed', 'Endurance', 'Strength', 'Competition'],
  },
  {
    id: 'gavin',
    name: 'Gavin',
    role: 'child',
    avatar: '🏀',
    age: 14,
    bio: 'Basketball guard. Working on speed & agility.',
    accentColor: '#FB923C',
    sports: ['Basketball'],
    badges: ['Baller'],
    trackedActivities: ['Basketball Practice', 'Basketball Game', 'Conditioning', 'Running'],
    goalCategories: ['Skills', 'Speed', 'Strength', 'Competition'],
  },
  {
    id: 'savannah',
    name: 'Savannah',
    role: 'child',
    avatar: '🎯',
    age: 11,
    bio: 'All-around athlete. Loves trying new things.',
    accentColor: '#A78BFA',
    sports: ['General Fitness'],
    badges: ['Explorer'],
    trackedActivities: ['Dance', 'Gymnastics', 'Running', 'Swimming', 'Other'],
    goalCategories: ['Skills', 'Consistency', 'Endurance', 'Flexibility'],
  },
];

export function getUserById(id: string): UserProfile | undefined {
  return USERS.find((u) => u.id === id);
}

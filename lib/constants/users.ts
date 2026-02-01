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
}

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
  },
];

export function getUserById(id: string): UserProfile | undefined {
  return USERS.find((u) => u.id === id);
}

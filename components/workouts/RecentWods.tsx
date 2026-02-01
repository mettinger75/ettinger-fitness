'use client';

import { History } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';

export function RecentWods() {
  return (
    <div>
      <SectionTitle icon={History} title="Recent Workouts" />
      <EmptyState
        icon={History}
        title="No workouts yet"
        description="Generated workouts will appear here. Create your first one above!"
      />
    </div>
  );
}

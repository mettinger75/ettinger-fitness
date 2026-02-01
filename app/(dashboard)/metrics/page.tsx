'use client';

import { Scale } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { WeightCards } from '@/components/metrics/WeightCards';
import { WeightChart } from '@/components/metrics/WeightChart';
import { BodyCompCards } from '@/components/metrics/BodyCompCards';

export default function MetricsPage() {
  return (
    <div className="space-y-8 animate-fade-up">
      <SectionTitle icon={Scale} title="Body Metrics" />
      <WeightCards />
      <WeightChart />

      <div>
        <h3 className="text-sm font-medium text-text-muted mb-4">Body Composition</h3>
        <BodyCompCards />
      </div>
    </div>
  );
}

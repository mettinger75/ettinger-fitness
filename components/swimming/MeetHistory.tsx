'use client';

import { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function MeetHistory() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card>
        <SectionTitle
          icon={Calendar}
          title="Recent Meets"
          action={
            <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
              <Plus size={14} /> Add Meet
            </Button>
          }
        />
        <EmptyState
          icon={Calendar}
          title="Log your first swim meet"
          description="Add meet results to track your competitive progress."
          action="Add Meet"
          onAction={() => setModalOpen(true)}
        />
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Swim Meet">
        <div className="space-y-4">
          <Input id="meet-name" label="Meet Name" placeholder="e.g., NCSA Junior Championships" />
          <Input id="meet-date" label="Date" type="date" />
          <Input id="location" label="Location" placeholder="e.g., Orlando, FL" />
          <Button className="w-full">Save Meet</Button>
        </div>
      </Modal>
    </>
  );
}

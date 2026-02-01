'use client';

import { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function GameLog() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card>
        <SectionTitle
          icon={Target}
          title="Game Log"
          action={
            <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
              <Plus size={14} /> Add Game
            </Button>
          }
        />
        <EmptyState
          icon={Target}
          title="Add your first game"
          description="Log games to start building your season stats."
          action="Add Game"
          onAction={() => setModalOpen(true)}
        />
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Game">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <Input id="game-date" label="Date" type="date" />
          <Input id="opponent" label="Opponent" placeholder="e.g., Dallas Mavericks AAU" />
          <Input id="result" label="Result" placeholder="e.g., W 52-44" />
          <div className="grid grid-cols-2 gap-3">
            <Input id="points" label="Points" type="number" placeholder="0" />
            <Input id="rebounds" label="Rebounds" type="number" placeholder="0" />
            <Input id="assists" label="Assists" type="number" placeholder="0" />
            <Input id="steals" label="Steals" type="number" placeholder="0" />
            <Input id="fg-pct" label="FG%" type="number" placeholder="0" />
            <Input id="ft-pct" label="FT%" type="number" placeholder="0" />
            <Input id="minutes" label="Minutes" type="number" placeholder="0" />
            <Input id="blocks" label="Blocks" type="number" placeholder="0" />
          </div>
          <Button className="w-full">Save Game</Button>
        </div>
      </Modal>
    </>
  );
}

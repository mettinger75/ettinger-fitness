'use client';

import { useState } from 'react';
import { Swords, Plus, Trash2, Trophy } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function FamilyChallenge() {
  const [modalOpen, setModalOpen] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('ettinger-challenges');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  function save(updated: Challenge[]) {
    setChallenges(updated);
    localStorage.setItem('ettinger-challenges', JSON.stringify(updated));
  }

  function handleCreate() {
    if (!title || !startDate || !endDate) return;
    const challenge: Challenge = { id: generateId(), title, description, startDate, endDate };
    save([challenge, ...challenges]);
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    save(challenges.filter((c) => c.id !== id));
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <SectionTitle
        icon={Swords}
        title="Family Challenges"
        action={
          <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> New Challenge
          </Button>
        }
      />

      {challenges.length === 0 ? (
        <EmptyState
          icon={Swords}
          title="No active challenges"
          description="Start a family fitness challenge to keep everyone motivated!"
          action="Create Challenge"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="space-y-3 mt-4">
          {challenges.map((c) => {
            const isActive = c.startDate <= today && c.endDate >= today;
            const isUpcoming = c.startDate > today;
            return (
              <Card key={c.id}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-accent-green/15' : isUpcoming ? 'bg-gold/15' : 'bg-[rgba(148,163,184,0.08)]'}`}>
                      <Trophy size={14} className={isActive ? 'text-accent-green' : isUpcoming ? 'text-gold' : 'text-text-dim'} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{c.title}</p>
                      {c.description && <p className="text-xs text-text-dim mt-0.5">{c.description}</p>}
                      <p className="text-xs text-text-muted mt-1">
                        {c.startDate} to {c.endDate}
                        {isActive && <span className="ml-2 text-accent-green font-medium">Active</span>}
                        {isUpcoming && <span className="ml-2 text-gold font-medium">Upcoming</span>}
                        {!isActive && !isUpcoming && <span className="ml-2 text-text-dim">Ended</span>}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(c.id)} className="text-text-dim hover:text-accent-red transition-colors cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Family Challenge"
        footer={<Button className="w-full" onClick={handleCreate}>Create Challenge</Button>}
      >
        <div className="space-y-4">
          <Input id="challenge-title" label="Challenge Name" placeholder="e.g., 30-Day Step Challenge" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input id="challenge-desc" label="Description" placeholder="Description of the challenge" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="challenge-start" label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <Input id="challenge-end" label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

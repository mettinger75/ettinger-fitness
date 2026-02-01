'use client';

import { useState } from 'react';
import { Target, Plus, Trash2, CheckCircle2, Pause, Play } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore } from '@/lib/store/useFitnessStore';

const CATEGORY_OPTIONS = [
  { value: 'strength', label: 'Strength' },
  { value: 'endurance', label: 'Endurance' },
  { value: 'weight', label: 'Weight' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'sport', label: 'Sport Performance' },
  { value: 'other', label: 'Other' },
];

export default function GoalsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [progressValue, setProgressValue] = useState('');

  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const goals = useFitnessStore((s) => s.getGoalsForUser(user.id));
  const addGoal = useFitnessStore((s) => s.addGoal);
  const updateGoal = useFitnessStore((s) => s.updateGoal);
  const deleteGoal = useFitnessStore((s) => s.deleteGoal);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('strength');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');
  const [deadline, setDeadline] = useState('');

  const resetForm = () => {
    setTitle('');
    setCategory('strength');
    setTarget('');
    setUnit('');
    setDeadline('');
  };

  const handleCreate = () => {
    if (!title || !target) return;
    addGoal(user.id, {
      title,
      category,
      targetValue: Number(target),
      unit,
      dueDate: deadline || undefined,
    });
    resetForm();
    setModalOpen(false);
  };

  const handleUpdateProgress = () => {
    if (!selectedGoalId) return;
    const val = Number(progressValue);
    const goal = goals.find((g) => g.id === selectedGoalId);
    updateGoal(user.id, selectedGoalId, {
      currentValue: val,
      status: goal && val >= goal.targetValue ? 'completed' : 'active',
    });
    setUpdateModalOpen(false);
    setSelectedGoalId(null);
    setProgressValue('');
  };

  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');
  const pausedGoals = goals.filter((g) => g.status === 'paused');

  return (
    <div className="space-y-8 animate-fade-up">
      <SectionTitle
        icon={Target}
        title="Goals"
        action={
          <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
            <Plus size={14} /> Create Goal
          </Button>
        }
      />

      {goals.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No goals yet"
          description="Create your first goal to start tracking progress."
          action="Create Goal"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="space-y-6">
          {activeGoals.length > 0 && (
            <div>
              <p className="text-xs text-text-dim font-medium uppercase tracking-wider mb-3">Active Goals</p>
              <div className="grid gap-3">
                {activeGoals.map((goal) => {
                  const pct = goal.targetValue > 0 ? Math.min((goal.currentValue / goal.targetValue) * 100, 100) : 0;
                  return (
                    <Card key={goal.id}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 rounded bg-bg-secondary text-text-muted capitalize">{goal.category}</span>
                            {goal.dueDate && <span className="text-xs text-text-dim">Due {goal.dueDate}</span>}
                          </div>
                          <p className="text-sm font-medium text-text-primary">{goal.title}</p>
                          <div className="mt-2">
                            <div className="flex justify-between text-xs text-text-muted mb-1">
                              <span>{goal.currentValue} / {goal.targetValue} {goal.unit}</span>
                              <span>{pct.toFixed(0)}%</span>
                            </div>
                            <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${pct}%`, backgroundColor: user.accentColor }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setSelectedGoalId(goal.id);
                              setProgressValue(String(goal.currentValue));
                              setUpdateModalOpen(true);
                            }}
                            className="p-1.5 text-text-dim hover:text-accent-blue transition-colors"
                            title="Update progress"
                          >
                            <Target size={14} />
                          </button>
                          <button
                            onClick={() => updateGoal(user.id, goal.id, { status: 'paused' })}
                            className="p-1.5 text-text-dim hover:text-accent-orange transition-colors"
                            title="Pause"
                          >
                            <Pause size={14} />
                          </button>
                          <button
                            onClick={() => deleteGoal(user.id, goal.id)}
                            className="p-1.5 text-text-dim hover:text-accent-red transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {pausedGoals.length > 0 && (
            <div>
              <p className="text-xs text-text-dim font-medium uppercase tracking-wider mb-3">Paused</p>
              <div className="grid gap-3">
                {pausedGoals.map((goal) => (
                  <Card key={goal.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-text-muted">{goal.title}</p>
                        <p className="text-xs text-text-dim">{goal.currentValue} / {goal.targetValue} {goal.unit}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateGoal(user.id, goal.id, { status: 'active' })}
                          className="p-1.5 text-text-dim hover:text-accent-green transition-colors"
                        >
                          <Play size={14} />
                        </button>
                        <button
                          onClick={() => deleteGoal(user.id, goal.id)}
                          className="p-1.5 text-text-dim hover:text-accent-red transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {completedGoals.length > 0 && (
            <div>
              <p className="text-xs text-text-dim font-medium uppercase tracking-wider mb-3">Completed</p>
              <div className="grid gap-3">
                {completedGoals.map((goal) => (
                  <Card key={goal.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-accent-green" />
                        <p className="text-sm text-text-muted">{goal.title}</p>
                      </div>
                      <span className="text-xs text-accent-green">{goal.targetValue} {goal.unit}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Goal">
        <div className="space-y-4">
          <Input id="goal-title" label="Goal Title" placeholder="e.g., Run 100 miles this month" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Select id="goal-category" label="Category" options={CATEGORY_OPTIONS} value={category} onChange={(e) => setCategory(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="goal-target" label="Target" type="number" placeholder="0" value={target} onChange={(e) => setTarget(e.target.value)} />
            <Input id="goal-unit" label="Unit" placeholder="e.g., miles, lbs, reps" value={unit} onChange={(e) => setUnit(e.target.value)} />
          </div>
          <Input id="goal-deadline" label="Deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <Button className="w-full" onClick={handleCreate}>Create Goal</Button>
        </div>
      </Modal>

      <Modal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)} title="Update Progress">
        <div className="space-y-4">
          <Input
            id="progress"
            label="Current Progress"
            type="number"
            value={progressValue}
            onChange={(e) => setProgressValue(e.target.value)}
          />
          <Button className="w-full" onClick={handleUpdateProgress}>Update</Button>
        </div>
      </Modal>
    </div>
  );
}

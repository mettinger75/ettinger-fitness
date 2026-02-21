'use client';

import { useState } from 'react';
import { UserPlus, Settings, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export function AdminActions() {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" size="sm" onClick={() => setAddUserOpen(true)}>
        <UserPlus size={14} /> Add User
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setSettingsOpen(true)}>
        <Settings size={14} /> System Settings
      </Button>

      <Modal open={addUserOpen} onClose={() => setAddUserOpen(false)} title="Add Family Member">
        <div className="flex flex-col items-center py-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
            <AlertTriangle size={22} className="text-gold" />
          </div>
          <p className="text-sm text-text-primary font-medium">Coming Soon</p>
          <p className="text-xs text-text-muted mt-2">Adding new family members will be available in a future update. For now, all 5 family members are pre-configured.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => setAddUserOpen(false)}>Got it</Button>
        </div>
      </Modal>

      <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)} title="System Settings">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-glass-border/50">
            <div>
              <p className="text-sm text-text-primary">Data Storage</p>
              <p className="text-xs text-text-dim">All data is stored locally in your browser</p>
            </div>
            <span className="text-xs text-accent-green font-medium">Local</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-glass-border/50">
            <div>
              <p className="text-sm text-text-primary">Family Members</p>
              <p className="text-xs text-text-dim">Active profiles in the system</p>
            </div>
            <span className="text-xs text-text-primary font-medium">5</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-glass-border/50">
            <div>
              <p className="text-sm text-text-primary">Theme</p>
              <p className="text-xs text-text-dim">Dark mode (default)</p>
            </div>
            <span className="text-xs text-text-muted">Dark</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-accent-red border-accent-red/30 hover:bg-accent-red/10"
            onClick={() => {
              if (window.confirm('Clear all fitness data? User profiles will be preserved.')) {
                localStorage.removeItem('ettinger-fitness-data');
                window.location.reload();
              }
            }}
          >
            Clear All Fitness Data
          </Button>
        </div>
      </Modal>
    </div>
  );
}

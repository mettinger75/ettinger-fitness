'use client';

import { useState } from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useUserStore } from '@/lib/store/useUserStore';
import { useFitnessStore } from '@/lib/store/useFitnessStore';

export function GameLog() {
  const [modalOpen, setModalOpen] = useState(false);
  const getActiveUser = useUserStore((s) => s.getActiveUser);
  const user = getActiveUser();
  const games = useFitnessStore((s) => s.getGamesForUser(user.id));
  const addGame = useFitnessStore((s) => s.addBasketballGame);
  const deleteGame = useFitnessStore((s) => s.deleteBasketballGame);

  const [date, setDate] = useState('');
  const [opponent, setOpponent] = useState('');
  const [result, setResult] = useState('');
  const [points, setPoints] = useState('');
  const [rebounds, setRebounds] = useState('');
  const [assists, setAssists] = useState('');
  const [steals, setSteals] = useState('');
  const [blocks, setBlocks] = useState('');
  const [fgPct, setFgPct] = useState('');
  const [ftPct, setFtPct] = useState('');
  const [minutes, setMinutes] = useState('');

  const resetForm = () => {
    setDate('');
    setOpponent('');
    setResult('');
    setPoints('');
    setRebounds('');
    setAssists('');
    setSteals('');
    setBlocks('');
    setFgPct('');
    setFtPct('');
    setMinutes('');
  };

  const handleSave = () => {
    if (!date || !opponent) return;
    addGame(user.id, {
      date,
      opponent,
      result,
      points: Number(points) || 0,
      rebounds: Number(rebounds) || 0,
      assists: Number(assists) || 0,
      steals: Number(steals) || 0,
      blocks: Number(blocks) || 0,
      fgPct: Number(fgPct) || 0,
      ftPct: Number(ftPct) || 0,
      minutes: Number(minutes) || 0,
    });
    resetForm();
    setModalOpen(false);
  };

  const isWin = (r: string) => r.toUpperCase().startsWith('W');

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
        {games.length === 0 ? (
          <EmptyState
            icon={Target}
            title="Add your first game"
            description="Log games to start building your season stats."
            action="Add Game"
            onAction={() => setModalOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-default">
                  <th className="text-left py-2 text-xs text-text-dim font-medium">Date</th>
                  <th className="text-left py-2 text-xs text-text-dim font-medium">Opponent</th>
                  <th className="text-center py-2 text-xs text-text-dim font-medium">Result</th>
                  <th className="text-center py-2 text-xs text-text-dim font-medium">PTS</th>
                  <th className="text-center py-2 text-xs text-text-dim font-medium hidden sm:table-cell">REB</th>
                  <th className="text-center py-2 text-xs text-text-dim font-medium hidden sm:table-cell">AST</th>
                  <th className="text-center py-2 text-xs text-text-dim font-medium hidden md:table-cell">MIN</th>
                  <th className="py-2 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id} className="border-b border-border-default/50 hover:bg-bg-card-hover transition-colors">
                    <td className="py-2.5 text-text-muted">{game.date}</td>
                    <td className="py-2.5 text-text-primary">{game.opponent}</td>
                    <td className="py-2.5 text-center">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${isWin(game.result) ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-red/10 text-accent-red'}`}>
                        {game.result}
                      </span>
                    </td>
                    <td className="py-2.5 text-center text-text-primary font-medium">{game.points}</td>
                    <td className="py-2.5 text-center text-text-muted hidden sm:table-cell">{game.rebounds}</td>
                    <td className="py-2.5 text-center text-text-muted hidden sm:table-cell">{game.assists}</td>
                    <td className="py-2.5 text-center text-text-muted hidden md:table-cell">{game.minutes}</td>
                    <td className="py-2.5">
                      <button
                        onClick={() => deleteGame(user.id, game.id)}
                        className="text-text-dim hover:text-accent-red transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Game">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <Input id="game-date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input id="opponent" label="Opponent" placeholder="e.g., Dallas Mavericks AAU" value={opponent} onChange={(e) => setOpponent(e.target.value)} />
          <Input id="result" label="Result" placeholder="e.g., W 52-44" value={result} onChange={(e) => setResult(e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <Input id="points" label="Points" type="number" placeholder="0" value={points} onChange={(e) => setPoints(e.target.value)} />
            <Input id="rebounds" label="Rebounds" type="number" placeholder="0" value={rebounds} onChange={(e) => setRebounds(e.target.value)} />
            <Input id="assists" label="Assists" type="number" placeholder="0" value={assists} onChange={(e) => setAssists(e.target.value)} />
            <Input id="steals" label="Steals" type="number" placeholder="0" value={steals} onChange={(e) => setSteals(e.target.value)} />
            <Input id="fg-pct" label="FG%" type="number" placeholder="0" value={fgPct} onChange={(e) => setFgPct(e.target.value)} />
            <Input id="ft-pct" label="FT%" type="number" placeholder="0" value={ftPct} onChange={(e) => setFtPct(e.target.value)} />
            <Input id="minutes" label="Minutes" type="number" placeholder="0" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            <Input id="blocks" label="Blocks" type="number" placeholder="0" value={blocks} onChange={(e) => setBlocks(e.target.value)} />
          </div>
          <Button className="w-full" onClick={handleSave}>Save Game</Button>
        </div>
      </Modal>
    </>
  );
}

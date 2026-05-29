'use client';
import React from 'react';
import { HoraProces } from '@/lib/types';

export interface FilterState {
  hora: string;
  maturity: string;
  automatisering: string;
  query: string;
}

interface Props {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  horaProcessen: HoraProces[];
  showSearch?: boolean;
}

export default function FilterBar({ filters, onChange, horaProcessen, showSearch = true }: Props) {
  const update = (key: keyof FilterState, value: string) =>
    onChange({ ...filters, [key]: value });

  const chipBase = 'text-xs px-3 py-1 rounded-full border cursor-pointer transition-colors';
  const activeChip = 'bg-gray-900 text-white border-gray-900';
  const inactiveChip = 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50';

  return (
    <div className="space-y-3">
      {showSearch && (
        <input
          type="text"
          value={filters.query}
          onChange={e => update('query', e.target.value)}
          placeholder="Zoek op naam of omschrijving..."
          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      )}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => update('hora', '')}
          className={`${chipBase} ${!filters.hora ? activeChip : inactiveChip}`}
        >
          Alle processen
        </button>
        {horaProcessen.map(p => (
          <button
            key={p.id}
            onClick={() => update('hora', p.id)}
            className={`${chipBase} ${filters.hora === p.id ? 'text-white border-transparent' : inactiveChip}`}
            style={filters.hora === p.id ? { backgroundColor: p.kleur, borderColor: p.kleur } : {}}
          >
            {p.naam}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(['', 'idee', 'pilot', 'bewezen', 'schaalbaar'] as const).map(m => (
          <button
            key={m}
            onClick={() => update('maturity', m)}
            className={`${chipBase} ${filters.maturity === m ? activeChip : inactiveChip}`}
          >
            {m === '' ? 'Alle fases' : m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(['', 'hoog', 'middel', 'laag'] as const).map(a => (
          <button
            key={a}
            onClick={() => update('automatisering', a)}
            className={`${chipBase} ${filters.automatisering === a ? activeChip : inactiveChip}`}
          >
            {a === '' ? 'Alle automatisering' : a.charAt(0).toUpperCase() + a.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { HoraProces } from '@/lib/types';

interface Props {
  horaId: string;
  horaProcessen: HoraProces[];
}

export default function ProcessBadge({ horaId, horaProcessen }: Props) {
  const proces = horaProcessen.find(p => p.id === horaId);
  if (!proces) return null;

  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full"
      style={{
        color: proces.kleur,
        borderColor: proces.kleur,
        backgroundColor: `${proces.kleur}1a`,
        border: `1px solid ${proces.kleur}`,
      }}
    >
      {proces.naam}
    </span>
  );
}

import React from 'react';
import Link from 'next/link';
import { Blueprint, HoraProces } from '@/lib/types';
import MaturityBadge from './MaturityBadge';

interface Props {
  blueprint: Blueprint;
  horaProcessen: HoraProces[];
  compact?: boolean;
}

export default function BlueprintCard({ blueprint, horaProcessen, compact = false }: Props) {
  const proces = horaProcessen.find(p => p.id === blueprint.hora_process);
  const procesKleur = proces?.kleur ?? '#888888';

  const automatiseringConfig = {
    hoog: { label: 'Hoge automatiseringswaarde', color: 'text-red-600' },
    middel: { label: 'Gemiddeld', color: 'text-orange-500' },
    laag: { label: 'Laag', color: 'text-blue-500' },
  };
  const auto = automatiseringConfig[blueprint.automatisering];

  if (compact) {
    return (
      <Link href={`/bibliotheek/${blueprint.id}`} className="block">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all">
          <div className="h-1.5" style={{ backgroundColor: procesKleur }} />
          <div className="p-3">
            <p className="text-xs font-medium text-gray-800 line-clamp-2">{blueprint.title}</p>
            <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{blueprint.tagline}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/bibliotheek/${blueprint.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer">
        <div className="h-2 rounded-t-lg" style={{ backgroundColor: procesKleur }} />
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <MaturityBadge maturity={blueprint.maturity} />
            <span className={`text-xs flex items-center gap-1 ${auto.color}`}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: 'currentColor' }} />
              {auto.label}
            </span>
          </div>
          <h3 className="text-base font-medium mt-2 mb-1 text-gray-900">{blueprint.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{blueprint.tagline}</p>
          <hr className="border-gray-100 mb-3" />
          <div className="flex flex-wrap gap-1 mb-3">
            {blueprint.rollen.slice(0, 3).map(rol => (
              <span key={rol} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-full">
                {rol}
              </span>
            ))}
            {blueprint.rollen.length > 3 && (
              <span className="bg-gray-100 text-gray-500 text-[11px] px-2 py-0.5 rounded-full">
                +{blueprint.rollen.length - 3}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Gebruikt door {blueprint.use_case_ids.length} teams</span>
            <span style={{ color: procesKleur }}>{proces?.naam ?? blueprint.hora_process}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

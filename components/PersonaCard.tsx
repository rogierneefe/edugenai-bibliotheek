'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Persona, UseCase, Blueprint, HoraProces } from '@/lib/types';
import { aiValueConfig, getAIValue, personaLensCopy } from '@/lib/opportunity';

interface Props {
  persona: Persona;
  usecases: UseCase[];
  blueprints: Blueprint[];
  horaProcessen: HoraProces[];
}

export default function PersonaCard({ persona, usecases, blueprints, horaProcessen }: Props) {
  const [expanded, setExpanded] = useState(false);

  const relevantUsecases = usecases.filter(uc => uc.rol.includes(persona.id));
  const relevantBlueprints = blueprints.filter(bp => bp.rollen.includes(persona.id));
  const copy = personaLensCopy[persona.id];
  const opportunityCounts = relevantUsecases.reduce<Record<string, number>>((acc, uc) => {
    const proces = horaProcessen.find(p => p.id === uc.hora_process);
    if (!proces) return acc;
    const value = getAIValue(proces);
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
  const topOpportunity = Object.entries(opportunityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as keyof typeof aiValueConfig | undefined;

  const sectorColors: Record<string, string> = {
    mbo: 'bg-purple-100 text-purple-700',
    hbo: 'bg-blue-100 text-blue-700',
    wo: 'bg-green-100 text-green-700',
    breed: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-medium text-gray-900">{persona.name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sectorColors[persona.sector]}`}>
                {persona.sector}
              </span>
            </div>
            <p className="text-sm text-gray-500">{persona.role}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <div className="text-lg font-medium text-gray-900">{relevantUsecases.length}</div>
            <div className="text-[10px] text-gray-400">ideeën</div>
          </div>
        </div>

        {copy && (
          <div className="mb-4 rounded-lg border border-gray-200 bg-stone-50 p-3">
            <p className="text-xs font-semibold leading-5 text-gray-800">{copy.startQuestion}</p>
            <p className="mt-1 text-xs leading-5 text-gray-500">{copy.decisionNeed}</p>
          </div>
        )}

        {/* Stats row */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-stone-50 rounded-lg p-2.5 text-center">
            <div className="text-sm font-medium text-gray-800">{relevantBlueprints.length}</div>
            <div className="text-[10px] text-gray-400">recepten</div>
          </div>
          <div className="flex-1 bg-stone-50 rounded-lg p-2.5 text-center">
            <div className="text-sm font-medium text-gray-800">{relevantUsecases.length}</div>
            <div className="text-[10px] text-gray-400">ideeën</div>
          </div>
          {topOpportunity && (
            <div className={`flex-1 rounded-lg border p-2.5 text-center ${aiValueConfig[topOpportunity].bg} ${aiValueConfig[topOpportunity].border}`}>
              <div className={`text-xs font-semibold ${aiValueConfig[topOpportunity].color}`}>
                {aiValueConfig[topOpportunity].label}
              </div>
              <div className="text-[10px] text-gray-500">dominant</div>
            </div>
          )}
        </div>

        {/* Goals & Concerns toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left text-xs text-gray-400 flex items-center justify-between mb-2 hover:text-gray-600"
        >
          <span className="uppercase tracking-wide">Doelen & zorgen</span>
          <span>{expanded ? '▲' : '▼'}</span>
        </button>

        {expanded && (
          <div className="space-y-3 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-green-600 mb-1">Doelen</p>
              <ul className="space-y-1">
                {persona.goals.map((g, i) => (
                  <li key={i} className="flex gap-1.5 text-xs text-gray-600">
                    <span className="text-green-500 flex-shrink-0">✓</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-amber-600 mb-1">Zorgen</p>
              <ul className="space-y-1">
                {persona.concerns.map((c, i) => (
                  <li key={i} className="flex gap-1.5 text-xs text-gray-600">
                    <span className="text-amber-500 flex-shrink-0">⚠</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Blueprints */}
        {relevantBlueprints.length > 0 && (
          <div>
            <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-2">Relevante recepten</p>
            <div className="flex flex-wrap gap-1.5">
              {relevantBlueprints.slice(0, 4).map(bp => {
                return (
                  <Link
                    key={bp.id}
                    href={`/bibliotheek/${bp.id}`}
                    className="text-[11px] px-2 py-0.5 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    {bp.title}
                  </Link>
                );
              })}
              {relevantBlueprints.length > 4 && (
                <span className="text-[11px] px-2 py-0.5 text-gray-400">
                  +{relevantBlueprints.length - 4} meer
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Use cases preview */}
      {relevantUsecases.length > 0 && (
        <div className="border-t border-gray-100 px-5 py-3 bg-stone-50">
          <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-2">Top ideeën</p>
          <ul className="space-y-1">
            {relevantUsecases.slice(0, 5).map(uc => {
              const proces = horaProcessen.find(p => p.id === uc.hora_process);
              return (
                <li key={uc.id} className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: proces?.kleur ?? '#888' }}
                  />
                  <span className="text-xs text-gray-600 truncate flex-1">{uc.title}</span>
                </li>
              );
            })}
            {relevantUsecases.length > 5 && (
              <li className="text-xs text-gray-400 pl-3">
                ... en {relevantUsecases.length - 5} meer
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

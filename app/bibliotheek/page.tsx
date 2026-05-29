'use client';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import blueprintsData from '@/data/blueprints.json';
import horaProcessenData from '@/data/hora-processen.json';
import personasData from '@/data/personas.json';
import { AIValue, Blueprint, HoraProces, Persona } from '@/lib/types';
import BlueprintCard from '@/components/BlueprintCard';
import { aiValueConfig } from '@/lib/opportunity';

const blueprints = blueprintsData as Blueprint[];
const horaProcessen = horaProcessenData as HoraProces[];
const personas = personasData as Persona[];

function BibliotheekContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [horaFilter, setHoraFilter] = useState('');
  const [maturityFilter, setMaturityFilter] = useState('');
  const [autoFilter, setAutoFilter] = useState('');
  const [personaFilter, setPersonaFilter] = useState('');
  const [aiFilter, setAiFilter] = useState<AIValue | ''>('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const hora = searchParams.get('hora');
    if (hora) {
      setHoraFilter(hora);
      setFiltersOpen(true);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return blueprints.filter(bp => {
      if (horaFilter && bp.hora_process !== horaFilter && bp.hora_secondary !== horaFilter) return false;
      if (maturityFilter && bp.maturity !== maturityFilter) return false;
      if (autoFilter && bp.automatisering !== autoFilter) return false;
      if (personaFilter && !bp.rollen.includes(personaFilter)) return false;
      if (aiFilter && bp.opportunityPosition?.aiValue !== aiFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${bp.title} ${bp.tagline} ${bp.pijn} ${bp.wat_het_doet}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [aiFilter, autoFilter, horaFilter, maturityFilter, personaFilter, query]);

  const activeCount = [horaFilter, maturityFilter, autoFilter, personaFilter, aiFilter, query].filter(Boolean).length;
  const selectedProcess = horaProcessen.find(p => p.id === horaFilter);

  const clearFilters = () => {
    setQuery('');
    setHoraFilter('');
    setMaturityFilter('');
    setAutoFilter('');
    setPersonaFilter('');
    setAiFilter('');
  };

  const chipBase = 'text-xs px-3 py-1 rounded-full border cursor-pointer transition-colors whitespace-nowrap';
  const activeChip = 'bg-gray-900 text-white border-gray-900';
  const inactiveChip = 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50';

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">← EduGenAI V2</Link>
          <Link href="/matrix" className="hover:text-gray-700">→ Opportunity Matrix</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <h1 className="text-3xl font-semibold text-gray-950">Receptenbibliotheek</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              Praktische AI-recepten voor teams, verrijkt met opportunity mapping. Zoek op wat je wilt doen,
              filter op rol of proces, en gebruik de labels om te zien of je vooral moet automatiseren,
              versnellen, augmenteren of verkennen.
            </p>
          </div>
          <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">Huidige selectie</div>
            <div className="mt-2 text-2xl font-semibold text-gray-950">{filtered.length}</div>
            <div className="text-sm text-gray-500">van {blueprints.length} recepten</div>
            {selectedProcess && (
              <div className="mt-3 rounded-lg bg-stone-50 p-3 text-xs text-gray-600">
                Proces: <span className="font-medium text-gray-900">{selectedProcess.naam}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sticky top-[61px] z-10 border-y border-gray-200 bg-stone-50/95 px-4 py-3 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Zoek op taak, recept of probleem..."
              className="min-w-[240px] flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              Zoekcriteria {filtersOpen ? 'inklappen' : 'uitklappen'}{activeCount > 0 ? ` (${activeCount})` : ''}
            </button>
            {activeCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-gray-500 underline hover:text-gray-900">
                Wis alles
              </button>
            )}
          </div>

          {filtersOpen && (
            <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <FilterGroup label="Proces">
                <button onClick={() => setHoraFilter('')} className={`${chipBase} ${!horaFilter ? activeChip : inactiveChip}`}>
                  Alle processen
                </button>
                {horaProcessen.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setHoraFilter(p.id)}
                    className={`${chipBase} ${horaFilter === p.id ? 'text-white border-transparent' : inactiveChip}`}
                    style={horaFilter === p.id ? { backgroundColor: p.kleur, borderColor: p.kleur } : {}}
                  >
                    {p.naam}
                  </button>
                ))}
              </FilterGroup>

              <FilterGroup label="Persona">
                <button onClick={() => setPersonaFilter('')} className={`${chipBase} ${!personaFilter ? activeChip : inactiveChip}`}>
                  Alle rollen
                </button>
                {personas.map(persona => (
                  <button
                    key={persona.id}
                    onClick={() => setPersonaFilter(persona.id)}
                    className={`${chipBase} ${personaFilter === persona.id ? activeChip : inactiveChip}`}
                  >
                    {persona.name}
                  </button>
                ))}
              </FilterGroup>

              <FilterGroup label="Opportunity">
                <button onClick={() => setAiFilter('')} className={`${chipBase} ${!aiFilter ? activeChip : inactiveChip}`}>
                  Alle waarden
                </button>
                {(Object.keys(aiValueConfig) as AIValue[]).map(value => (
                  <button
                    key={value}
                    onClick={() => setAiFilter(value)}
                    className={`${chipBase} ${aiFilter === value ? `${aiValueConfig[value].bg} ${aiValueConfig[value].border} ${aiValueConfig[value].color}` : inactiveChip}`}
                  >
                    {aiValueConfig[value].label}
                  </button>
                ))}
              </FilterGroup>

              <FilterGroup label="Fase en automatisering">
                {(['', 'pilot', 'bewezen', 'schaalbaar'] as const).map(m => (
                  <button key={m} onClick={() => setMaturityFilter(m)} className={`${chipBase} ${maturityFilter === m ? activeChip : inactiveChip}`}>
                    {m === '' ? 'Alle fases' : m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
                {(['', 'hoog', 'middel', 'laag'] as const).map(a => (
                  <button key={a} onClick={() => setAutoFilter(a)} className={`${chipBase} ${autoFilter === a ? activeChip : inactiveChip}`}>
                    {a === '' ? 'Alle automatisering' : a.charAt(0).toUpperCase() + a.slice(1)}
                  </button>
                ))}
              </FilterGroup>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-12 text-center">
            <p className="text-gray-600">Geen recepten gevonden voor deze zoekcriteria.</p>
            <button onClick={clearFilters} className="mt-3 text-sm font-medium text-gray-700 underline">
              Wis alle filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(bp => (
              <BlueprintCard key={bp.id} blueprint={bp} horaProcessen={horaProcessen} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export default function BibliotheekPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Laden...</div>}>
      <BibliotheekContent />
    </Suspense>
  );
}

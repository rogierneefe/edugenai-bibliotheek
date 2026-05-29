'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import blueprintsData from '@/data/blueprints.json';
import horaProcessenData from '@/data/hora-processen.json';
import { Blueprint, HoraProces } from '@/lib/types';
import BlueprintCard from '@/components/BlueprintCard';

const blueprints = blueprintsData as Blueprint[];
const horaProcessen = horaProcessenData as HoraProces[];

function BibliotheekContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [horaFilter, setHoraFilter] = useState('');
  const [maturityFilter, setMaturityFilter] = useState('');
  const [autoFilter, setAutoFilter] = useState('');

  useEffect(() => {
    const hora = searchParams.get('hora');
    if (hora) setHoraFilter(hora);
  }, [searchParams]);

  const filtered = blueprints.filter(bp => {
    if (horaFilter && bp.hora_process !== horaFilter) return false;
    if (maturityFilter && bp.maturity !== maturityFilter) return false;
    if (autoFilter && bp.automatisering !== autoFilter) return false;
    if (query) {
      const q = query.toLowerCase();
      if (!bp.title.toLowerCase().includes(q) && !bp.tagline.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const chipBase = 'text-xs px-3 py-1 rounded-full border cursor-pointer transition-colors whitespace-nowrap';
  const activeChip = 'bg-gray-900 text-white border-gray-900';
  const inactiveChip = 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50';

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">← EduGenAI Bibliotheek</Link>
          <Link href="/kaart" className="hover:text-gray-700">→ Bekijk de hotspot-kaart</Link>
        </div>
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Receptenbibliotheek</h1>
        <p className="text-sm text-gray-500">
          10 herbruikbare AI-patronen voor het onderwijs — van pilot tot bewezen aanpak.
        </p>
      </div>

      {/* Sticky filterbalk */}
      <div className="sticky top-0 z-10 bg-stone-50 border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto space-y-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Zoek op naam of omschrijving..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
          />
          <div className="flex flex-wrap gap-1.5">
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
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['', 'pilot', 'bewezen', 'schaalbaar'] as const).map(m => (
              <button key={m} onClick={() => setMaturityFilter(m)} className={`${chipBase} ${maturityFilter === m ? activeChip : inactiveChip}`}>
                {m === '' ? 'Alle fases' : m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
            <span className="mx-2 text-gray-200">|</span>
            {(['', 'hoog', 'middel', 'laag'] as const).map(a => (
              <button key={a} onClick={() => setAutoFilter(a)} className={`${chipBase} ${autoFilter === a ? activeChip : inactiveChip}`}>
                {a === '' ? 'Alle automatisering' : a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">{filtered.length} van de {blueprints.length} recepten</p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-2">Geen recepten gevonden voor deze filters. Pas je filters aan.</p>
            <button
              onClick={() => { setQuery(''); setHoraFilter(''); setMaturityFilter(''); setAutoFilter(''); }}
              className="text-sm text-gray-600 underline"
            >
              Wis alle filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(bp => (
              <BlueprintCard key={bp.id} blueprint={bp} horaProcessen={horaProcessen} />
            ))}
          </div>
        )}
      </div>
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

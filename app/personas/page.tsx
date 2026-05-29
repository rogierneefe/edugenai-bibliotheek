import React from 'react';
import Link from 'next/link';
import personasData from '@/data/personas.json';
import usecasesData from '@/data/usecases.json';
import blueprintsData from '@/data/blueprints.json';
import horaProcessenData from '@/data/hora-processen.json';
import { Persona, UseCase, Blueprint, HoraProces } from '@/lib/types';
import PersonaCard from '@/components/PersonaCard';

const personas = personasData as Persona[];
const usecases = usecasesData as UseCase[];
const blueprints = blueprintsData as Blueprint[];
const horaProcessen = horaProcessenData as HoraProces[];

export const metadata = { title: 'Persona Lens — EduGenAI Bibliotheek' };

export default function PersonasPage() {
  const totalUsecases = usecases.length;
  const totalBlueprints = blueprints.length;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-4 block">
          ← EduGenAI Bibliotheek
        </Link>
        <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">Persona Lens</h1>
            <p className="text-sm text-gray-500 max-w-xl">
              Welke AI-toepassingen zijn relevant voor jouw rol? Verken {totalUsecases} use cases en{' '}
              {totalBlueprints} recepten door de bril van 8 onderwijsprofessionals.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/kaart"
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:bg-gray-50"
            >
              Hotspot-kaart
            </Link>
            <Link
              href="/matrix"
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:bg-gray-50"
            >
              Opportunity matrix
            </Link>
            <Link
              href="/bibliotheek"
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:bg-gray-50"
            >
              Receptenbibliotheek
            </Link>
          </div>
        </div>
      </div>

      {/* Lens selector strip */}
      <div className="border-b border-gray-200 bg-white mb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-6 text-sm overflow-x-auto">
            {[
              { href: '/kaart', label: 'Hotspot-kaart' },
              { href: '/personas', label: 'Persona Lens', active: true },
              { href: '/matrix', label: 'Opportunity Matrix' },
              { href: '/bibliotheek', label: 'Recepten' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 border-b-2 whitespace-nowrap transition-colors ${
                  item.active
                    ? 'border-gray-900 text-gray-900 font-medium'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Persona grid */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {personas.map(persona => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              usecases={usecases}
              blueprints={blueprints}
              horaProcessen={horaProcessen}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

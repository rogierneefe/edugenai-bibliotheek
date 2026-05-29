import React from 'react';
import Link from 'next/link';
import blueprintsData from '@/data/blueprints.json';
import horaProcessenData from '@/data/hora-processen.json';
import { Blueprint, HoraProces } from '@/lib/types';
import BlueprintCard from '@/components/BlueprintCard';

const blueprints = blueprintsData as Blueprint[];
const horaProcessen = horaProcessenData as HoraProces[];

export default function HomePage() {
  const sortedProcessen = [...horaProcessen].sort((a, b) => b.use_case_count - a.use_case_count).slice(0, 5);
  const maxCount = sortedProcessen[0]?.use_case_count ?? 1;
  const featured = blueprints.find(bp => bp.id === 'BP-01');

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-400">EduGenAI Bibliotheek</span>
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded ml-2 text-gray-500">door Npuls</span>
          </div>
          <h1 className="text-4xl font-medium text-gray-900 max-w-2xl leading-tight">
            Samen slimmer met AI in het onderwijs
          </h1>
          <p className="text-lg text-gray-500 mt-4 max-w-xl">
            110+ ideeën van onderwijsprofessionals, vertaald naar herbruikbare recepten. Voor mbo, hbo en wo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kaart"
              className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Bekijk de hotspot-kaart →
            </Link>
            <Link
              href="/bibliotheek"
              className="border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Ga naar de bibliotheek
            </Link>
          </div>
        </div>
      </section>

      {/* Vier lenzen */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Vier lenzen op AI in het onderwijs</h2>
          <p className="text-sm text-gray-500 mb-6">Kies de invalshoek die bij je vraag past.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[
              {
                icon: '📊',
                title: 'Hotspot-kaart',
                text: 'Waar zit de meeste energie? Zie use case-dichtheid per HORA-proces in één oogopslag.',
                link: '/kaart',
                linkText: 'Bekijk de kaart →',
              },
              {
                icon: '👤',
                title: 'Persona Lens',
                text: 'Welke AI-toepassingen zijn relevant voor jouw rol? Filter op docent, student, manager en meer.',
                link: '/personas',
                linkText: 'Verken per rol →',
              },
              {
                icon: '🔲',
                title: 'Opportunity Matrix',
                text: 'Waar zet je AI het best in? Processen gepositioneerd op frequentie × variabiliteit.',
                link: '/matrix',
                linkText: 'Bekijk de matrix →',
              },
              {
                icon: '📖',
                title: 'Receptenbibliotheek',
                text: '10 herbruikbare AI-patronen, elk uitgewerkt als stapsgewijs recept met ingrediënten en valkuilen.',
                link: '/bibliotheek',
                linkText: 'Bekijk de recepten →',
              },
            ].map(card => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
                <span className="text-2xl mb-3 block">{card.icon}</span>
                <h3 className="text-base font-medium text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-1">{card.text}</p>
                <Link href={card.link} className="text-sm text-gray-700 hover:text-gray-900 font-medium">
                  {card.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top processen */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-xl font-medium text-gray-900 mb-2">Waar de meeste energie zit</h2>
          <p className="text-sm text-gray-500 mb-6">
            De vijf HORA-processen met de meeste AI-ideeën van onderwijsprofessionals.
          </p>
          <div className="space-y-3 mb-6">
            {sortedProcessen.map(p => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-48 text-sm text-gray-700 flex-shrink-0 truncate">{p.naam}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(p.use_case_count / maxCount) * 100}%`,
                      backgroundColor: p.kleur,
                    }}
                  />
                </div>
                <span className="w-8 text-sm text-gray-400 text-right flex-shrink-0">{p.use_case_count}</span>
              </div>
            ))}
          </div>
          <Link href="/kaart" className="text-sm text-gray-600 hover:text-gray-900">
            Bekijk alle processen op de kaart →
          </Link>
        </div>
      </section>

      {/* Uitgelicht recept */}
      {featured && (
        <section className="py-12 bg-stone-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Uitgelicht recept</h2>
            <div className="max-w-sm">
              <BlueprintCard blueprint={featured} horaProcessen={horaProcessen} />
            </div>
            <div className="mt-4">
              <Link href="/bibliotheek" className="text-sm text-gray-600 hover:text-gray-900">
                Bekijk alle {blueprints.length} recepten →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t py-8 text-center">
        <p className="text-sm text-gray-400">EduGenAI Bibliotheek · Npuls · 2026</p>
        <p className="text-sm text-gray-400 mt-1">Onderdeel van het nationaal groeifondsprogramma Npuls</p>
      </footer>
    </div>
  );
}

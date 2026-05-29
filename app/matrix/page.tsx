import React from 'react';
import Link from 'next/link';
import horaProcessenData from '@/data/hora-processen.json';
import { HoraProces } from '@/lib/types';
import OpportunityMatrix from '@/components/OpportunityMatrix';

const horaProcessen = horaProcessenData as HoraProces[];

export const metadata = { title: 'Opportunity Matrix — EduGenAI Bibliotheek' };

export default function MatrixPage() {
  const quadrantCounts = {
    automatiseren: horaProcessen.filter(p => p.ai_value === 'automatiseren').length,
    versnellen: horaProcessen.filter(p => p.ai_value === 'versnellen').length,
    augmenteren: horaProcessen.filter(p => p.ai_value === 'augmenteren').length,
    verkennen: horaProcessen.filter(p => p.ai_value === 'verkennen').length,
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-4 block">
          ← EduGenAI Bibliotheek
        </Link>
        <h1 className="text-3xl font-semibold text-gray-950 mb-2">Opportunity Matrix</h1>
        <p className="text-sm leading-6 text-gray-600 max-w-2xl mb-4">
          Waar kun je AI het best inzetten? De 11 HORA-processen gepositioneerd op frequentie en
          variabiliteit. Niet als eindantwoord, maar als gespreksstarter voor prioritering,
          randvoorwaarden en opschaling.
        </p>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
          {[
            { label: 'Automatiseren', count: quadrantCounts.automatiseren, color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
            { label: 'Versnellen', count: quadrantCounts.versnellen, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
            { label: 'Verkennen', count: quadrantCounts.verkennen, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
            { label: 'Augmenteren', count: quadrantCounts.augmenteren, color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
          ].map(item => (
            <div key={item.label} className={`border rounded-lg p-3 ${item.bg}`}>
              <div className={`text-xl font-medium ${item.color}`}>{item.count}</div>
              <div className={`text-xs ${item.color}`}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lens selector strip */}
      <div className="border-b border-gray-200 bg-white mb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-6 text-sm overflow-x-auto">
            {[
              { href: '/kaart', label: 'Hotspot-kaart' },
              { href: '/personas', label: 'Persona Lens' },
              { href: '/matrix', label: 'Opportunity Matrix', active: true },
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

      {/* Matrix */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <OpportunityMatrix horaProcessen={horaProcessen} />
      </div>
    </div>
  );
}

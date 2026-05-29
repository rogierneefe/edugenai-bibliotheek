import React from 'react';
import Link from 'next/link';

import blueprintsData from '@/data/blueprints.json';
import usecasesData from '@/data/usecases.json';
import horaProcessenData from '@/data/hora-processen.json';
import { Blueprint, UseCase, HoraProces } from '@/lib/types';
import MaturityBadge from '@/components/MaturityBadge';
import ProcessBadge from '@/components/ProcessBadge';
import CopyButton from '@/components/CopyButton';
import BlueprintCard from '@/components/BlueprintCard';
import { getRelatedBlueprints } from '@/lib/filters';
import { aiValueConfig, getFrequencyLabel, getVariabilityLabel } from '@/lib/opportunity';

const blueprints = blueprintsData as Blueprint[];
const usecases = usecasesData as UseCase[];
const horaProcessen = horaProcessenData as HoraProces[];

export async function generateStaticParams() {
  return blueprints.map(bp => ({ blueprintId: bp.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ blueprintId: string }> }) {
  const { blueprintId } = await params;
  const bp = blueprints.find(b => b.id === blueprintId);
  return { title: bp ? `${bp.title} — EduGenAI Bibliotheek` : 'Recept niet gevonden' };
}

const sectorColors: Record<string, string> = {
  mbo: 'bg-purple-100 text-purple-700',
  hbo: 'bg-blue-100 text-blue-700',
  wo: 'bg-green-100 text-green-700',
  breed: 'bg-gray-100 text-gray-600',
};

const ingredientIcons: Record<string, string> = {
  data: '🗄️',
  tool: '🔧',
  mens: '👥',
  proces: '🔀',
};

const automatiseringConfig = {
  hoog: { label: 'Hoge automatiseringswaarde', color: 'text-red-600' },
  middel: { label: 'Gemiddeld', color: 'text-orange-500' },
  laag: { label: 'Laag', color: 'text-blue-500' },
};

export default async function BlueprintDetailPage({ params }: { params: Promise<{ blueprintId: string }> }) {
  const { blueprintId } = await params;
  const bp = blueprints.find(b => b.id === blueprintId);
  if (!bp) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-medium text-gray-900 mb-2">Recept niet gevonden</h1>
          <Link href="/bibliotheek" className="text-sm text-gray-600 hover:text-gray-900 underline">
            ← Terug naar bibliotheek
          </Link>
        </div>
      </div>
    );
  }

  const horaProces = horaProcessen.find(p => p.id === bp.hora_process);
  const procesKleur = horaProces?.kleur ?? '#888888';
  const relatedBps = getRelatedBlueprints(blueprints, bp, 3);
  const bpUseCases = usecases.filter(uc => bp.use_case_ids.includes(uc.id));
  const currentIndex = blueprints.findIndex(b => b.id === bp.id);
  const prevBp = currentIndex > 0 ? blueprints[currentIndex - 1] : null;
  const nextBp = currentIndex < blueprints.length - 1 ? blueprints[currentIndex + 1] : null;
  const auto = automatiseringConfig[bp.automatisering];
  const opportunity = bp.opportunityPosition ? aiValueConfig[bp.opportunityPosition.aiValue] : null;

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-4 flex flex-wrap items-center gap-1">
          <Link href="/" className="hover:text-gray-600">EduGenAI Bibliotheek</Link>
          <span>→</span>
          <Link href="/bibliotheek" className="hover:text-gray-600">Recepten</Link>
          <span>→</span>
          <span className="text-gray-600">{bp.title}</span>
        </div>
        <div className="flex gap-3 mb-8">
          <Link href="/bibliotheek" className="text-sm border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50">
            ← Terug naar bibliotheek
          </Link>
          <Link href="/kaart" className="text-sm border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50">
            → Bekijk hotspot-kaart
          </Link>
        </div>

        {/* Hero header */}
        <div className="border-l-4 pl-5 mb-8" style={{ borderColor: procesKleur }}>
          <div className="flex flex-wrap gap-2 mb-2">
            <MaturityBadge maturity={bp.maturity} />
            <ProcessBadge horaId={bp.hora_process} horaProcessen={horaProcessen} />
            <span className={`text-xs flex items-center gap-1 ${auto.color}`}>
              <span className="w-1.5 h-1.5 rounded-full inline-block bg-current" />
              {auto.label}
            </span>
          </div>
          <h1 className="text-2xl font-medium text-gray-900 mt-2 mb-1">{bp.title}</h1>
          <p className="text-lg text-gray-500">{bp.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {bp.rollen.map(rol => (
              <span key={rol} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">{rol}</span>
            ))}
          </div>
        </div>

        {opportunity && bp.opportunityPosition && (
          <section className={`mb-6 rounded-xl border p-4 ${opportunity.bg} ${opportunity.border}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${opportunity.color}`}>Opportunity mapping</p>
                <h2 className={`mt-1 text-lg font-semibold ${opportunity.color}`}>{opportunity.label}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-700">{opportunity.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white px-2.5 py-1 text-gray-600">
                  {bp.opportunityPosition.processFrequency}
                </span>
                <span className="rounded-full bg-white px-2.5 py-1 text-gray-600">
                  {bp.opportunityPosition.processVariability}
                </span>
              </div>
            </div>
            {horaProces && (
              <p className="mt-3 text-xs text-gray-500">
                Procesinschatting: {getFrequencyLabel(horaProces.frequency)} frequentie · {getVariabilityLabel(horaProces.variability)} variabiliteit.
              </p>
            )}
          </section>
        )}

        {bp.personaValues && bp.personaValues.length > 0 && (
          <section className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Waarde per rol</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {bp.personaValues.map(value => (
                <div key={value.personaId} className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-sm font-semibold text-gray-900">{value.personaId}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{value.valueStatement}</p>
                  <p className="mt-2 text-xs text-gray-500">{value.primaryBenefit}</p>
                  {value.adoptionConcern && (
                    <p className="mt-2 text-xs text-amber-700">Let op: {value.adoptionConcern}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pijn */}
        <section className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Wat dit oplost</p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm leading-relaxed text-gray-700">{bp.pijn}</p>
          </div>
        </section>

        {/* Wat de AI doet */}
        <section className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Wat de AI doet</p>
          <p className="text-sm leading-relaxed text-gray-700">{bp.wat_het_doet}</p>
        </section>

        {/* Ingrediënten */}
        <section className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Wat je nodig hebt</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bp.ingredienten.map((ing, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{ingredientIcons[ing.type] ?? '📦'}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{ing.type}</span>
                </div>
                <p className="text-sm font-medium text-gray-800">{ing.naam}</p>
                {ing.toelichting && <p className="text-xs text-gray-400 mt-0.5">{ing.toelichting}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Stappen */}
        <section className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Aan de slag in {bp.stappen.length} stappen</p>
          <div className="space-y-3">
            {bp.stappen.map((stap, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-medium flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed text-gray-700 pt-1">{stap}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Voorbeelden */}
        <section className="mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Voorbeelden uit de praktijk</p>
          <div className="space-y-3">
            {bp.voorbeelden.map((vb, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${sectorColors[vb.sector] ?? 'bg-gray-100 text-gray-600'}`}>
                  {vb.sector.toUpperCase()}
                </span>
                <p className="text-sm text-gray-700 mt-2">{vb.beschrijving}</p>
                {vb.resultaat && (
                  <p className="text-sm text-green-700 mt-2 font-medium">✓ Resultaat: {vb.resultaat}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Valkuilen */}
        <section className="mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 font-medium mb-2">Let op</p>
            <ul className="space-y-2">
              {bp.valkuilen.map((v, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-red-500 flex-shrink-0 mt-0.5">⚠</span>
                  <span className="text-sm text-red-700">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team vraag */}
        <section className="mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-800 font-medium mb-2">Gespreksvraag voor je volgende overleg</p>
            <p className="text-sm text-amber-900 italic mb-3">{bp.team_vraag}</p>
            <CopyButton text={bp.team_vraag} label="Kopieer vraag" />
          </div>
        </section>

        {/* Use cases */}
        {bpUseCases.length > 0 && (
          <section className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
              Use cases die dit recept voeden ({bpUseCases.length})
            </p>
            <ul className="space-y-1.5">
              {bpUseCases.slice(0, 10).map(uc => (
                <li key={uc.id} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: procesKleur }} />
                  <span className="text-sm text-gray-700 flex-1">{uc.title}</span>
                  <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{uc.rol[0]}</span>
                </li>
              ))}
              {bpUseCases.length > 10 && (
                <li className="text-xs text-gray-400 pl-4">... en {bpUseCases.length - 10} meer</li>
              )}
            </ul>
          </section>
        )}

        {/* Verwante recepten */}
        {relatedBps.length > 0 && (
          <section className="mb-8">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Vergelijkbare recepten</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedBps.map(rbp => (
                <BlueprintCard key={rbp.id} blueprint={rbp} horaProcessen={horaProcessen} compact />
              ))}
            </div>
          </section>
        )}

        {/* Footer nav */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          {prevBp ? (
            <Link href={`/bibliotheek/${prevBp.id}`} className="text-sm text-gray-500 hover:text-gray-800">
              ← {prevBp.title}
            </Link>
          ) : <span />}
          {nextBp ? (
            <Link href={`/bibliotheek/${nextBp.id}`} className="text-sm text-gray-500 hover:text-gray-800">
              {nextBp.title} →
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}

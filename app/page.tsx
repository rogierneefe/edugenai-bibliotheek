import React from 'react';
import Link from 'next/link';
import blueprintsData from '@/data/blueprints.json';
import horaProcessenData from '@/data/hora-processen.json';
import personasData from '@/data/personas.json';
import usecasesData from '@/data/usecases.json';
import sourceSummary from '@/data/source-summary.json';
import communityInsightsData from '@/data/community-insights.json';
import hotspotSummaryData from '@/data/hotspot-summary.json';
import functionalPatternsData from '@/data/functional-patterns.json';
import painpointsData from '@/data/painpoints.json';
import rootCausesData from '@/data/root-causes.json';
import startedUseCasesData from '@/data/started-usecases.json';
import {
  Blueprint,
  FunctionalPattern,
  HoraProces,
  HotspotDomain,
  PainPoint,
  Persona,
  RootCause,
  StartedUseCase,
  UseCase,
} from '@/lib/types';
import BlueprintCard from '@/components/BlueprintCard';
import CompassExplorer from '@/components/CompassExplorer';
import { aiValueConfig, getAIValue, personaLensCopy } from '@/lib/opportunity';

const blueprints = blueprintsData as Blueprint[];
const horaProcessen = horaProcessenData as HoraProces[];
const personas = personasData as Persona[];
const usecases = usecasesData as UseCase[];
const communityInsights = communityInsightsData;
const hotspotSummary = hotspotSummaryData as HotspotDomain[];
const functionalPatterns = functionalPatternsData as FunctionalPattern[];
const painpoints = painpointsData as PainPoint[];
const rootCauses = rootCausesData as RootCause[];
const startedUseCases = startedUseCasesData as StartedUseCase[];

const audienceOrder = ['docent', 'student', 'medewerker', 'manager', 'onderwijskundig'];

export default function HomePage() {
  const mappedProcessen = horaProcessen.filter(p => !p.is_mapping_bucket);
  const sortedProcessen = [...mappedProcessen].sort((a, b) => b.use_case_count - a.use_case_count).slice(0, 6);
  const maxCount = sortedProcessen[0]?.use_case_count ?? 1;
  const featured = blueprints.find(bp => bp.id === 'BP-01') ?? blueprints[0];
  const aiValueCounts = mappedProcessen.reduce<Record<string, number>>((acc, proces) => {
    const value = getAIValue(proces);
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen surface-subtle">
      <CompassExplorer
        personas={personas}
        painpoints={painpoints}
        rootCauses={rootCauses}
        blueprints={blueprints}
        startedUseCases={startedUseCases}
        processes={horaProcessen}
      />

      <section className="border-b border-stone-200 bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_380px] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">V3C</span>
                <span className="text-sm font-medium text-gray-500">EduGenAI Compass · Npuls</span>
              </div>
              <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-gray-950 md:text-4xl">
                Van communitysignaal naar procesverbetering.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                Gebruik de onderliggende data om patronen te toetsen: waar starten instellingen,
                welke oorzaken keren terug, en welke blueprints zijn herbruikbaar?
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/personas" className="rounded-lg bg-gray-950 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800">
                  Start bij mijn rol
                </Link>
                <Link href="/matrix" className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50">
                  Prioriteer kansen
                </Link>
                <Link href="/bibliotheek" className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50">
                  Bekijk recepten
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Databasis</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Metric value={sourceSummary.ideaUseCasesLoaded} label="ideeën" />
                <Metric value={communityInsights.totals.startedUseCases} label="gestarte use cases" />
                <Metric value={blueprints.length} label="blueprints" />
                <Metric value={communityInsights.totals.pilotExamples} label="pilotvoorbeelden" />
              </div>
              <p className="mt-3 text-xs leading-5 text-gray-500">{communityInsights.totals.pilotEvidenceNote}</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {Object.entries(aiValueConfig).map(([value, config]) => (
                  <Link
                    href={`/matrix#${value}`}
                    key={value}
                    className={`rounded-lg border p-3 ${config.bg} ${config.border}`}
                  >
                    <div className={`text-lg font-semibold ${config.color}`}>{aiValueCounts[value] ?? 0}</div>
                    <div className={`text-xs font-medium ${config.color}`}>{config.label}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-950">Community intelligence</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Deze laag laat zien waar instellingen daadwerkelijk starten: hotspotdomeinen, patronen, oorzaken en witte vlekken.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <h3 className="text-sm font-semibold text-gray-900">Hotspotdomeinen</h3>
              <div className="mt-4 space-y-3">
                {hotspotSummary.slice(0, 6).map(domain => (
                  <div key={domain.id} className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)_48px] sm:items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{domain.title}</p>
                      <p className="line-clamp-1 text-xs text-gray-500">{domain.interpretation}</p>
                    </div>
                    <div className="h-2 rounded-full bg-white">
                      <div className="h-full rounded-full bg-gray-900" style={{ width: `${(domain.count / hotspotSummary[0].count) * 100}%` }} />
                    </div>
                    <div className="text-right text-sm font-semibold text-gray-700">{domain.count}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <InsightList title="Meest voorkomende knelpunten" items={communityInsights.topPainPoints} />
              <InsightList title="Meest voorkomende oorzaken" items={communityInsights.topRootCauses} />
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <InsightList title="Functionele patronen" items={functionalPatterns.slice(0, 5)} />
            <InsightList title="Meest gebruikte blueprints" items={communityInsights.topBlueprints.map((item: { id: string; title: string; startedUseCaseCount: number; pilotCount: number }) => ({ ...item, count: item.startedUseCaseCount }))} />
            <InsightList title="Witte vlekken" items={communityInsights.whiteSpots} />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-950">Start bij jouw vraag</h2>
              <p className="mt-1 text-sm text-gray-500">Vijf routes voor verschillende gebruikers in het vervolgonderwijs.</p>
            </div>
            <Link href="/personas" className="text-sm font-medium text-gray-700 hover:text-gray-950">
              Alle persona’s →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {audienceOrder.map(personaId => {
              const persona = personas.find(p => p.id === personaId);
              const copy = personaLensCopy[personaId];
              if (!persona || !copy) return null;
              const count = usecases.filter(uc => uc.rol.includes(persona.id)).length;
              return (
                <Link
                  href="/personas"
                  key={persona.id}
                  className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="text-xs font-medium text-gray-400">{persona.name}</div>
                  <h3 className="mt-2 text-sm font-semibold leading-6 text-gray-950">{copy.startQuestion}</h3>
                  <p className="mt-3 text-xs leading-5 text-gray-500">{copy.decisionNeed}</p>
                  <div className="mt-4 rounded-lg bg-stone-50 p-3 text-xs text-gray-600">
                    {count} ideeën · {copy.preferredLens}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <h2 className="text-xl font-semibold text-gray-950">Waar de meeste energie zit</h2>
              <p className="mt-1 text-sm text-gray-500">
                HORA-processen met veel aangedragen ideeën uit de xlsx. Schakel in de kaart naar MORA
                voor dezelfde analyse met MORA-definities.
              </p>
              <div className="mt-6 space-y-3">
                {sortedProcessen.map(proces => {
                  const value = getAIValue(proces);
                  const config = aiValueConfig[value];
                  return (
                    <Link href={`/bibliotheek?hora=${proces.id}`} key={proces.id} className="grid gap-3 rounded-lg p-2 hover:bg-stone-50 sm:grid-cols-[240px_minmax(0,1fr)_128px] sm:items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{proces.naam}</div>
                        <div className="text-xs text-gray-400">HORA</div>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full" style={{ width: `${(proces.use_case_count / maxCount) * 100}%`, backgroundColor: proces.kleur }} />
                      </div>
                      <div className="flex items-center justify-between gap-2 sm:justify-end">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${config.bg} ${config.color}`}>
                          {config.label}
                        </span>
                        <span className="text-sm font-medium text-gray-500">{proces.use_case_count}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {featured && (
              <div>
                <h2 className="mb-4 text-xl font-semibold text-gray-950">Aanbevolen startrecept</h2>
                <BlueprintCard blueprint={featured} horaProcessen={horaProcessen} />
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-8 text-center">
        <p className="text-sm text-gray-400">EduGenAI Compass V3C · Npuls · 2026</p>
      </footer>
    </div>
  );
}

function InsightList({ title, items }: { title: string; items: Array<{ title: string; count: number; interpretation?: string }> }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {items.map(item => (
          <div key={item.title} className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-gray-700">{item.title}</p>
              {item.interpretation && <p className="mt-0.5 line-clamp-2 text-xs text-gray-500">{item.interpretation}</p>}
            </div>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-medium text-gray-600">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-stone-50 p-3 text-center">
      <div className="text-2xl font-semibold text-gray-950">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

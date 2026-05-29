'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Blueprint,
  HoraProces,
  PainPoint,
  Persona,
  RootCause,
  StartedUseCase,
} from '@/lib/types';

interface Props {
  personas: Persona[];
  painpoints: PainPoint[];
  rootCauses: RootCause[];
  blueprints: Blueprint[];
  startedUseCases: StartedUseCase[];
  processes: HoraProces[];
}

const ROLE_OPTIONS = [
  { id: 'docent', label: 'Docent' },
  { id: 'student', label: 'Student' },
  { id: 'manager', label: 'Opleidingsmanager' },
  { id: 'onderwijskundig', label: 'Onderwijskundig adviseur' },
  { id: 'bestuurder', label: 'Bestuurder' },
  { id: 'informatiemanager', label: 'Informatiemanager' },
  { id: 'architect', label: 'Architect' },
  { id: 'onderzoeker', label: 'Onderzoeker' },
  { id: 'privacy-governance', label: 'Privacy officer' },
  { id: 'examencommissie', label: 'Examencommissie' },
];

const PAINPOINT_LABELS: Record<string, string> = {
  'pp-feedback-tijd': 'Nakijken kost veel tijd',
  'pp-vragen-herhaling': 'Studenten stellen steeds dezelfde vragen',
  'pp-curriculum-afstemming': 'Curriculumontwikkeling kost veel afstemming',
  'pp-documentanalyse': 'Veel documenten moeten worden beoordeeld',
  'pp-open-evaluaties': 'We missen inzicht in evaluaties',
};

const OTHER_LENS = ['docent', 'manager', 'bestuurder', 'architect', 'student', 'privacy-governance'];

const DRIVER_BY_LENS: Record<string, string> = {
  docent: 'tijdswinst en hanteerbare werkdruk',
  manager: 'kwaliteit, capaciteit en teamafspraken',
  bestuurder: 'schaalbaarheid, publieke waarde en bewijs',
  architect: 'integratie, herbruikbaarheid en informatiearchitectuur',
  student: 'beschikbaarheid, personalisatie en duidelijkheid',
  'privacy-governance': 'transparantie, grondslag en verantwoord gebruik',
};

const IMPROVEMENT_GOALS = ['doorlooptijd', 'kwaliteit', 'consistentie', 'beschikbaarheid', 'personalisatie', 'compliance'];

export default function CompassExplorer({ personas, painpoints, rootCauses, blueprints, startedUseCases, processes }: Props) {
  const [mode, setMode] = useState<'role' | 'painpoint'>('role');
  const [personaId, setPersonaId] = useState('docent');
  const [painPointId, setPainPointId] = useState('pp-feedback-tijd');

  const selectedPersona = personas.find(persona => persona.id === personaId) ?? personas[0];
  const availablePainpoints = mode === 'role'
    ? painpoints.filter(painpoint => selectedPersona?.painPointIds.includes(painpoint.id))
    : painpoints;

  const activePainpoint = useMemo(() => {
    const preferred = availablePainpoints.find(painpoint => painpoint.id === painPointId);
    return preferred ?? availablePainpoints[0] ?? painpoints[0];
  }, [availablePainpoints, painPointId, painpoints]);

  const activeRoots = rootCauses.filter(root => activePainpoint.rootCauseIds.includes(root.id));
  const activeBlueprints = blueprints.filter(blueprint => activePainpoint.blueprintIds.includes(blueprint.id));
  const activeProcesses = processes.filter(process => activePainpoint.processIds.includes(process.id));
  const activeStartedUseCases = startedUseCases
    .filter(useCase =>
      useCase.painpoints.includes(activePainpoint.id) ||
      useCase.blueprints.some(blueprintId => activePainpoint.blueprintIds.includes(blueprintId))
    )
    .slice(0, 5);
  const primaryBlueprint = activeBlueprints[0];
  const primaryRoot = activeRoots[0];
  const processLabel = activeProcesses.map(process => process.naam).join(', ') || 'Proces nog te bepalen';
  const intervention = primaryBlueprint?.title ?? 'Passende AI-interventie bepalen';

  const setRole = (id: string) => {
    setPersonaId(id);
    const persona = personas.find(item => item.id === id);
    if (persona?.painPointIds[0]) setPainPointId(persona.painPointIds[0]);
  };

  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-950 px-3 py-1 text-xs font-medium text-white">V3C</span>
              <span className="text-sm font-medium text-gray-500">EduGenAI Compass</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-gray-950 md:text-5xl">
              Wat betekent AI voor mijn rol, proces en volgende stap?
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
              Start vanuit je rol of knelpunt. De Compass vertaalt communitysignalen naar oorzaken,
              passende blueprints, risico&apos;s, waarde en een concrete eerste actie.
            </p>
          </div>
          <div className="flex rounded-lg border border-gray-200 bg-stone-50 p-1">
            <button
              onClick={() => setMode('role')}
              className={`rounded-md px-3 py-2 text-sm font-medium ${mode === 'role' ? 'bg-gray-950 text-white' : 'text-gray-600 hover:bg-white'}`}
            >
              Start bij mijn rol
            </button>
            <button
              onClick={() => setMode('painpoint')}
              className={`rounded-md px-3 py-2 text-sm font-medium ${mode === 'painpoint' ? 'bg-gray-950 text-white' : 'text-gray-600 hover:bg-white'}`}
            >
              Start bij mijn knelpunt
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4">
            <Panel title={mode === 'role' ? 'Ik ben' : 'Knelpunt'}>
              {mode === 'role' ? (
                <div className="flex flex-wrap gap-1.5">
                  {ROLE_OPTIONS.map(role => (
                    <button
                      key={role.id}
                      onClick={() => setRole(role.id)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${personaId === role.id ? 'border-gray-950 bg-gray-950 text-white' : 'border-gray-200 bg-white text-gray-700 hover:bg-stone-50'}`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              ) : (
                <PainpointButtons painpoints={painpoints} activeId={activePainpoint.id} onSelect={setPainPointId} />
              )}
            </Panel>

            {mode === 'role' && (
              <Panel title="Kies je knelpunt">
                <PainpointButtons painpoints={availablePainpoints} activeId={activePainpoint.id} onSelect={setPainPointId} />
              </Panel>
            )}

            <Panel title="Compass samenvatting">
              <div className="space-y-2 text-sm">
                <SummaryRow label="Proces" value={processLabel} />
                <SummaryRow label="Knelpunt" value={activePainpoint.title} />
                <SummaryRow label="Oorzaak" value={primaryRoot?.title ?? 'Oorzaak nog te preciseren'} />
                <SummaryRow label="Interventie" value={intervention} />
                <SummaryRow label="Verwachte verbetering" value={activePainpoint.improvementGoals.join(', ')} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {IMPROVEMENT_GOALS.map(goal => (
                  <span
                    key={goal}
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${activePainpoint.improvementGoals.includes(goal as never) ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-gray-400'}`}
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Gepersonaliseerde briefing</p>
                  <h2 className="mt-1 text-2xl font-semibold text-gray-950">
                    {selectedPersona?.name}: {PAINPOINT_LABELS[activePainpoint.id] ?? activePainpoint.title}
                  </h2>
                </div>
                <Link href="/bibliotheek" className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-stone-50">
                  Bekijk blueprints
                </Link>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <BriefingBlock title="Waarom relevant" text={`${activePainpoint.description} Voor ${selectedPersona?.name.toLowerCase()} raakt dit aan: ${selectedPersona?.goals.slice(0, 2).join(' en ')}.`} />
                <BriefingBlock title="Welke oorzaak speelt hier" text={activeRoots.map(root => `${root.informationDimension}: ${root.title}`).join(' | ')} />
                <BriefingBlock title="Welke waarde ontstaat" text={Array.from(new Set([...activePainpoint.valueDrivers, ...activePainpoint.improvementGoals])).join(', ')} />
                <BriefingBlock title="Welke risico's spelen" text={[...(selectedPersona?.concerns ?? []), ...(primaryBlueprint?.valkuilen.slice(0, 1) ?? [])].join(' | ')} />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Passende blueprints</h3>
                  <div className="mt-2 space-y-2">
                    {activeBlueprints.map(blueprint => (
                      <Link key={blueprint.id} href={`/bibliotheek/${blueprint.id}`} className="block rounded-lg border border-gray-200 bg-stone-50 p-3 hover:bg-white">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-gray-900">{blueprint.title}</p>
                          <span className="text-xs text-gray-500">{blueprint.communityStats?.startedUseCaseCount ?? 0} gestart</span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-500">{blueprint.tagline}</p>
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Instellingen die hier ook mee bezig zijn</h3>
                  <div className="mt-2 space-y-2">
                    {activeStartedUseCases.map(useCase => (
                      <div key={useCase.id} className="rounded-lg border border-gray-200 bg-stone-50 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-gray-900">{useCase.titel}</p>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-gray-600">{useCase.status}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{useCase.instelling} · {useCase.sector}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Panel title="Andere lens">
                <div className="space-y-2">
                  {OTHER_LENS.map(id => {
                    const persona = personas.find(item => item.id === id);
                    if (!persona) return null;
                    return (
                      <div key={id} className="rounded-lg bg-stone-50 p-3">
                        <p className="text-xs font-semibold text-gray-900">{persona.name}</p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">{DRIVER_BY_LENS[id]}</p>
                      </div>
                    );
                  })}
                </div>
              </Panel>

              <Panel title="Gespreksvragen en actie">
                <div className="space-y-3 text-sm leading-6 text-gray-600">
                  <p><span className="font-medium text-gray-900">Teamvraag:</span> Waar in ons proces veroorzaakt dit knelpunt de meeste wachttijd of kwaliteitsvariatie?</p>
                  <p><span className="font-medium text-gray-900">Reflectievraag:</span> Welke menselijke controle willen we behouden als AI dit voorbereidt?</p>
                  <p><span className="font-medium text-gray-900">Eerste stap:</span> Kies een kleine casus, gebruik {primaryBlueprint?.title ?? 'een passende blueprint'}, en meet effect op {activePainpoint.improvementGoals.slice(0, 2).join(' en ')}.</p>
                </div>
              </Panel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainpointButtons({ painpoints, activeId, onSelect }: { painpoints: PainPoint[]; activeId: string; onSelect: (id: string) => void }) {
  return (
    <div className="space-y-1.5">
      {painpoints.map(painpoint => (
        <button
          key={painpoint.id}
          onClick={() => onSelect(painpoint.id)}
          className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${activeId === painpoint.id ? 'border-gray-950 bg-gray-950 text-white' : 'border-gray-200 bg-white text-gray-700 hover:bg-stone-50'}`}
        >
          {PAINPOINT_LABELS[painpoint.id] ?? painpoint.title}
        </button>
      ))}
    </div>
  );
}

function Panel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <p className="text-sm leading-5 text-gray-700">{value}</p>
    </div>
  );
}

function BriefingBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg bg-stone-50 p-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-gray-700">{text}</p>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import horaProcessen from '@/data/hora-processen.json';
import usecasesData from '@/data/usecases.json';
import sourceSummary from '@/data/source-summary.json';
import communityInsights from '@/data/community-insights.json';
import hotspotSummaryData from '@/data/hotspot-summary.json';
import { HoraProces, HotspotDomain, ProcessView, Sector, UseCase, UseCaseOrigin } from '@/lib/types';
import { aiValueConfig, getAIValue, getOpportunityLabel } from '@/lib/opportunity';
import { getProcessId, getProcessLabel } from '@/lib/processViews';

const processen = horaProcessen as HoraProces[];
const usecases = usecasesData as UseCase[];
const hotspotSummary = hotspotSummaryData as HotspotDomain[];

const ROLLEN = ['docent', 'onderwijskundig adviseur', 'manager', 'student', 'medewerker', 'ict', 'hr', 'onderzoeker'];
const ROL_MAP: Record<string, string> = {
  'onderwijskundig adviseur': 'onderwijskundig',
};

export default function KaartPage() {
  const [selectedProcess, setSelectedProcess] = useState<HoraProces | null>(null);
  const [activeRollen, setActiveRollen] = useState<string[]>([]);
  const [processView, setProcessView] = useState<ProcessView>('hora');
  const [sectorFilter, setSectorFilter] = useState<Sector | ''>('');
  const [originFilter, setOriginFilter] = useState<UseCaseOrigin | ''>('idee');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const visibleProcesses = processen.filter(p => !p.is_mapping_bucket);
  const maxCount = Math.max(...visibleProcesses.map(p => p.use_case_count));
  const sorted = [...visibleProcesses].sort((a, b) => b.use_case_count - a.use_case_count);

  const toggleRol = (rol: string) => {
    setActiveRollen(prev =>
      prev.includes(rol) ? prev.filter(r => r !== rol) : [...prev, rol]
    );
  };

  const getFilteredUseCases = (proces: HoraProces) => {
    const processId = getProcessId(proces, processView);
    let cases = usecases.filter(uc => {
      const ucProcess = processView === 'mora' ? uc.mora_process : uc.hora_process;
      return ucProcess === processId;
    });
    if (activeRollen.length > 0) {
      const mappedRollen = activeRollen.map(r => ROL_MAP[r] ?? r);
      cases = cases.filter(uc => mappedRollen.some(r => uc.rol.includes(r)));
    }
    if (sectorFilter) {
      cases = cases.filter(uc => uc.sectoren?.includes(sectorFilter));
    }
    if (originFilter) {
      cases = cases.filter(uc => uc.origin_type === originFilter);
    }
    return cases;
  };

  const getBarWidth = (proces: HoraProces) => {
    if (activeRollen.length === 0 && !sectorFilter && originFilter === '') {
      return (proces.use_case_count / maxCount) * 100;
    }
    const filtered = getFilteredUseCases(proces);
    return (filtered.length / maxCount) * 100;
  };

  return (
    <div className="min-h-screen surface-subtle">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 mb-4 block">
          ← EduGenAI Bibliotheek
        </Link>
        <h1 className="text-3xl font-semibold text-gray-950 mb-2">
          Waar zit energie, en waar zit de beste AI-kans?
        </h1>
        <p className="text-sm leading-6 text-gray-600 mb-6 max-w-2xl">
          Bekijk use case-dichtheid per HORA- of MORA-proces. Combineer de beleving van onderwijsprofessionals
          met opportunity-labels voor prioritering.
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { getal: String(sourceSummary.ideaUseCasesLoaded), label: 'ideeën uit xlsx' },
              { getal: String(communityInsights.totals.startedUseCases), label: 'gestarte use cases' },
              { getal: String(communityInsights.totals.pilotExamples), label: 'pilotvoorbeelden' },
              { getal: String(hotspotSummary.length), label: 'hotspotdomeinen' },
            ].map(item => (
            <div key={item.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-medium text-gray-900">{item.getal}</div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-2">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Community-hotspots</h2>
              <p className="mt-1 text-xs text-gray-500">Hotspotanalyse op basis van gestarte use cases, niet alleen ideeën.</p>
            </div>
            <span className="text-xs text-gray-400">{communityInsights.totals.pilotEvidenceNote}</span>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            {hotspotSummary.slice(0, 6).map(domain => (
              <div key={domain.id} className="rounded-lg bg-stone-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium text-gray-800">{domain.title}</p>
                  <span className="text-sm font-semibold text-gray-900">{domain.count}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-500">{domain.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filterbalk */}
      <div className="sticky top-[61px] z-10 bg-stone-50/95 border-y border-gray-200 px-4 py-3 backdrop-blur">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Zoekcriteria</p>
              <p className="text-xs text-gray-500">
                {activeRollen.length > 0 || sectorFilter || originFilter !== 'idee'
                  ? `${[activeRollen.length > 0, sectorFilter, originFilter !== 'idee'].filter(Boolean).length} lensfilter(s) actief`
                  : 'Ideeën voor alle rollen en sectoren zichtbaar'}
              </p>
            </div>
            <div className="flex gap-2">
              {(activeRollen.length > 0 || sectorFilter || originFilter !== 'idee') && (
                <button onClick={() => { setActiveRollen([]); setSectorFilter(''); setOriginFilter('idee'); }} className="text-sm text-gray-500 underline">
                  Wis filters
                </button>
              )}
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
              >
                {filtersOpen ? 'Inklappen' : 'Uitklappen'}
              </button>
            </div>
          </div>
          {filtersOpen && (
            <div className="mt-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Procesview</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {(['hora', 'mora'] as ProcessView[]).map(view => (
                  <button
                    key={view}
                    onClick={() => {
                      setProcessView(view);
                      setSelectedProcess(null);
                    }}
                    className={`text-xs px-3 py-1 rounded-full border ${processView === view ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-700'}`}
                  >
                    {view.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Bron</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {(['', 'idee', 'pilot'] as const).map(origin => (
                  <button
                    key={origin}
                    onClick={() => setOriginFilter(origin)}
                    className={`text-xs px-3 py-1 rounded-full border ${originFilter === origin ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-700'}`}
                  >
                    {origin === '' ? 'Alle bronnen' : origin === 'idee' ? 'Ideeën' : 'Pilots'}
                  </button>
                ))}
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Sector</p>
              <div className="flex flex-wrap gap-1.5">
            {(['', 'mbo', 'hbo', 'wo'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSectorFilter(s)}
                className={`text-xs px-3 py-1 rounded-full border ${sectorFilter === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-700'}`}
              >
                {s === '' ? 'Alle sectoren' : s.toUpperCase()}
              </button>
            ))}
              </div>
              <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-gray-400">Rol</p>
              <div className="flex flex-wrap gap-1.5 items-center">
            {ROLLEN.map(rol => (
              <button
                key={rol}
                onClick={() => toggleRol(rol)}
                className={`text-xs px-3 py-1 rounded-full border cursor-pointer transition-colors ${
                  activeRollen.includes(rol)
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {rol}
              </button>
            ))}
              </div>
              <p className="mt-4 text-xs leading-5 text-gray-500">
                Tip: selecteer je rol om te zien in welke processen jouw werk het vaakst terugkomt.
              </p>
            </div>
          )}
          </div>
      </div>

      {/* Kaart + Panel */}
      <div className="max-w-5xl mx-auto px-4 py-6 flex gap-6">
        {/* Kaart */}
        <div className="flex-1 space-y-1">
          {sorted.map(proces => {
            const barWidth = getBarWidth(proces);
                const isSelected = selectedProcess?.id === proces.id;
            const value = getAIValue(proces);
            const opportunity = aiValueConfig[value];
            return (
              <div
                key={proces.id}
                onClick={() => setSelectedProcess(isSelected ? null : proces)}
                className={`flex items-center gap-3 min-h-[52px] py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                {/* Linkerkolom */}
                <div className="w-56 flex-shrink-0">
                  <div className="text-sm font-medium text-gray-800">{getProcessLabel(proces, processView)}</div>
                  <div className="text-xs text-gray-400">{processView.toUpperCase()}</div>
                </div>
                {/* Balk */}
                <div className="flex-1 flex items-center gap-2">
                  {proces.is_hotspot && <span className="text-base">🔥</span>}
                  <div className="flex-1 h-8 bg-gray-100 rounded-md overflow-hidden">
                    {proces.is_witte_vlek ? (
                      <div
                        className="h-full rounded-md flex items-center px-2"
                        style={{
                          width: `max(${barWidth}%, 80px)`,
                          border: `2px dashed ${proces.kleur}`,
                          backgroundColor: 'transparent',
                        }}
                      >
                        <span className="text-[10px]" style={{ color: proces.kleur }}>Groeikans</span>
                      </div>
                    ) : (
                      <div
                        className="h-full rounded-md"
                        style={{
                          width: `max(${barWidth}%, 40px)`,
                          backgroundColor: proces.kleur,
                        }}
                      />
                    )}
                  </div>
                </div>
                {/* Rechterkolom */}
                <div className="w-24 text-right flex-shrink-0">
                  <span className="text-sm font-medium text-gray-800">
                    {getFilteredUseCases(proces).length}
                  </span>
                  <span className={`text-[10px] block font-medium ${opportunity.color}`}>{opportunity.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slide-in panel (desktop) */}
        {selectedProcess && (
          <div className="hidden md:block w-80 flex-shrink-0">
            <div className="sticky top-24 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
              <div className="h-1" style={{ backgroundColor: selectedProcess.kleur }} />
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h2 className="text-base font-medium text-gray-900">{getProcessLabel(selectedProcess, processView)}</h2>
                    <p className="text-sm text-gray-400">{processView.toUpperCase()}-view</p>
                  </div>
                  <button
                    onClick={() => setSelectedProcess(null)}
                    className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
                <hr className="my-3 border-gray-100" />
                <div className={`rounded-lg border p-3 ${aiValueConfig[getAIValue(selectedProcess)].bg} ${aiValueConfig[getAIValue(selectedProcess)].border}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wide ${aiValueConfig[getAIValue(selectedProcess)].color}`}>
                    {aiValueConfig[getAIValue(selectedProcess)].label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-600">{getOpportunityLabel(selectedProcess)}</p>
                </div>
                <hr className="my-3 border-gray-100" />
                <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-2">
                  Use cases in dit proces
                </p>
                <ul className="space-y-1.5">
                  {getFilteredUseCases(selectedProcess).slice(0, 15).map(uc => (
                    <li key={uc.id} className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: selectedProcess.kleur }}
                      />
                      <span className="text-sm text-gray-700 flex-1 min-w-0 truncate">{uc.title}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded flex-shrink-0">
                        {uc.rol[0]}
                      </span>
                    </li>
                  ))}
                  {getFilteredUseCases(selectedProcess).length > 15 && (
                    <li className="text-xs text-gray-400 pl-3.5">
                      ... en {getFilteredUseCases(selectedProcess).length - 15} meer
                    </li>
                  )}
                </ul>
                <hr className="my-3 border-gray-100" />
                <Link
                  href={
                    selectedProcess.blueprint_count > 0
                      ? `/bibliotheek?${processView}=${getProcessId(selectedProcess, processView)}`
                      : '#'
                  }
                  className={`block w-full text-center text-sm py-2 px-4 rounded-lg font-medium transition-colors ${
                    selectedProcess.blueprint_count > 0
                      ? 'bg-gray-900 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Bekijk {selectedProcess.blueprint_count} recepten voor dit proces →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobiel panel als modal */}
      {selectedProcess && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 flex items-end">
          <div className="bg-white w-full rounded-t-xl max-h-[80vh] overflow-y-auto">
            <div className="h-1" style={{ backgroundColor: selectedProcess.kleur }} />
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h2 className="text-base font-medium text-gray-900">{getProcessLabel(selectedProcess, processView)}</h2>
                  <p className="text-sm text-gray-400">{processView.toUpperCase()}-view</p>
                </div>
                <button onClick={() => setSelectedProcess(null)} className="text-gray-400 text-xl">×</button>
              </div>
              <hr className="my-3 border-gray-100" />
              <ul className="space-y-1.5 mb-4">
                {getFilteredUseCases(selectedProcess).slice(0, 15).map(uc => (
                  <li key={uc.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selectedProcess.kleur }} />
                    <span className="text-sm text-gray-700">{uc.title}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={selectedProcess.blueprint_count > 0 ? `/bibliotheek?${processView}=${getProcessId(selectedProcess, processView)}` : '#'}
                className={`block w-full text-center text-sm py-2.5 px-4 rounded-lg font-medium ${
                  selectedProcess.blueprint_count > 0
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                Bekijk {selectedProcess.blueprint_count} recepten voor dit proces →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Legenda */}
      <div className="max-w-5xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-4">
          {processen.map(p => (
            <div key={p.id} className="flex items-center gap-2">
              {p.is_witte_vlek ? (
                <span className="w-2.5 h-2.5 rounded-sm border-2 border-dashed flex-shrink-0" style={{ borderColor: p.kleur }} />
              ) : (
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: p.kleur }} />
              )}
              <span className="text-xs text-gray-600">{getProcessLabel(p, processView)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/bibliotheek" className="text-sm text-gray-600 hover:text-gray-900">
            Ga direct naar de receptenbibliotheek →
          </Link>
        </div>
      </div>
    </div>
  );
}

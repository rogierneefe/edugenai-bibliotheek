'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { HoraProces, ProcessView } from '@/lib/types';
import { aiValueConfig, getAIValue, getFrequencyLabel, getVariabilityLabel } from '@/lib/opportunity';
import { getProcessId, getProcessLabel, getVisibleProcesses } from '@/lib/processViews';

interface Props {
  horaProcessen: HoraProces[];
}

type Quadrant = {
  key: string;
  aiValue: string;
  label: string;
  description: string;
  xLabel: string;
  yLabel: string;
  color: string;
  bg: string;
  border: string;
};

const QUADRANTS: Quadrant[] = [
  {
    key: 'automatiseren',
    aiValue: 'automatiseren',
    label: 'Automatiseren',
    description: 'Frequent + gestandaardiseerd — AI kan het meeste werk overnemen',
    xLabel: 'Hoge frequentie',
    yLabel: 'Gestandaardiseerd',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  {
    key: 'versnellen',
    aiValue: 'versnellen',
    label: 'Versnellen',
    description: 'Frequent + gemengd — AI versnelt het proces maar mens blijft sturen',
    xLabel: 'Hoge frequentie',
    yLabel: 'Gemengd patroon',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    key: 'verkennen',
    aiValue: 'verkennen',
    label: 'Verkennen',
    description: 'Regelmatig + gestandaardiseerd/gemengd — potentie aanwezig, aanpak nog onduidelijk',
    xLabel: 'Regelmatige frequentie',
    yLabel: 'Wisselend patroon',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    key: 'augmenteren',
    aiValue: 'augmenteren',
    label: 'Augmenteren',
    description: 'Variabel werk — AI versterkt menselijk oordeel maar vervangt het niet',
    xLabel: 'Regelmatige frequentie',
    yLabel: 'Hoge variabiliteit',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
];

export default function OpportunityMatrix({ horaProcessen }: Props) {
  const [processView, setProcessView] = useState<ProcessView>('hora');
  const visibleProcesses = getVisibleProcesses(horaProcessen);
  const getProcessenForQuadrant = (aiValue: string) =>
    visibleProcesses.filter(p => getAIValue(p) === aiValue);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-3">
        {[
          {
            title: 'Voor onderwijsprofessionals',
            text: 'Gebruik de matrix om te zien waar AI vooral tijd wint en waar je eigen oordeel belangrijk blijft.',
          },
          {
            title: 'Voor adviseurs',
            text: 'Gebruik de categorieën om experimenten, begeleiding en randvoorwaarden te kiezen.',
          },
          {
            title: 'Voor bestuurders',
            text: 'Gebruik de verdeling om portfolio-keuzes te maken: opschalen, versnellen of eerst leren.',
          },
        ].map(item => (
          <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-xs leading-5 text-gray-500">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <div>
          <p className="text-sm font-medium text-gray-900">Procesdefinitie</p>
          <p className="text-xs text-gray-500">Bekijk dezelfde opportunity-logica apart over HORA of MORA.</p>
        </div>
        <div className="flex gap-1.5">
          {(['hora', 'mora'] as ProcessView[]).map(view => (
            <button
              key={view}
              onClick={() => setProcessView(view)}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${processView === view ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-700'}`}
            >
              {view.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {QUADRANTS.map(q => {
          const processen = getProcessenForQuadrant(q.aiValue);
          const config = aiValueConfig[q.aiValue as keyof typeof aiValueConfig];
          return (
            <div
              id={q.aiValue}
              key={q.key}
              className={`rounded-xl border-2 ${q.border} ${q.bg} p-5 shadow-sm`}
            >
              {/* Quadrant header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className={`text-base font-semibold ${q.color}`}>{q.label}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 max-w-xs">{config.description}</p>
                </div>
                <span className={`text-2xl font-light ${q.color} flex-shrink-0 ml-2`}>
                  {processen.length}
                </span>
              </div>

              {/* Axis labels */}
              <div className="flex gap-2 mb-3">
                <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-500">
                  {q.xLabel}
                </span>
                <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full text-gray-500">
                  {q.yLabel}
                </span>
              </div>

              {/* Process list */}
              {processen.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Geen processen in dit kwadrant</p>
              ) : (
                <ul className="space-y-2">
                  {processen.map(p => (
                    <li key={p.id}>
                      <Link
                        href={`/bibliotheek?${processView}=${getProcessId(p, processView)}`}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: p.kleur }}
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 truncate">
                            {getProcessLabel(p, processView)}
                          </span>
                          {p.is_hotspot && <span className="text-xs flex-shrink-0">🔥</span>}
                          {p.is_witte_vlek && (
                            <span className="text-[10px] border border-dashed border-gray-400 text-gray-400 px-1.5 rounded flex-shrink-0">
                              groeikans
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                          {p.use_case_count} ideeën
                        </span>
                      </Link>
                      <div className="ml-4 mt-1 flex flex-wrap gap-1">
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-gray-500">
                          {getFrequencyLabel(p.frequency)}
                        </span>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-gray-500">
                          {getVariabilityLabel(p.variability)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-4">Hoe lees je deze matrix?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUADRANTS.map(q => (
            <div key={q.key} className="flex gap-3">
              <div className={`w-3 h-3 rounded-sm mt-0.5 flex-shrink-0 ${q.bg} border ${q.border}`} />
              <div>
                <span className={`text-sm font-medium ${q.color}`}>{q.label}</span>
                <p className="text-xs text-gray-500 mt-0.5">{q.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

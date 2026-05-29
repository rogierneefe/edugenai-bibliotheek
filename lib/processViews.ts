import { Blueprint, HoraProces, ProcessView, UseCase } from './types';

export function getProcessId(process: HoraProces, view: ProcessView) {
  return view === 'mora' ? process.mora_id ?? process.mora_equivalent : process.id;
}

export function getProcessLabel(process: HoraProces, view: ProcessView) {
  return view === 'mora' ? process.mora_equivalent : process.naam;
}

export function getUseCaseProcessId(useCase: UseCase, view: ProcessView) {
  return view === 'mora' ? useCase.mora_process : useCase.hora_process;
}

export function getBlueprintProcessId(blueprint: Blueprint, processes: HoraProces[], view: ProcessView) {
  if (view === 'hora') return blueprint.hora_process;
  return processes.find(process => process.id === blueprint.hora_process)?.mora_id;
}

export function blueprintMatchesProcess(
  blueprint: Blueprint,
  processes: HoraProces[],
  view: ProcessView,
  selectedProcessId: string
) {
  if (!selectedProcessId) return true;
  const ids = [blueprint.hora_process, blueprint.hora_secondary].filter(Boolean) as string[];
  if (view === 'hora') return ids.includes(selectedProcessId);
  return ids.some(id => processes.find(process => process.id === id)?.mora_id === selectedProcessId);
}

export function getVisibleProcesses(processes: HoraProces[], includeBuckets = false) {
  return includeBuckets ? processes : processes.filter(process => !process.is_mapping_bucket);
}

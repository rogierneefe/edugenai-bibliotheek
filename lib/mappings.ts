import { AIValue, Blueprint, HoraProces, OpportunityPosition, Persona, ProcessView } from './types';
import { blueprintMatchesProcess } from './processViews';

export function getAIValueFromPosition(position: OpportunityPosition): AIValue {
  return position.aiValue;
}

export function getQuadrantLabel(position: OpportunityPosition) {
  const labels: Record<AIValue, string> = {
    automatiseren: 'Automatiseren',
    augmenteren: 'Augmenteren',
    versnellen: 'Versnellen',
    verkennen: 'Verkennen',
  };

  return labels[position.aiValue];
}

export function getBlueprintsByProcess(
  blueprints: Blueprint[],
  processes: HoraProces[],
  processId: string,
  processView: ProcessView = 'hora'
) {
  return blueprints.filter(blueprint => blueprintMatchesProcess(blueprint, processes, processView, processId));
}

export function getBlueprintsByPersona(blueprints: Blueprint[], persona: Persona | string) {
  const personaId = typeof persona === 'string' ? persona : persona.id;
  return blueprints.filter(blueprint => blueprint.rollen.includes(personaId));
}

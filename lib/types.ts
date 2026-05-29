export interface UseCase {
  id: string;
  title: string;
  hora_process: string;
  mora_process?: string;
  rol: string[];
  type: 'tool' | 'agent' | 'rag' | 'simulatie' | 'analyse' | 'generatie';
  automatisering: 'hoog' | 'middel' | 'laag';
  blueprint_id?: string;
  raw_input: string;
}

export interface Ingredient {
  naam: string;
  type: 'data' | 'tool' | 'mens' | 'proces';
  toelichting?: string;
}

export interface Voorbeeld {
  instelling?: string;
  sector: 'mbo' | 'hbo' | 'wo' | 'breed';
  beschrijving: string;
  resultaat?: string;
}

export interface Blueprint {
  id: string;
  title: string;
  tagline: string;
  hora_process: string;
  hora_secondary?: string;
  rollen: string[];
  pijn: string;
  wat_het_doet: string;
  ingredienten: Ingredient[];
  stappen: string[];
  maturity: 'pilot' | 'bewezen' | 'schaalbaar';
  automatisering: 'hoog' | 'middel' | 'laag';
  voorbeelden: Voorbeeld[];
  team_vraag: string;
  valkuilen: string[];
  use_case_ids: string[];
  personaValues?: PersonaValue[];
  opportunityPosition?: OpportunityPosition;
}

export interface HoraProces {
  id: string;
  naam: string;
  mora_equivalent: string;
  kleur: string;
  use_case_count: number;
  blueprint_count: number;
  is_hotspot: boolean;
  is_witte_vlek: boolean;
  ai_value?: AIValue;
  frequency?: number;
  variability?: number;
  description?: string;
}

export type AIValue = 'automatiseren' | 'augmenteren' | 'versnellen' | 'verkennen';
export type ProcessFrequency = 'incidenteel' | 'regelmatig' | 'frequent';
export type ProcessVariability = 'gestandaardiseerd' | 'gemengd' | 'variabel';

export interface OpportunityPosition {
  processFrequency: ProcessFrequency;
  processVariability: ProcessVariability;
  aiValue: AIValue;
}

export interface PersonaValue {
  personaId: string;
  valueStatement: string;
  primaryBenefit: string;
  adoptionConcern?: string;
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  sector: 'mbo' | 'hbo' | 'wo' | 'breed';
  goals: string[];
  concerns: string[];
}

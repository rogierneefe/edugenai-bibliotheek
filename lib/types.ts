export interface UseCase {
  id: string;
  title: string;
  hora_process: string;
  hora_label?: string;
  mora_process?: string;
  mora_label?: string;
  process_frameworks?: {
    hora: string;
    mora: string;
  };
  mapping_status?: 'mapped' | 'unmapped' | 'not_primary';
  rol: string[];
  type: 'tool' | 'agent' | 'rag' | 'simulatie' | 'analyse' | 'generatie';
  automatisering: 'hoog' | 'middel' | 'laag';
  blueprint_id?: string;
  maturity?: UseCaseMaturity;
  origin_type?: UseCaseOrigin;
  source_type?: string;
  source_label?: string;
  evidence_label?: string;
  sectoren?: Sector[];
  sector_scope?: Sector | 'breed';
  raw_input: string;
  source_reference?: {
    file: string;
    sheet: string;
    row: number;
    column: number;
  };
  result?: string;
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
  maturity: BlueprintMaturity;
  automatisering: 'hoog' | 'middel' | 'laag';
  voorbeelden: Voorbeeld[];
  team_vraag: string;
  valkuilen: string[];
  use_case_ids: string[];
  origin_type?: UseCaseOrigin;
  source_type?: string;
  source_label?: string;
  evidence_label?: string;
  sectoren?: Sector[];
  sector_scope?: Sector | 'breed';
  painPointIds: string[];
  rootCauseIds: string[];
  valueDrivers: ValueDriver[];
  improvementGoals: ImprovementGoal[];
  startedUseCaseIds?: string[];
  pilotUseCaseIds?: string[];
  validatedUseCaseIds?: string[];
  hotspotDomains?: string[];
  functionalPatterns?: string[];
  communityStats?: {
    ideaCount: number;
    startedUseCaseCount: number;
    pilotCount: number;
    validatedCount: number;
  };
  personaValues?: PersonaValue[];
  opportunityPosition?: OpportunityPosition;
}

export interface HoraProces {
  id: string;
  naam: string;
  mora_equivalent: string;
  mora_id?: string;
  kleur: string;
  use_case_count: number;
  idea_count?: number;
  pilot_count?: number;
  blueprint_count: number;
  is_hotspot: boolean;
  is_witte_vlek: boolean;
  is_mapping_bucket?: boolean;
  ai_value?: AIValue;
  frequency?: number;
  variability?: number;
  description?: string;
}

export type AIValue = 'automatiseren' | 'augmenteren' | 'versnellen' | 'verkennen';
export type Sector = 'mbo' | 'hbo' | 'wo';
export type ProcessView = 'hora' | 'mora';
export type UseCaseOrigin = 'idee' | 'pilot';
export type CommunityStatus = 'gestarte-use-case' | 'pilot' | 'gevalideerde-aanpak';
export type UseCaseMaturity = 'idee' | 'pilot' | 'bewezen' | 'schaalbaar';
export type BlueprintMaturity = UseCaseMaturity;
export type InformationDimension =
  | 'kwaliteit'
  | 'kwantiteit'
  | 'vorm'
  | 'plaats'
  | 'tijd';
export type ImprovementGoal =
  | 'doorlooptijd'
  | 'kwaliteit'
  | 'consistentie'
  | 'beschikbaarheid'
  | 'personalisatie'
  | 'kosten'
  | 'compliance';
export type ValueDriver =
  | 'tijdswinst'
  | 'kwaliteit'
  | 'personalisatie'
  | 'inzicht'
  | 'compliance'
  | 'innovatie';
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
  painPointIds: string[];
  rootCauseIds: string[];
  valueDrivers: ValueDriver[];
  blueprintIds: string[];
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  processIds: string[];
  personaIds: string[];
  rootCauseIds: string[];
  blueprintIds: string[];
  valueDrivers: ValueDriver[];
  improvementGoals: ImprovementGoal[];
}

export interface RootCause {
  id: string;
  title: string;
  description: string;
  informationDimension: InformationDimension;
  improvementGoals: ImprovementGoal[];
  painPointIds: string[];
  blueprintIds: string[];
  valueDrivers: ValueDriver[];
}

export interface StartedUseCase {
  id: string;
  titel: string;
  beschrijving: string;
  instelling: string;
  sector: Sector | 'breed' | 'onbekend';
  status: CommunityStatus;
  hotspotdomein: string;
  functionelePatronen: string[];
  processen: string[];
  personas: string[];
  painpoints: string[];
  rootcauses: string[];
  blueprints: string[];
}

export interface HotspotDomain {
  id: string;
  title: string;
  count: number;
  interpretation: string;
  processIds: string[];
  painPointIds: string[];
  rootCauseIds: string[];
  blueprintIds: string[];
}

export interface FunctionalPattern {
  id: string;
  title: string;
  count: number;
  interpretation: string;
  blueprintIds: string[];
  painPointIds: string[];
}

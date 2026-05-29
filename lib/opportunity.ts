import { AIValue, HoraProces, ProcessFrequency, ProcessVariability } from './types';

export const aiValueConfig: Record<
  AIValue,
  {
    label: string;
    short: string;
    description: string;
    color: string;
    bg: string;
    border: string;
  }
> = {
  automatiseren: {
    label: 'Automatiseren',
    short: 'Veel volume, weinig variatie',
    description: 'Repeterend werk waar AI veel voorwerk of uitvoering kan overnemen.',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
  },
  versnellen: {
    label: 'Versnellen',
    short: 'Veel werk, mens blijft sturen',
    description: 'Processen waar AI tijd wint, terwijl professionals richting en kwaliteit bewaken.',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  augmenteren: {
    label: 'Augmenteren',
    short: 'Variabel werk, menselijke duiding',
    description: 'Complex of contextgevoelig werk waar AI analyse en opties geeft.',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  verkennen: {
    label: 'Verkennen',
    short: 'Potentie, eerst leren',
    description: 'Kansrijke gebieden waar experimenteren en bewijsopbouw voorop staan.',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
};

export const personaLensCopy: Record<
  string,
  {
    startQuestion: string;
    decisionNeed: string;
    preferredLens: string;
  }
> = {
  docent: {
    startQuestion: 'Waar win ik tijd zonder mijn professionele oordeel kwijt te raken?',
    decisionNeed: 'Concreet les-, toets- of feedbackwerk dat morgen toepasbaar is.',
    preferredLens: 'Start met recepten en bekijk daarna de use cases.',
  },
  student: {
    startQuestion: 'Welke AI helpt mij oefenen, plannen of feedback vragen?',
    decisionNeed: 'Heldere hulp zonder privacy- of integriteitsrisico.',
    preferredLens: 'Start met Persona Lens en studentbegeleiding.',
  },
  medewerker: {
    startQuestion: 'Welke repeterende communicatie- of administratietaken kunnen sneller?',
    decisionNeed: 'Procesafspraken, controle op output en minder handwerk.',
    preferredLens: 'Start met Hotspot-kaart of Automatiseren in de matrix.',
  },
  manager: {
    startQuestion: 'Waar is de combinatie van impact, draagvlak en schaalbaarheid het sterkst?',
    decisionNeed: 'Prioriteiten voor team, opleiding of kwaliteitscyclus.',
    preferredLens: 'Start met Opportunity Matrix en vergelijk recepten.',
  },
  onderwijskundig: {
    startQuestion: 'Welke AI-patronen versterken curriculum, didactiek en toetskwaliteit?',
    decisionNeed: 'Herbruikbare aanpakken die in teams te bespreken zijn.',
    preferredLens: 'Start met Persona Lens en recepten.',
  },
  ict: {
    startQuestion: 'Welke kansen vragen om veilige voorzieningen en architectuurkeuzes?',
    decisionNeed: 'Inzicht in platform-, data- en governance-impact.',
    preferredLens: 'Start met Matrix en groeikansen.',
  },
  onderzoeker: {
    startQuestion: 'Waar helpt AI bij analyseren, synthetiseren en kennisproducten?',
    decisionNeed: 'Bronkwaliteit, reproduceerbaarheid en transparante werkwijze.',
    preferredLens: 'Start met processen rond onderzoek.',
  },
  hr: {
    startQuestion: 'Waar raakt AI professionalisering, rollen en organisatieontwikkeling?',
    decisionNeed: 'AI-geletterdheid en begeleiding van teams.',
    preferredLens: 'Start met Persona Lens.',
  },
};

export function getFrequencyLabel(value?: number): ProcessFrequency {
  if ((value ?? 0) >= 5) return 'frequent';
  if ((value ?? 0) >= 3) return 'regelmatig';
  return 'incidenteel';
}

export function getVariabilityLabel(value?: number): ProcessVariability {
  if ((value ?? 0) >= 4) return 'variabel';
  if ((value ?? 0) >= 2) return 'gemengd';
  return 'gestandaardiseerd';
}

export function getAIValue(proces: HoraProces): AIValue {
  const frequency = getFrequencyLabel(proces.frequency);
  const variability = getVariabilityLabel(proces.variability);
  return getAIValueFromProcessCharacter(frequency, variability);
}

export function getAIValueFromProcessCharacter(
  frequency: ProcessFrequency,
  variability: ProcessVariability
): AIValue {
  if (variability === 'variabel') return 'augmenteren';
  if (variability === 'gestandaardiseerd' && frequency !== 'incidenteel') return 'automatiseren';
  if (variability === 'gemengd' && frequency !== 'incidenteel') return 'versnellen';
  return 'verkennen';
}

export function getOpportunityLabel(proces: HoraProces): string {
  const aiValue = getAIValue(proces);
  const frequency = getFrequencyLabel(proces.frequency);
  const variability = getVariabilityLabel(proces.variability);
  return `${aiValueConfig[aiValue].label}: ${frequency} proces, ${variability} patroon`;
}

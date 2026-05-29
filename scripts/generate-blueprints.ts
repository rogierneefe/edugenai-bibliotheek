import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BLUEPRINTS = [
  {
    id: 'BP-01',
    title: 'Rubric-feedback assistent',
    hora_process: 'toetsing',
    rollen: ['docent', 'onderwijskundig'],
    use_case_ids: ['uc-001', 'uc-006', 'uc-008'],
  },
  {
    id: 'BP-02',
    title: 'Nakijk- en beoordelingsassistent',
    hora_process: 'toetsing',
    rollen: ['docent'],
    use_case_ids: ['uc-002', 'uc-003'],
  },
  {
    id: 'BP-03',
    title: 'Toetsconstructie assistent',
    hora_process: 'toetsing',
    rollen: ['docent', 'onderwijskundig'],
    use_case_ids: ['uc-004', 'uc-005'],
  },
  {
    id: 'BP-04',
    title: 'Leeruitkomsten- en curriculumassistent',
    hora_process: 'onderwijs-ontwerpen',
    rollen: ['onderwijskundig', 'manager'],
    use_case_ids: ['uc-011', 'uc-013'],
  },
  {
    id: 'BP-05',
    title: 'Onderwijsontwerp / constructive alignment',
    hora_process: 'onderwijs-ontwerpen',
    rollen: ['onderwijskundig', 'docent'],
    use_case_ids: ['uc-017'],
  },
  {
    id: 'BP-06',
    title: 'AI-tutor / course Q&A (RAG)',
    hora_process: 'studentbegeleiding',
    rollen: ['student', 'docent'],
    use_case_ids: ['uc-020', 'uc-022', 'uc-023', 'uc-025'],
  },
  {
    id: 'BP-07',
    title: 'Simulatie- en roleplay-omgeving',
    hora_process: 'studentbegeleiding',
    rollen: ['docent', 'student'],
    use_case_ids: ['uc-019'],
  },
  {
    id: 'BP-08',
    title: 'Document- en contractanalyse',
    hora_process: 'besturing',
    rollen: ['medewerker', 'manager'],
    use_case_ids: ['uc-050'],
  },
  {
    id: 'BP-09',
    title: 'Kwaliteitszorg / vergader- en rapportageassistent',
    hora_process: 'besturing',
    rollen: ['medewerker', 'manager'],
    use_case_ids: ['uc-037', 'uc-038', 'uc-041', 'uc-042'],
  },
  {
    id: 'BP-10',
    title: 'Communicatie- en contentassistent',
    hora_process: 'marketing',
    rollen: ['medewerker'],
    use_case_ids: ['uc-027', 'uc-028', 'uc-029', 'uc-030', 'uc-031', 'uc-034', 'uc-035'],
  },
];

const SYSTEM_PROMPT = `Je bent een expert in AI-toepassingen in het onderwijs.
Schrijf in helder, direct Nederlands. Geen jargon, geen managementtaal.
Doelgroep: onderwijsprofessionals in mbo, hbo en wo.
Wees concreet en praktisch — schrijf alsof je een collega adviseert.`;

async function generateBlueprint(bp: typeof BLUEPRINTS[0]): Promise<object> {
  console.log(`  Genereer ${bp.id}: ${bp.title}...`);

  const userPrompt = `Blueprint-ID: ${bp.id}
Naam: ${bp.title}
HORA-proces: ${bp.hora_process}
Rollen: ${bp.rollen.join(', ')}

Genereer een JSON-object met EXACT deze velden (geen extra tekst, alleen JSON):
{
  "tagline": "1 krachtige zin die de essentie weergeeft (max 12 woorden)",
  "pijn": "2-3 zinnen: welk concreet probleem lost dit op? Focus op werkdruk, kwaliteitsrisico of tijdverlies.",
  "wat_het_doet": "2-3 zinnen: wat doet de AI precies? Beschrijf de input, de verwerking en de output concreet.",
  "ingredienten": [
    { "naam": "...", "type": "data|tool|mens|proces", "toelichting": "1 zin" },
    { "naam": "...", "type": "data|tool|mens|proces", "toelichting": "1 zin" },
    { "naam": "...", "type": "data|tool|mens|proces", "toelichting": "1 zin" }
  ],
  "stappen": [
    "Stap 1: ...",
    "Stap 2: ...",
    "Stap 3: ...",
    "Stap 4: ..."
  ],
  "maturity": "pilot",
  "automatisering": "hoog|middel|laag",
  "voorbeelden": [
    {
      "sector": "hbo",
      "beschrijving": "2 zinnen: concrete situatie bij een instelling.",
      "resultaat": "1 zin: wat leverde het op?"
    },
    {
      "sector": "mbo",
      "beschrijving": "2 zinnen: concrete situatie bij een instelling.",
      "resultaat": "1 zin: wat leverde het op?"
    }
  ],
  "team_vraag": "1 concrete vraag die je morgen in je teamoverleg kunt stellen (max 25 woorden)",
  "valkuilen": [
    "Valkuil 1: ...",
    "Valkuil 2: ..."
  ]
}`;

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';
  const clean = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    const parsed = JSON.parse(clean);
    return {
      id: bp.id,
      title: bp.title,
      hora_process: bp.hora_process,
      rollen: bp.rollen,
      use_case_ids: bp.use_case_ids,
      ...parsed,
    };
  } catch (e) {
    console.error(`  ❌ Parse fout voor ${bp.id}:`, e);
    console.error('  Raw response:', text.slice(0, 200));
    throw e;
  }
}

async function main() {
  console.log('🚀 Blueprint-generatie gestart...\n');

  const results = [];

  for (const bp of BLUEPRINTS) {
    try {
      const result = await generateBlueprint(bp);
      results.push(result);
      console.log(`  ✅ ${bp.id} klaar`);
    } catch (e) {
      console.error(`  ❌ Fout bij ${bp.id}:`, e);
    }

    await new Promise(r => setTimeout(r, 1200));
  }

  const outputPath = path.join(process.cwd(), 'data', 'blueprints.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log(`\n✅ ${results.length}/10 blueprints gegenereerd`);
  console.log(`📄 Opgeslagen in: ${outputPath}`);
}

main().catch(console.error);

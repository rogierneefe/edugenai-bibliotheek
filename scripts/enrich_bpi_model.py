import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


ROOT_CAUSES = [
    {
        "id": "rc-tijd-niet-beschikbaar",
        "title": "Informatie is niet beschikbaar op het moment van behoefte",
        "description": "Professionals of studenten moeten wachten op feedback, duiding, planning of besluitinformatie.",
        "informationDimension": "tijd",
        "improvementGoals": ["doorlooptijd", "beschikbaarheid"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["tijdswinst", "personalisatie"],
    },
    {
        "id": "rc-tijd-wachttijden",
        "title": "Wachttijden stapelen op in het proces",
        "description": "Door afhankelijkheden tussen mensen, systemen of controles ontstaat vertraging voordat werk verder kan.",
        "informationDimension": "tijd",
        "improvementGoals": ["doorlooptijd", "kosten"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["tijdswinst"],
    },
    {
        "id": "rc-plaats-verspreid",
        "title": "Informatie zit verspreid over bronnen",
        "description": "Benodigde context staat in documenten, mails, systemen of notities en moet handmatig worden samengebracht.",
        "informationDimension": "plaats",
        "improvementGoals": ["beschikbaarheid", "kwaliteit"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["inzicht", "tijdswinst"],
    },
    {
        "id": "rc-plaats-niet-vindbaar",
        "title": "Informatie is niet goed vindbaar",
        "description": "Gebruikers weten niet waar de juiste bron staat of welke versie actueel is.",
        "informationDimension": "plaats",
        "improvementGoals": ["beschikbaarheid", "consistentie"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["inzicht", "kwaliteit"],
    },
    {
        "id": "rc-vorm-herverwerking",
        "title": "Informatie moet telkens opnieuw worden verwerkt",
        "description": "Teksten, rubrics, verslagen of data moeten steeds opnieuw worden samengevat, herschreven of vertaald naar een bruikbare vorm.",
        "informationDimension": "vorm",
        "improvementGoals": ["doorlooptijd", "consistentie"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["tijdswinst", "kwaliteit"],
    },
    {
        "id": "rc-vorm-ongestructureerd",
        "title": "Informatie is ongestructureerd",
        "description": "Open antwoorden, documenten of gesprekken bevatten waardevolle signalen, maar niet in een vorm die makkelijk te analyseren is.",
        "informationDimension": "vorm",
        "improvementGoals": ["kwaliteit", "consistentie"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["inzicht", "kwaliteit"],
    },
    {
        "id": "rc-kwantiteit-documenten",
        "title": "Er zijn teveel documenten om handmatig te analyseren",
        "description": "Het volume aan beleidsstukken, contracten, bronnen of dossiers is groter dan mensen praktisch kunnen verwerken.",
        "informationDimension": "kwantiteit",
        "improvementGoals": ["doorlooptijd", "compliance"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["tijdswinst", "compliance", "inzicht"],
    },
    {
        "id": "rc-kwantiteit-opdrachten",
        "title": "Er zijn teveel opdrachten of producten om tijdig te beoordelen",
        "description": "Grote aantallen studentproducten zorgen voor piekbelasting en late terugkoppeling.",
        "informationDimension": "kwantiteit",
        "improvementGoals": ["doorlooptijd", "kwaliteit"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["tijdswinst", "kwaliteit"],
    },
    {
        "id": "rc-kwantiteit-vragen",
        "title": "Er komen teveel herhaalde vragen binnen",
        "description": "Veel vragen gaan over bekende procedures, deadlines of uitleg en vragen steeds dezelfde afhandeling.",
        "informationDimension": "kwantiteit",
        "improvementGoals": ["beschikbaarheid", "kosten"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["tijdswinst", "personalisatie"],
    },
    {
        "id": "rc-kwaliteit-inconsistent",
        "title": "Feedback of communicatie is inconsistent",
        "description": "Verschillende mensen passen criteria, toon of inhoud net anders toe, waardoor kwaliteit wisselt.",
        "informationDimension": "kwaliteit",
        "improvementGoals": ["consistentie", "kwaliteit"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["kwaliteit"],
    },
    {
        "id": "rc-kwaliteit-interpretaties",
        "title": "Interpretaties verschillen tussen beoordelaars of teams",
        "description": "Criteria, beleid of signalen worden niet overal hetzelfde geïnterpreteerd.",
        "informationDimension": "kwaliteit",
        "improvementGoals": ["consistentie", "compliance"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["kwaliteit", "compliance"],
    },
    {
        "id": "rc-kwaliteit-betrouwbaarheid",
        "title": "Betrouwbaarheid van informatie is onzeker",
        "description": "Bronnen, data of AI-output moeten worden gecontroleerd voordat ze verantwoord gebruikt kunnen worden.",
        "informationDimension": "kwaliteit",
        "improvementGoals": ["kwaliteit", "compliance"],
        "painPointIds": [],
        "blueprintIds": [],
        "valueDrivers": ["kwaliteit", "compliance"],
    },
]


PAINPOINTS = [
    {
        "id": "pp-feedback-tijd",
        "title": "Feedback geven kost veel tijd",
        "description": "Docenten ervaren piekbelasting bij het formuleren van feedback op open opdrachten en verslagen.",
        "processIds": ["toetsing"],
        "personaIds": ["docent", "onderwijskundig", "examencommissie"],
        "rootCauseIds": ["rc-kwantiteit-opdrachten", "rc-kwaliteit-inconsistent", "rc-tijd-niet-beschikbaar"],
        "blueprintIds": ["BP-01", "BP-02"],
        "valueDrivers": ["tijdswinst", "kwaliteit", "personalisatie"],
        "improvementGoals": ["doorlooptijd", "kwaliteit", "consistentie"],
    },
    {
        "id": "pp-vragen-herhaling",
        "title": "Studenten stellen steeds dezelfde vragen",
        "description": "Studenten hebben behoefte aan snelle, consistente antwoorden rond planning, begeleiding en procedures.",
        "processIds": ["studentbegeleiding", "ict"],
        "personaIds": ["student", "docent", "medewerker", "informatiemanager"],
        "rootCauseIds": ["rc-kwantiteit-vragen", "rc-plaats-niet-vindbaar", "rc-tijd-niet-beschikbaar"],
        "blueprintIds": ["BP-06"],
        "valueDrivers": ["personalisatie", "tijdswinst", "kwaliteit"],
        "improvementGoals": ["beschikbaarheid", "doorlooptijd", "personalisatie"],
    },
    {
        "id": "pp-curriculum-afstemming",
        "title": "Curriculumontwikkeling kost veel afstemming",
        "description": "Teams moeten leeruitkomsten, opdrachten, toetsing en constructive alignment over veel bronnen en perspectieven heen afstemmen.",
        "processIds": ["onderwijs-ontwerpen"],
        "personaIds": ["onderwijskundig", "manager", "architect", "bestuurder"],
        "rootCauseIds": ["rc-plaats-verspreid", "rc-vorm-herverwerking", "rc-kwaliteit-interpretaties"],
        "blueprintIds": ["BP-04", "BP-05"],
        "valueDrivers": ["kwaliteit", "inzicht", "innovatie"],
        "improvementGoals": ["kwaliteit", "consistentie", "doorlooptijd"],
    },
    {
        "id": "pp-open-evaluaties",
        "title": "Open evaluaties zijn moeilijk analyseerbaar",
        "description": "Vrije tekst uit enquêtes, reflecties of evaluaties bevat signalen, maar vraagt veel handmatige codering en duiding.",
        "processIds": ["besturing", "onderzoek"],
        "personaIds": ["manager", "onderzoeker", "bestuurder"],
        "rootCauseIds": ["rc-vorm-ongestructureerd", "rc-kwantiteit-documenten", "rc-kwaliteit-betrouwbaarheid"],
        "blueprintIds": ["BP-09"],
        "valueDrivers": ["inzicht", "kwaliteit", "tijdswinst"],
        "improvementGoals": ["kwaliteit", "doorlooptijd", "consistentie"],
    },
    {
        "id": "pp-documentanalyse",
        "title": "Contracten en beleidsstukken kosten veel handmatige analyse",
        "description": "Risico's, verplichtingen en beleidsimplicaties moeten uit lange documenten worden gehaald en gecontroleerd.",
        "processIds": ["besturing", "onderzoek"],
        "personaIds": ["medewerker", "manager", "privacy-governance", "bestuurder", "informatiemanager"],
        "rootCauseIds": ["rc-kwantiteit-documenten", "rc-plaats-verspreid", "rc-kwaliteit-betrouwbaarheid"],
        "blueprintIds": ["BP-08"],
        "valueDrivers": ["compliance", "inzicht", "tijdswinst"],
        "improvementGoals": ["compliance", "doorlooptijd", "kwaliteit"],
    },
    {
        "id": "pp-communicatie-volume",
        "title": "Communicatie en mailverkeer vragen veel herhaalwerk",
        "description": "Ondersteunende teams herschrijven, prioriteren en beantwoorden veel vergelijkbare berichten.",
        "processIds": ["marketing"],
        "personaIds": ["medewerker", "manager"],
        "rootCauseIds": ["rc-kwantiteit-vragen", "rc-vorm-herverwerking", "rc-kwaliteit-inconsistent"],
        "blueprintIds": ["BP-10"],
        "valueDrivers": ["tijdswinst", "kwaliteit"],
        "improvementGoals": ["doorlooptijd", "consistentie", "kosten"],
    },
    {
        "id": "pp-simulatie-oefenen",
        "title": "Realistisch oefenen vraagt veel voorbereiding",
        "description": "Vaardigheidstrainingen en scenario's moeten aansluiten bij beroepscontext, niveau en leerdoel.",
        "processIds": ["studentbegeleiding"],
        "personaIds": ["docent", "student", "onderwijskundig"],
        "rootCauseIds": ["rc-vorm-herverwerking", "rc-kwaliteit-interpretaties"],
        "blueprintIds": ["BP-07"],
        "valueDrivers": ["personalisatie", "kwaliteit", "innovatie"],
        "improvementGoals": ["personalisatie", "kwaliteit"],
    },
    {
        "id": "pp-rapportage-verslaglegging",
        "title": "Verslaglegging en rapportage kosten veel verwerkingstijd",
        "description": "Vergaderingen, besluiten en kwaliteitsinformatie moeten betrouwbaar worden samengevat en opgevolgd.",
        "processIds": ["besturing"],
        "personaIds": ["medewerker", "manager", "bestuurder"],
        "rootCauseIds": ["rc-vorm-ongestructureerd", "rc-vorm-herverwerking", "rc-tijd-wachttijden"],
        "blueprintIds": ["BP-09"],
        "valueDrivers": ["tijdswinst", "inzicht", "kwaliteit"],
        "improvementGoals": ["doorlooptijd", "consistentie", "beschikbaarheid"],
    },
]


BLUEPRINT_LINKS = {
    "BP-01": {
        "painPointIds": ["pp-feedback-tijd"],
        "rootCauseIds": ["rc-kwantiteit-opdrachten", "rc-kwaliteit-inconsistent", "rc-tijd-niet-beschikbaar"],
        "valueDrivers": ["tijdswinst", "kwaliteit", "personalisatie"],
        "improvementGoals": ["doorlooptijd", "kwaliteit", "consistentie"],
    },
    "BP-02": {
        "painPointIds": ["pp-feedback-tijd"],
        "rootCauseIds": ["rc-kwantiteit-opdrachten", "rc-kwaliteit-interpretaties", "rc-tijd-niet-beschikbaar"],
        "valueDrivers": ["tijdswinst", "kwaliteit"],
        "improvementGoals": ["doorlooptijd", "kwaliteit", "consistentie"],
    },
    "BP-03": {
        "painPointIds": ["pp-feedback-tijd"],
        "rootCauseIds": ["rc-kwaliteit-interpretaties", "rc-vorm-herverwerking"],
        "valueDrivers": ["kwaliteit", "inzicht"],
        "improvementGoals": ["kwaliteit", "consistentie"],
    },
    "BP-04": {
        "painPointIds": ["pp-curriculum-afstemming"],
        "rootCauseIds": ["rc-vorm-herverwerking", "rc-plaats-verspreid"],
        "valueDrivers": ["tijdswinst", "kwaliteit", "innovatie"],
        "improvementGoals": ["doorlooptijd", "kwaliteit"],
    },
    "BP-05": {
        "painPointIds": ["pp-curriculum-afstemming"],
        "rootCauseIds": ["rc-plaats-verspreid", "rc-kwaliteit-interpretaties"],
        "valueDrivers": ["kwaliteit", "inzicht"],
        "improvementGoals": ["kwaliteit", "consistentie"],
    },
    "BP-06": {
        "painPointIds": ["pp-vragen-herhaling"],
        "rootCauseIds": ["rc-kwantiteit-vragen", "rc-plaats-niet-vindbaar", "rc-tijd-niet-beschikbaar"],
        "valueDrivers": ["personalisatie", "tijdswinst"],
        "improvementGoals": ["beschikbaarheid", "personalisatie", "doorlooptijd"],
    },
    "BP-07": {
        "painPointIds": ["pp-simulatie-oefenen"],
        "rootCauseIds": ["rc-vorm-herverwerking", "rc-kwaliteit-interpretaties"],
        "valueDrivers": ["personalisatie", "innovatie", "kwaliteit"],
        "improvementGoals": ["personalisatie", "kwaliteit"],
    },
    "BP-08": {
        "painPointIds": ["pp-documentanalyse"],
        "rootCauseIds": ["rc-kwantiteit-documenten", "rc-kwaliteit-betrouwbaarheid", "rc-plaats-verspreid"],
        "valueDrivers": ["compliance", "inzicht", "tijdswinst"],
        "improvementGoals": ["compliance", "doorlooptijd", "kwaliteit"],
    },
    "BP-09": {
        "painPointIds": ["pp-open-evaluaties", "pp-rapportage-verslaglegging"],
        "rootCauseIds": ["rc-vorm-ongestructureerd", "rc-vorm-herverwerking", "rc-tijd-wachttijden"],
        "valueDrivers": ["inzicht", "tijdswinst", "kwaliteit"],
        "improvementGoals": ["doorlooptijd", "consistentie", "beschikbaarheid"],
    },
    "BP-10": {
        "painPointIds": ["pp-communicatie-volume"],
        "rootCauseIds": ["rc-kwantiteit-vragen", "rc-vorm-herverwerking", "rc-kwaliteit-inconsistent"],
        "valueDrivers": ["tijdswinst", "kwaliteit"],
        "improvementGoals": ["doorlooptijd", "consistentie", "kosten"],
    },
}


PROCESS_CHARACTER = {
    "marketing": ("frequent", "gestandaardiseerd"),
    "onderwijs-ontwerpen": ("frequent", "gemengd"),
    "ict": ("frequent", "gestandaardiseerd"),
    "besturing": ("regelmatig", "gemengd"),
    "onderzoek": ("regelmatig", "variabel"),
    "onderwijscontent": ("regelmatig", "variabel"),
    "innovatie": ("incidenteel", "variabel"),
    "logistiek": ("regelmatig", "gestandaardiseerd"),
    "hrm": ("regelmatig", "gemengd"),
    "toetsing": ("regelmatig", "gestandaardiseerd"),
    "studentbegeleiding": ("regelmatig", "gemengd"),
    "nog-te-koppelen": ("incidenteel", "variabel"),
    "niet-primair-hora": ("incidenteel", "variabel"),
}


def ai_value(freq, var):
    if var == "variabel":
        return "augmenteren"
    if var == "gestandaardiseerd" and freq != "incidenteel":
        return "automatiseren"
    if var == "gemengd" and freq != "incidenteel":
        return "versnellen"
    return "verkennen"


def main():
    painpoints = [dict(item) for item in PAINPOINTS]
    root_causes = [dict(item) for item in ROOT_CAUSES]

    root_by_id = {root["id"]: root for root in root_causes}
    for painpoint in painpoints:
        for root_id in painpoint["rootCauseIds"]:
            root = root_by_id[root_id]
            if painpoint["id"] not in root["painPointIds"]:
                root["painPointIds"].append(painpoint["id"])
            for blueprint_id in painpoint["blueprintIds"]:
                if blueprint_id not in root["blueprintIds"]:
                    root["blueprintIds"].append(blueprint_id)

    (ROOT / "data" / "painpoints.json").write_text(json.dumps(painpoints, ensure_ascii=False, indent=2) + "\n")
    (ROOT / "data" / "root-causes.json").write_text(json.dumps(root_causes, ensure_ascii=False, indent=2) + "\n")

    blueprints_path = ROOT / "data" / "blueprints.json"
    blueprints = json.loads(blueprints_path.read_text())
    for blueprint in blueprints:
        links = BLUEPRINT_LINKS.get(blueprint["id"], {
            "painPointIds": [],
            "rootCauseIds": [],
            "valueDrivers": [],
            "improvementGoals": [],
        })
        blueprint.update(links)
        freq, var = PROCESS_CHARACTER.get(blueprint["hora_process"], ("incidenteel", "variabel"))
        blueprint["opportunityPosition"] = {
            "processFrequency": freq,
            "processVariability": var,
            "aiValue": ai_value(freq, var),
        }
    blueprints_path.write_text(json.dumps(blueprints, ensure_ascii=False, indent=2) + "\n")

    processes_path = ROOT / "data" / "hora-processen.json"
    processes = json.loads(processes_path.read_text())
    frequency_score = {"incidenteel": 1, "regelmatig": 3, "frequent": 5}
    variability_score = {"gestandaardiseerd": 1, "gemengd": 3, "variabel": 5}
    for process in processes:
        freq, var = PROCESS_CHARACTER.get(process["id"], ("incidenteel", "variabel"))
        process["processFrequency"] = freq
        process["processVariability"] = var
        process["frequency"] = frequency_score[freq]
        process["variability"] = variability_score[var]
        process["ai_value"] = ai_value(freq, var)
    processes_path.write_text(json.dumps(processes, ensure_ascii=False, indent=2) + "\n")

    personas_path = ROOT / "data" / "personas.json"
    personas = json.loads(personas_path.read_text())
    existing = {persona["id"]: persona for persona in personas}
    additions = [
        {
            "id": "bestuurder",
            "name": "Directeur / bestuurder",
            "role": "Stuurt op portfolio, maatschappelijke waarde, risico en sectorbrede opschaling",
            "sector": "breed",
            "goals": ["AI-investeringen prioriteren", "Risico's bestuurbaar maken", "Procesverbetering verbinden aan strategie"],
            "concerns": ["Fragmentatie van pilots", "Onvoldoende bewijs voor opschaling", "Governance en publieke waarden"],
        },
        {
            "id": "informatiemanager",
            "name": "Informatiemanager",
            "role": "Verbindt procesbehoeften met informatievoorziening, applicaties en data",
            "sector": "breed",
            "goals": ["Informatie vindbaar en betrouwbaar maken", "Herbruikbare voorzieningen ontwerpen", "Vraag en architectuur verbinden"],
            "concerns": ["Versnipperde tooling", "Datakwaliteit", "Beheerlast"],
        },
        {
            "id": "architect",
            "name": "Architect",
            "role": "Ontwerpt samenhang tussen processen, data, applicaties en AI-voorzieningen",
            "sector": "breed",
            "goals": ["Patronen hergebruiken", "Proces- en informatiearchitectuur expliciet maken", "Schaalbare bouwblokken kiezen"],
            "concerns": ["Point solutions", "Onheldere eigenaarschap", "Niet-passende integraties"],
        },
        {
            "id": "privacy-governance",
            "name": "Privacy/governance officer",
            "role": "Bewaakt rechtmatigheid, uitlegbaarheid, risico's en verantwoord gebruik",
            "sector": "breed",
            "goals": ["Risico's vroeg signaleren", "Compliance in ontwerp borgen", "Duidelijke besluitvorming organiseren"],
            "concerns": ["Persoonsgegevens", "Bias en transparantie", "Onduidelijke verantwoordelijkheid"],
        },
        {
            "id": "examencommissie",
            "name": "Examencommissie",
            "role": "Bewaakt toetskwaliteit, beoordeling, borging en examenbeleid",
            "sector": "breed",
            "goals": ["Beoordelingskwaliteit borgen", "Consistentie tussen beoordelaars verhogen", "AI-gebruik toetsbaar maken"],
            "concerns": ["Validiteit", "Fraude en integriteit", "Uitlegbaarheid van feedback en scores"],
        },
    ]
    for addition in additions:
        if addition["id"] not in existing:
            personas.append(addition)

    for persona in personas:
        pid = persona["id"]
        related_painpoints = [p["id"] for p in painpoints if pid in p["personaIds"]]
        related_roots = sorted({rid for p in painpoints if pid in p["personaIds"] for rid in p["rootCauseIds"]})
        related_blueprints = sorted({bid for p in painpoints if pid in p["personaIds"] for bid in p["blueprintIds"]})
        drivers = sorted({driver for p in painpoints if pid in p["personaIds"] for driver in p["valueDrivers"]})
        persona["painPointIds"] = related_painpoints
        persona["rootCauseIds"] = related_roots
        persona["blueprintIds"] = related_blueprints
        persona["valueDrivers"] = drivers

    personas_path.write_text(json.dumps(personas, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()

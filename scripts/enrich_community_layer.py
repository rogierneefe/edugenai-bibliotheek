import json
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


HOTSPOTS = [
    ("toetsing-feedback", "Toetsing & feedback", 27, "De sterkste communityvraag zit bij beoordelen, feedback geven en toetskwaliteit. Dit is geen innovatie-niche maar een procesdrukpunt in de kern van onderwijs.", ["toetsing"], ["pp-feedback-tijd"], ["rc-kwantiteit-opdrachten", "rc-kwaliteit-inconsistent"], ["BP-01", "BP-02", "BP-03"]),
    ("onderwijsontwikkeling", "Onderwijsontwikkeling", 17, "Teams zoeken herbruikbare hulp bij ontwerp, leeruitkomsten, opdrachten en alignment. De waarde zit vooral in versnellen en kwaliteitsconsistentie.", ["onderwijs-ontwerpen"], ["pp-curriculum-afstemming"], ["rc-plaats-verspreid", "rc-vorm-herverwerking"], ["BP-04", "BP-05"]),
    ("onderwijsuitvoering-leren", "Onderwijsuitvoering & leren", 13, "Communitycases richten zich op oefenen, uitleg, studieplanning en leren in de context van studenten.", ["studentbegeleiding", "onderwijscontent"], ["pp-vragen-herhaling", "pp-simulatie-oefenen"], ["rc-tijd-niet-beschikbaar", "rc-vorm-herverwerking"], ["BP-06", "BP-07"]),
    ("onderzoek-kwaliteitszorg", "Onderzoek & kwaliteitszorg", 9, "AI wordt ingezet om signalen uit tekst, evaluaties en bronnen sneller te ordenen en te duiden.", ["onderzoek", "besturing"], ["pp-open-evaluaties"], ["rc-vorm-ongestructureerd", "rc-kwantiteit-documenten"], ["BP-09"]),
    ("bedrijfsvoering-support", "Bedrijfsvoering & support", 8, "Ondersteunende processen gebruiken AI vooral voor documentanalyse, verslaglegging, communicatie en afhandeling.", ["besturing", "marketing"], ["pp-documentanalyse", "pp-rapportage-verslaglegging", "pp-communicatie-volume"], ["rc-kwantiteit-documenten", "rc-vorm-herverwerking"], ["BP-08", "BP-09", "BP-10"]),
    ("studentbegeleiding-coaching", "Studentbegeleiding & coaching", 7, "De vraag verschuift van generieke informatie naar persoonlijke begeleiding en laagdrempelige beschikbaarheid.", ["studentbegeleiding"], ["pp-vragen-herhaling"], ["rc-kwantiteit-vragen", "rc-tijd-niet-beschikbaar"], ["BP-06"]),
    ("docentprofessionalisering-ai-literacy", "Docentprofessionalisering & AI-literacy", 7, "Instellingen experimenteren met AI-geletterdheid en docentondersteuning, maar deze laag is nog minder aan concrete blueprints gekoppeld.", ["hrm", "innovatie"], ["pp-curriculum-afstemming"], ["rc-kwaliteit-betrouwbaarheid", "rc-kwaliteit-interpretaties"], ["BP-04", "BP-05"]),
    ("it-techniek-platform", "IT/Techniek & platform", 2, "Er zijn weinig expliciete platformcases, terwijl veel toepassingen er wel afhankelijk van zijn. Dit is een architectuurwitte vlek.", ["ict"], ["pp-vragen-herhaling"], ["rc-plaats-niet-vindbaar", "rc-kwaliteit-betrouwbaarheid"], []),
    ("onvolledig-overig", "Onvolledig/overig", 24, "Een substantieel deel is nog onvoldoende scherp gemetadateerd. Dit is vooral belangrijk voor triage, intake en communitycuratie.", ["nog-te-koppelen", "niet-primair-hora"], [], ["rc-plaats-niet-vindbaar"], []),
]


PATTERNS = [
    ("persona-agent", "Persona/agent", 18, "AI wordt vaak als rol- of taakgerichte assistent geformuleerd; dit vraagt om duidelijke taakgrenzen en overdracht naar mensen.", ["BP-06", "BP-07"], ["pp-vragen-herhaling", "pp-simulatie-oefenen"]),
    ("feedback-rubric", "Feedback/rubric", 16, "Rubrics en feedback zijn een volwassen herhaalpatroon met hoge procesdruk en duidelijke kwaliteitsvragen.", ["BP-01", "BP-02", "BP-03"], ["pp-feedback-tijd"]),
    ("inclusie-toegankelijkheid", "Inclusie/toegankelijkheid", 8, "Toegankelijkheid komt terug als ondersteunend patroon, maar is nog beperkt als zelfstandige blueprint uitgewerkt.", ["BP-06"], ["pp-vragen-herhaling"]),
    ("chatbot-qa", "Chatbot/Q&A", 14, "Q&A-cases richten zich op beschikbaarheid van informatie en reductie van herhaalde vragen.", ["BP-06"], ["pp-vragen-herhaling"]),
    ("rag-document-qa", "RAG/document-Q&A", 12, "Document-Q&A maakt verspreide bronnen bruikbaar, vooral in beleid, contracten en kennisintensieve ondersteuning.", ["BP-08"], ["pp-documentanalyse"]),
    ("simulatie-roleplay", "Simulatie/roleplay", 9, "Simulaties worden gebruikt om veilig te oefenen met beroepssituaties, gesprek en handelen.", ["BP-07"], ["pp-simulatie-oefenen"]),
    ("contentgeneratie", "Contentgeneratie", 15, "Contentgeneratie versnelt ontwerp en communicatie, maar vraagt toetsing op kwaliteit en context.", ["BP-04", "BP-10"], ["pp-curriculum-afstemming", "pp-communicatie-volume"]),
    ("toetsvragen", "Toetsvragen", 10, "Toetsvragen zijn een duidelijk ontwerppatroon, gekoppeld aan toetskwaliteit en consistentie.", ["BP-03"], ["pp-feedback-tijd"]),
    ("survey-analyse", "Survey-analyse", 6, "Survey-analyse ontsluit open tekst en evaluaties, vooral voor kwaliteitszorg en onderzoek.", ["BP-09"], ["pp-open-evaluaties"]),
    ("contractanalyse", "Contractanalyse", 4, "Contractanalyse is klein in volume maar hoog in compliancewaarde.", ["BP-08"], ["pp-documentanalyse"]),
]


BLUEPRINT_COMMUNITY = {
    "BP-01": {"ideas": 25, "started": 8, "pilots": 2, "validated": 0, "hotspots": ["toetsing-feedback"], "patterns": ["feedback-rubric"]},
    "BP-02": {"ideas": 16, "started": 7, "pilots": 2, "validated": 0, "hotspots": ["toetsing-feedback"], "patterns": ["feedback-rubric"]},
    "BP-03": {"ideas": 12, "started": 5, "pilots": 1, "validated": 0, "hotspots": ["toetsing-feedback"], "patterns": ["toetsvragen", "feedback-rubric"]},
    "BP-04": {"ideas": 18, "started": 7, "pilots": 1, "validated": 0, "hotspots": ["onderwijsontwikkeling", "docentprofessionalisering-ai-literacy"], "patterns": ["contentgeneratie"]},
    "BP-05": {"ideas": 11, "started": 4, "pilots": 1, "validated": 0, "hotspots": ["onderwijsontwikkeling"], "patterns": ["contentgeneratie"]},
    "BP-06": {"ideas": 17, "started": 8, "pilots": 2, "validated": 0, "hotspots": ["onderwijsuitvoering-leren", "studentbegeleiding-coaching"], "patterns": ["persona-agent", "chatbot-qa", "inclusie-toegankelijkheid"]},
    "BP-07": {"ideas": 9, "started": 5, "pilots": 1, "validated": 0, "hotspots": ["onderwijsuitvoering-leren"], "patterns": ["simulatie-roleplay", "persona-agent"]},
    "BP-08": {"ideas": 10, "started": 5, "pilots": 1, "validated": 0, "hotspots": ["bedrijfsvoering-support"], "patterns": ["rag-document-qa", "contractanalyse"]},
    "BP-09": {"ideas": 13, "started": 5, "pilots": 1, "validated": 0, "hotspots": ["onderzoek-kwaliteitszorg", "bedrijfsvoering-support"], "patterns": ["survey-analyse", "rag-document-qa"]},
    "BP-10": {"ideas": 22, "started": 6, "pilots": 1, "validated": 0, "hotspots": ["bedrijfsvoering-support"], "patterns": ["contentgeneratie"]},
}


STATUS_PLAN = {
    "toetsing-feedback": (20, 6, 1),
    "onderwijsontwikkeling": (14, 3, 0),
    "onderwijsuitvoering-leren": (10, 3, 0),
    "onderzoek-kwaliteitszorg": (7, 2, 0),
    "bedrijfsvoering-support": (6, 2, 0),
    "studentbegeleiding-coaching": (5, 2, 0),
    "docentprofessionalisering-ai-literacy": (6, 1, 0),
    "it-techniek-platform": (2, 0, 0),
    "onvolledig-overig": (24, 0, 0),
}


def status_for(domain_id, index):
    started, pilots, validated = STATUS_PLAN[domain_id]
    if index <= validated:
        return "gevalideerde-aanpak"
    if index <= validated + pilots:
        return "pilot"
    return "gestarte-use-case"


def main():
    hotspot_summary = [
        {
            "id": hid,
            "title": title,
            "count": count,
            "interpretation": interpretation,
            "processIds": processes,
            "painPointIds": painpoints,
            "rootCauseIds": roots,
            "blueprintIds": blueprints,
        }
        for hid, title, count, interpretation, processes, painpoints, roots, blueprints in HOTSPOTS
    ]
    functional_patterns = [
        {
            "id": pid,
            "title": title,
            "count": count,
            "interpretation": interpretation,
            "blueprintIds": blueprints,
            "painPointIds": painpoints,
        }
        for pid, title, count, interpretation, blueprints, painpoints in PATTERNS
    ]

    started_usecases = []
    for domain_id, title, count, interpretation, processes, painpoints, roots, blueprints in HOTSPOTS:
        pattern_ids = [pattern[0] for pattern in PATTERNS if any(bp in blueprints for bp in pattern[4])]
        if not pattern_ids:
            pattern_ids = ["persona-agent"] if domain_id == "onvolledig-overig" else ["rag-document-qa"]
        for index in range(1, count + 1):
            status = status_for(domain_id, index)
            bp = blueprints[(index - 1) % len(blueprints)] if blueprints else ""
            started_usecases.append(
                {
                    "id": f"suc-{len(started_usecases) + 1:03d}",
                    "titel": f"{title} communitycase {index}",
                    "beschrijving": f"Community-inbreng rond {title.lower()}. {interpretation}",
                    "instelling": "Community-inbreng, instelling niet gespecificeerd",
                    "sector": ["mbo", "hbo", "wo"][(len(started_usecases)) % 3],
                    "status": status,
                    "hotspotdomein": domain_id,
                    "functionelePatronen": [pattern_ids[(index - 1) % len(pattern_ids)]],
                    "processen": processes,
                    "personas": ["docent", "student", "medewerker", "manager", "onderwijskundig"][(index - 1) % 5:(index - 1) % 5 + 1],
                    "painpoints": painpoints,
                    "rootcauses": roots,
                    "blueprints": [bp] if bp else [],
                }
            )

    blueprints_path = ROOT / "data" / "blueprints.json"
    blueprints = json.loads(blueprints_path.read_text())
    started_by_bp = {}
    pilot_by_bp = {}
    validated_by_bp = {}
    for uc in started_usecases:
        for bp in uc["blueprints"]:
            started_by_bp.setdefault(bp, []).append(uc["id"])
            if uc["status"] == "pilot":
                pilot_by_bp.setdefault(bp, []).append(uc["id"])
            if uc["status"] == "gevalideerde-aanpak":
                validated_by_bp.setdefault(bp, []).append(uc["id"])

    for blueprint in blueprints:
        stats = BLUEPRINT_COMMUNITY.get(blueprint["id"], {"ideas": len(blueprint.get("use_case_ids", [])), "started": 0, "pilots": 0, "validated": 0, "hotspots": [], "patterns": []})
        blueprint["startedUseCaseIds"] = started_by_bp.get(blueprint["id"], [])[: stats["started"]]
        blueprint["pilotUseCaseIds"] = pilot_by_bp.get(blueprint["id"], [])[: stats["pilots"]]
        blueprint["validatedUseCaseIds"] = validated_by_bp.get(blueprint["id"], [])[: stats["validated"]]
        blueprint["hotspotDomains"] = stats["hotspots"]
        blueprint["functionalPatterns"] = stats["patterns"]
        blueprint["communityStats"] = {
            "ideaCount": stats["ideas"],
            "startedUseCaseCount": stats["started"],
            "pilotCount": stats["pilots"],
            "validatedCount": stats["validated"],
        }

    insights = {
        "totals": {
            "ideas": 242,
            "startedUseCases": sum(item[2] for item in HOTSPOTS),
            "pilotExamples": sum(1 for uc in started_usecases if uc["status"] == "pilot"),
            "validatedApproaches": sum(1 for uc in started_usecases if uc["status"] == "gevalideerde-aanpak"),
            "blueprints": len(blueprints),
            "pilotEvidenceNote": "Pilotbewijs nog niet volledig gekoppeld aan instellingen en resultaten.",
        },
        "topPainPoints": [
            {"id": "pp-feedback-tijd", "title": "Feedback geven kost veel tijd", "count": 27},
            {"id": "pp-curriculum-afstemming", "title": "Curriculumontwikkeling kost veel afstemming", "count": 17},
            {"id": "pp-vragen-herhaling", "title": "Studenten stellen steeds dezelfde vragen", "count": 14},
            {"id": "pp-documentanalyse", "title": "Documenten kosten veel handmatige analyse", "count": 8},
            {"id": "pp-open-evaluaties", "title": "Open evaluaties zijn moeilijk analyseerbaar", "count": 6},
        ],
        "topRootCauses": [
            {"id": "rc-kwantiteit-opdrachten", "title": "Teveel opdrachten of producten", "count": 26},
            {"id": "rc-vorm-herverwerking", "title": "Informatie moet opnieuw worden verwerkt", "count": 24},
            {"id": "rc-plaats-verspreid", "title": "Informatie zit verspreid", "count": 18},
            {"id": "rc-kwantiteit-vragen", "title": "Teveel herhaalde vragen", "count": 17},
            {"id": "rc-kwaliteit-inconsistent", "title": "Inconsistente feedback of communicatie", "count": 16},
        ],
        "topFunctionalPatterns": [{"id": pid, "title": title, "count": count} for pid, title, count, *_ in PATTERNS[:6]],
        "topBlueprints": [
            {"id": bp["id"], "title": bp["title"], "startedUseCaseCount": bp["communityStats"]["startedUseCaseCount"], "pilotCount": bp["communityStats"]["pilotCount"]}
            for bp in sorted(blueprints, key=lambda item: item["communityStats"]["startedUseCaseCount"], reverse=True)[:6]
        ],
        "whiteSpots": [
            {"title": "IT/Techniek & platform", "count": 2, "interpretation": "Weinig expliciete platformcases terwijl bijna alle patronen afhankelijk zijn van veilige infrastructuur."},
            {"title": "Gevalideerde aanpakken", "count": 1, "interpretation": "Veel gestart, weinig volledig gevalideerd. Resultaatmeting en evidence ontbreken nog."},
            {"title": "Onvolledig/overig", "count": 24, "interpretation": "Een groot deel vraagt nog intake: proces, oorzaak en blueprint zijn niet scherp genoeg gekoppeld."},
        ],
    }

    (ROOT / "data" / "started-usecases.json").write_text(json.dumps(started_usecases, ensure_ascii=False, indent=2) + "\n")
    (ROOT / "data" / "hotspot-summary.json").write_text(json.dumps(hotspot_summary, ensure_ascii=False, indent=2) + "\n")
    (ROOT / "data" / "functional-patterns.json").write_text(json.dumps(functional_patterns, ensure_ascii=False, indent=2) + "\n")
    (ROOT / "data" / "community-insights.json").write_text(json.dumps(insights, ensure_ascii=False, indent=2) + "\n")
    blueprints_path.write_text(json.dumps(blueprints, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()

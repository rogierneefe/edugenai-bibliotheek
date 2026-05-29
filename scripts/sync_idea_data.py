import json
import re
from collections import Counter
from pathlib import Path

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
XLSX = Path("/Users/rogierneefe/Downloads/usecasesEstellaHORAMORA.xlsx")

HORA_MAP = {
    "Marketing, communicatie en voorlichting": "marketing",
    "Onderwijs ontwerpen en ontwikkelen": "onderwijs-ontwerpen",
    "ICT-dienstverlening / informatiemanagement": "ict",
    "Besturing, bedrijfsvoering en kwaliteitszorg": "besturing",
    "Onderzoek uitvoeren / onderzoeks­ondersteuning": "onderzoek",
    "Onderwijscontent ontwikkelen / communicatie": "onderwijscontent",
    "Procesoverstijgend / innovatie": "innovatie",
    "Onderwijslogistiek / planning": "logistiek",
    "HRM / professionalisering": "hrm",
    "Studentbegeleiding / onderwijsuitvoering": "studentbegeleiding",
    "Toetsing en examinering": "toetsing",
    "Nog te koppelen": "nog-te-koppelen",
    "Niet primair HORA-proces": "niet-primair-hora",
}

MORA_BY_HORA_LABEL = {
    "Marketing, communicatie en voorlichting": "Communicatie, werving en relatiebeheer",
    "Onderwijs ontwerpen en ontwikkelen": "Onderwijs ontwikkelen",
    "ICT-dienstverlening / informatiemanagement": "ICT en informatiemanagement",
    "Besturing, bedrijfsvoering en kwaliteitszorg": "Besturing, bedrijfsvoering en kwaliteitszorg",
    "Onderzoek uitvoeren / onderzoeks­ondersteuning": "Onderzoek, kwaliteit en kennisontwikkeling",
    "Onderwijscontent ontwikkelen / communicatie": "Leermiddelen ontwikkelen / communicatie",
    "Procesoverstijgend / innovatie": "Procesoverstijgend / innovatie",
    "Onderwijslogistiek / planning": "Onderwijslogistiek / roosteren",
    "HRM / professionalisering": "HRM / professionalisering",
    "Studentbegeleiding / onderwijsuitvoering": "Begeleiden student / onderwijs uitvoeren",
    "Toetsing en examinering": "Examineren en beoordelen",
    "Nog te koppelen": "Nog te koppelen",
    "Niet primair HORA-proces": "Niet primair MORA-proces",
}

ROLE_KEYWORDS = [
    ("student", ["student", "studie", "afstudeer", "leercoach", "feedback"]),
    ("docent", ["les", "toets", "rubric", "beoordel", "nakijken", "werkvorm", "opdracht", "onderwijs"]),
    ("onderwijskundig", ["leerdoel", "curriculum", "alignment", "methode", "onderwijskund"]),
    ("manager", ["rapportage", "budget", "planning", "rooster", "projectplan", "proces"]),
    ("medewerker", ["mail", "notulen", "checklist", "tekst", "communicatie"]),
    ("ict", ["chatbot", "faq", "datamodel", "excel", "tool"]),
    ("hr", ["hrm", "recruiter", "cv", "teamdag", "self review"]),
    ("onderzoeker", ["onderzoek", "data", "analyse", "factsheet"]),
]

TYPE_KEYWORDS = [
    ("rag", ["chatbot", "faq", "zoek", "juridisch", "document"]),
    ("simulatie", ["simulatie", "scenario", "rollenspel", "skills"]),
    ("analyse", ["analyse", "analyseren", "rapportage", "data", "procesverbeter"]),
    ("generatie", ["maken", "genereren", "schrijven", "beeld", "plaatje", "presentatie", "infographic", "tekst"]),
    ("agent", ["agent", "coach", "planner", "sparren", "brainstorm"]),
]


def normalize(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def slug(value: str) -> str:
    text = normalize(value)
    return re.sub(r"\s+", "-", text)


def derive_title(raw: str) -> str:
    cleaned = re.sub(r"\s+", " ", raw).strip(" -–—:;")
    if len(cleaned) <= 70:
        return cleaned[:1].upper() + cleaned[1:]
    return cleaned[:67].rstrip() + "..."


def infer_roles(raw: str):
    text = raw.lower()
    roles = [role for role, words in ROLE_KEYWORDS if any(word in text for word in words)]
    return roles or ["medewerker"]


def infer_type(raw: str):
    text = raw.lower()
    for item_type, words in TYPE_KEYWORDS:
        if any(word in text for word in words):
            return item_type
    return "tool"


def infer_automation(raw: str):
    text = raw.lower()
    if any(word in text for word in ["automatisch", "standaard", "excel", "mailbox", "samenvat", "notulen"]):
        return "hoog"
    if any(word in text for word in ["brainstorm", "creatief", "sparren", "scenario", "visie"]):
        return "laag"
    return "middel"


def read_xlsx_ideas():
    hora_df = pd.read_excel(XLSX, sheet_name="HORA kolommen", header=None)
    mora_df = pd.read_excel(XLSX, sheet_name="MORA kolommen", header=None)
    items = []
    for col, hora_label in enumerate(hora_df.iloc[3]):
        if pd.isna(hora_label):
            continue
        mora_label = str(mora_df.iloc[3, col])
        for row in range(5, len(hora_df)):
            raw = hora_df.iloc[row, col]
            if pd.isna(raw) or not str(raw).strip():
                continue
            items.append(
                {
                    "raw_input": str(raw).strip(),
                    "hora_label": str(hora_label),
                    "mora_label": mora_label,
                    "source_row": row + 1,
                    "source_column": col + 1,
                }
            )
    return items


def main():
    usecases_path = ROOT / "data" / "usecases.json"
    processes_path = ROOT / "data" / "hora-processen.json"
    blueprints_path = ROOT / "data" / "blueprints.json"

    existing_usecases = json.loads(usecases_path.read_text())
    existing_by_raw = {normalize(uc.get("raw_input", "")): uc for uc in existing_usecases}
    existing_by_title = {normalize(uc.get("title", "")): uc for uc in existing_usecases}

    xlsx_items = read_xlsx_ideas()
    generated = []
    used_ids = set()

    for index, item in enumerate(xlsx_items, start=1):
        key = normalize(item["raw_input"])
        existing = existing_by_raw.get(key) or existing_by_title.get(key)
        hora_id = HORA_MAP[item["hora_label"]]
        mora_label = MORA_BY_HORA_LABEL[item["hora_label"]]
        mora_id = slug(mora_label)
        mapping_status = "mapped"
        if hora_id == "nog-te-koppelen":
            mapping_status = "unmapped"
        elif hora_id == "niet-primair-hora":
            mapping_status = "not_primary"

        record = {
            "id": existing["id"] if existing else f"idea-{index:03d}",
            "title": existing.get("title") if existing else derive_title(item["raw_input"]),
            "hora_process": hora_id,
            "hora_label": item["hora_label"],
            "mora_process": mora_id,
            "mora_label": mora_label,
            "process_frameworks": {
                "hora": hora_id,
                "mora": mora_id,
            },
            "mapping_status": mapping_status,
            "rol": existing.get("rol") if existing else infer_roles(item["raw_input"]),
            "type": existing.get("type") if existing else infer_type(item["raw_input"]),
            "automatisering": existing.get("automatisering") if existing else infer_automation(item["raw_input"]),
            "maturity": "idee",
            "origin_type": "idee",
            "source_type": "xlsx_ideeen",
            "source_label": "Idee uit usecasesEstellaHORAMORA.xlsx",
            "evidence_label": "Idee, geen pilotbewijs",
            "sectoren": ["mbo", "hbo", "wo"],
            "sector_scope": "breed",
            "raw_input": item["raw_input"],
            "source_reference": {
                "file": "usecasesEstellaHORAMORA.xlsx",
                "sheet": "HORA kolommen",
                "row": item["source_row"],
                "column": item["source_column"],
            },
        }
        if existing and existing.get("blueprint_id"):
            record["blueprint_id"] = existing["blueprint_id"]
        generated.append(record)
        used_ids.add(record["id"])

    usecases_path.write_text(json.dumps(generated, ensure_ascii=False, indent=2) + "\n")

    source_counts = Counter(uc["mapping_status"] for uc in generated)
    process_counts = Counter(uc["hora_process"] for uc in generated)
    blueprint_counts = Counter()
    blueprints = json.loads(blueprints_path.read_text())
    for bp in blueprints:
        blueprint_counts[bp["hora_process"]] += 1
        if bp.get("hora_secondary"):
            blueprint_counts[bp["hora_secondary"]] += 1
        bp["maturity"] = "idee"
        bp["origin_type"] = "idee"
        bp["source_type"] = "derived_from_xlsx_ideas"
        bp["source_label"] = "Recept afgeleid uit ideeëninventarisatie; pilotbrondata niet geladen"
        bp["evidence_label"] = "Idee-recept"
        bp["sectoren"] = ["mbo", "hbo", "wo"]
        bp["sector_scope"] = "breed"
    blueprints_path.write_text(json.dumps(blueprints, ensure_ascii=False, indent=2) + "\n")

    processes = json.loads(processes_path.read_text())
    existing_processes = {p["id"]: p for p in processes}
    for process in processes:
        process["mora_id"] = slug(process["mora_equivalent"])
        process["use_case_count"] = process_counts.get(process["id"], 0)
        process["idea_count"] = process_counts.get(process["id"], 0)
        process["pilot_count"] = 0
        process["blueprint_count"] = blueprint_counts.get(process["id"], 0)
        process["is_mapping_bucket"] = False

    bucket_defaults = [
        {
            "id": "nog-te-koppelen",
            "naam": "Nog te koppelen",
            "mora_equivalent": "Nog te koppelen",
            "kleur": "#9CA3AF",
            "is_hotspot": False,
            "is_witte_vlek": True,
            "ai_value": "verkennen",
            "frequency": 2,
            "variability": 5,
            "description": "Ideeën uit de xlsx die nog geen HORA/MORA-proces hebben.",
        },
        {
            "id": "niet-primair-hora",
            "naam": "Niet primair HORA-proces",
            "mora_equivalent": "Niet primair MORA-proces",
            "kleur": "#6B7280",
            "is_hotspot": False,
            "is_witte_vlek": True,
            "ai_value": "verkennen",
            "frequency": 2,
            "variability": 4,
            "description": "Ideeën die in de xlsx buiten een primair HORA/MORA-proces zijn geplaatst.",
        },
    ]
    for bucket in bucket_defaults:
        target = existing_processes.get(bucket["id"], bucket)
        target.update(bucket)
        target["mora_id"] = slug(target["mora_equivalent"])
        target["use_case_count"] = process_counts.get(target["id"], 0)
        target["idea_count"] = process_counts.get(target["id"], 0)
        target["pilot_count"] = 0
        target["blueprint_count"] = 0
        target["is_mapping_bucket"] = True
        if target["id"] not in existing_processes:
            processes.append(target)

    processes_path.write_text(json.dumps(processes, ensure_ascii=False, indent=2) + "\n")

    mapped_processes = [p for p in processes if not p.get("is_mapping_bucket")]
    process_views = {
        "hora": [
            {
                "id": p["id"],
                "label": p["naam"],
                "description": p.get("description", ""),
            }
            for p in mapped_processes
        ],
        "mora": [
            {
                "id": p["mora_id"],
                "label": p["mora_equivalent"],
                "description": p.get("description", ""),
            }
            for p in mapped_processes
        ],
        "mappings": [
            {
                "hora_id": p["id"],
                "hora_label": p["naam"],
                "mora_id": p["mora_id"],
                "mora_label": p["mora_equivalent"],
            }
            for p in mapped_processes
        ],
        "mapping_buckets": [
            {
                "hora_id": p["id"],
                "hora_label": p["naam"],
                "mora_id": p["mora_id"],
                "mora_label": p["mora_equivalent"],
                "count": p["use_case_count"],
            }
            for p in processes
            if p.get("is_mapping_bucket")
        ],
    }
    (ROOT / "data" / "process-views.json").write_text(json.dumps(process_views, ensure_ascii=False, indent=2) + "\n")

    summary = {
        "ideaUseCasesLoaded": len(generated),
        "ideaSourceFile": "usecasesEstellaHORAMORA.xlsx",
        "pilotUseCasesLoaded": 0,
        "pilotUseCasesExpectedApprox": 110,
        "mappedIdeaUseCases": source_counts.get("mapped", 0),
        "notPrimaryIdeaUseCases": source_counts.get("not_primary", 0),
        "unmappedIdeaUseCases": source_counts.get("unmapped", 0),
        "sectorLabelPolicy": "De xlsx bevat geen sectorspecifieke herkomst; ideeën zijn daarom breed gelabeld voor mbo, hbo en wo.",
        "notes": [
            "De aangeleverde xlsx is als ideeënbron gemetadateerd.",
            "Pilot-use-cases uit instellingen zijn nog niet als aparte dataset geladen.",
            "Blueprints met deze bronkoppeling zijn gelabeld als idee-recept, niet als pilot.",
        ],
    }
    (ROOT / "data" / "source-summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n")


if __name__ == "__main__":
    main()

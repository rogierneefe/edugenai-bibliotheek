import { UseCase, Blueprint, HoraProces } from './types'; // eslint-disable-line @typescript-eslint/no-unused-vars

export function filterUseCases(
  usecases: UseCase[],
  filters: { hora?: string; rol?: string[]; type?: string; automatisering?: string }
): UseCase[] {
  return usecases.filter(uc => {
    if (filters.hora && uc.hora_process !== filters.hora) return false;
    if (filters.rol?.length && !filters.rol.some(r => uc.rol.includes(r))) return false;
    if (filters.type && uc.type !== filters.type) return false;
    if (filters.automatisering && uc.automatisering !== filters.automatisering) return false;
    return true;
  });
}

export function filterBlueprints(
  blueprints: Blueprint[],
  filters: { hora?: string; rol?: string[]; maturity?: string; automatisering?: string; query?: string }
): Blueprint[] {
  return blueprints.filter(bp => {
    if (filters.hora && bp.hora_process !== filters.hora && bp.hora_secondary !== filters.hora) return false;
    if (filters.rol?.length && !filters.rol.some(r => bp.rollen.includes(r))) return false;
    if (filters.maturity && bp.maturity !== filters.maturity) return false;
    if (filters.automatisering && bp.automatisering !== filters.automatisering) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (!bp.title.toLowerCase().includes(q) && !bp.tagline.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

export function getUseCasesForBlueprint(usecases: UseCase[], blueprintId: string): UseCase[] {
  return usecases.filter(uc => uc.blueprint_id === blueprintId);
}

export function getRelatedBlueprints(blueprints: Blueprint[], current: Blueprint, limit = 3): Blueprint[] {
  return blueprints
    .filter(bp => bp.id !== current.id)
    .filter(bp => bp.hora_process === current.hora_process || bp.rollen.some(r => current.rollen.includes(r)))
    .slice(0, limit);
}

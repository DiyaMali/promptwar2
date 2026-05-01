import type { RoleId } from './roles';

export type OutcomeTier = 'high' | 'mid' | 'low';

export interface OutcomeConfig {
  title: string;
  summary: string;
}

export const OUTCOMES: Record<RoleId, Record<OutcomeTier, OutcomeConfig>> = {
  voter: {
    high: { title: 'Engaged Citizen', summary: 'You successfully navigated the process and made your voice heard.' },
    mid: { title: 'Determined Voter', summary: 'Despite some challenges, you managed to cast your ballot.' },
    low: { title: 'Disenfranchised', summary: 'Systemic barriers prevented you from fully participating.' }
  },
  candidate: {
    high: { title: 'Elected Official', summary: 'You ran a clean, effective campaign and won the election.' },
    mid: { title: 'Strong Contender', summary: 'You fell short, but built a strong foundation for the future.' },
    low: { title: 'Campaign Collapse', summary: 'Scandals and missteps derailed your political ambitions.' }
  },
  officer: {
    high: { title: 'Guardian of Democracy', summary: 'The election was secure, accessible, and widely trusted.' },
    mid: { title: 'Stressed Administrator', summary: 'You survived the day, but flaws in the system were exposed.' },
    low: { title: 'Electoral Crisis', summary: 'Breakdowns in the process led to a disputed election.' }
  },
  journalist: {
    high: { title: 'Pulitzer Material', summary: 'Your reporting was accurate, unbiased, and crucial to the public.' },
    mid: { title: 'Working Reporter', summary: 'You covered the basics, but missed the deeper story.' },
    low: { title: 'Sensationalist', summary: 'Your focus on clicks over facts damaged public trust.' }
  }
};

export function getOutcomeTier(trust: number, speed: number, accuracy: number): OutcomeTier {
  const average = (trust + speed + accuracy) / 3;
  if (average > 65) return 'high';
  if (average > 40) return 'mid';
  return 'low';
}

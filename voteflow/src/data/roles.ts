export type RoleId = 'voter' | 'candidate' | 'officer' | 'journalist';

export interface RoleConfig {
  id: RoleId;
  title: string;
  description: string;
  color: string;
  heroImage: string;
}

export const ROLE_EMOJIS: Record<RoleId, string> = {
  voter: '🗳️',
  candidate: '🎤',
  officer: '🛡️',
  journalist: '📰',
};

export const ROLES: RoleConfig[] = [
  {
    id: 'voter',
    title: 'The Voter',
    description: 'Navigate the challenges of participating in the democratic process.',
    color: '#378ADD',
    heroImage: '/images/voter-hero.png',
  },
  {
    id: 'candidate',
    title: 'The Candidate',
    description: 'Run a campaign, manage resources, and address public concerns.',
    color: '#D85A30',
    heroImage: '/images/candidate-hero.png',
  },
  {
    id: 'officer',
    title: 'The Election Officer',
    description: 'Ensure the integrity, security, and accessibility of the election.',
    color: '#1D9E75',
    heroImage: '/images/officer-hero.png',
  },
  {
    id: 'journalist',
    title: 'The Journalist',
    description: 'Report the truth, manage public perception, and investigate leads.',
    color: '#BA7517',
    heroImage: '/images/journalist-hero.png',
  }
];

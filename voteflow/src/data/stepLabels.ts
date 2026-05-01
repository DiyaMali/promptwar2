import type { RoleId } from './roles';

export const STEP_LABELS: Record<RoleId, string[]> = {
  voter: [
    'Registration',
    'Research',
    'Early Voting',
    'Election Day Morning',
    'At the Polls',
    'Casting the Ballot',
    'Post-Election Reflection'
  ],
  candidate: [
    'Campaign Launch',
    'Debate Prep',
    'Fundraising Crisis',
    'Scandal Management',
    'Final Push',
    'Election Night',
    'Concession/Victory'
  ],
  officer: [
    'Voter Roll Purge',
    'Equipment Testing',
    'Poll Worker Training',
    'Early Voting Issues',
    'Election Day Crisis',
    'Ballot Counting',
    'Certifying Results'
  ],
  journalist: [
    'Editorial Pitch',
    'Source Investigation',
    'Breaking News',
    'Debate Coverage',
    'Election Night Desk',
    'Calling the Race',
    'Post-Mortem Analysis'
  ]
};

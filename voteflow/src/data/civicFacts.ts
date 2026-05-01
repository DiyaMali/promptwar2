import type { RoleId } from './roles';

export const CIVIC_FACTS: Record<RoleId, string[]> = {
  voter: [
    'Voter registration deadlines vary by state, ranging from 30 days before the election to same-day registration.',
    'Local elections often have a more direct impact on your daily life than federal elections.',
    'Early voting can significantly reduce wait times and administrative burden on Election Day.',
    'Employers in many states are legally required to provide time off for voting.',
    'Provisional ballots ensure no voter is turned away, though their validity is verified later.',
    'The Help America Vote Act (HAVA) requires accessible voting systems for individuals with disabilities.',
    'Electoral outcomes are ultimately determined by certified vote totals, not media projections.'
  ],
  candidate: [
    'Campaign finance laws heavily regulate how much money can be donated and by whom.',
    'Debates are typically managed by nonpartisan commissions to ensure fairness.',
    'Small-dollar donations are often seen as a key indicator of grassroots support.',
    'Opposition research is a standard, legal practice in modern political campaigns.',
    'Get Out The Vote (GOTV) efforts are statistically proven to increase turnout.',
    'Election Night parties are paid for by campaign funds, not taxpayer money.',
    'Concession speeches are a democratic norm, not a legal requirement.'
  ],
  officer: [
    'Maintaining accurate voter rolls is required by federal law to prevent fraud.',
    'Voting machines undergo rigorous logic and accuracy testing before every election.',
    'Poll workers are typically local citizens who receive specialized training.',
    'Chain of custody protocols ensure the physical security of ballots at all times.',
    'In many jurisdictions, both major parties must have representatives present during counting.',
    'Risk-limiting audits use statistical methods to verify the accuracy of the machine count.',
    'Certification is the formal, legal process of making election results official.'
  ],
  journalist: [
    'Editorial independence separates the newsroom from the business side of a publication.',
    'Journalists use the FOIA (Freedom of Information Act) to uncover government records.',
    'The Society of Professional Journalists Code of Ethics emphasizes minimizing harm.',
    'Fact-checking organizations provide independent verification of political claims.',
    'Decision desks use complex statistical models, not just raw vote totals, to call races.',
    'Embargoes are agreements not to publish information until a specific date and time.',
    'Retractions are necessary when published information is found to be fundamentally incorrect.'
  ]
};

export function getFallbackFact(role: RoleId, step: number): string {
  const facts = CIVIC_FACTS[role];
  if (!facts) return 'Democracy relies on active participation.';
  return facts[step] || facts[0] || 'Democracy relies on active participation.';
}

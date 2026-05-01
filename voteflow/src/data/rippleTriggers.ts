import type { RoleId } from './roles';

export interface RippleTrigger {
  sourceRole: RoleId;
  sourceStep: number;
  choiceTrigger: 'a' | 'b';
  affectedRole: RoleId;
  eventDescription: string;
}

export const RIPPLE_TRIGGERS: RippleTrigger[] = [
  { sourceRole: 'candidate', sourceStep: 1, choiceTrigger: 'a', affectedRole: 'journalist', eventDescription: 'Candidate made a controversial statement.' },
  { sourceRole: 'officer', sourceStep: 2, choiceTrigger: 'b', affectedRole: 'voter', eventDescription: 'Polling locations have been unexpectedly changed.' },
  { sourceRole: 'journalist', sourceStep: 3, choiceTrigger: 'a', affectedRole: 'candidate', eventDescription: 'A damaging investigative report was just published.' },
  { sourceRole: 'voter', sourceStep: 4, choiceTrigger: 'b', affectedRole: 'officer', eventDescription: 'A large group of voters is protesting outside a polling station.' },
  { sourceRole: 'candidate', sourceStep: 4, choiceTrigger: 'a', affectedRole: 'voter', eventDescription: 'A targeted ad campaign has spread misinformation.' },
  { sourceRole: 'officer', sourceStep: 5, choiceTrigger: 'a', affectedRole: 'journalist', eventDescription: 'Ballot counting has been delayed due to machine malfunction.' },
  { sourceRole: 'journalist', sourceStep: 5, choiceTrigger: 'b', affectedRole: 'officer', eventDescription: 'News networks have prematurely called the election.' },
  { sourceRole: 'voter', sourceStep: 2, choiceTrigger: 'a', affectedRole: 'candidate', eventDescription: 'A viral social media trend is shifting young voter sentiment.' }
];

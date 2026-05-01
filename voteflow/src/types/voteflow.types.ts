export type RoleId = 'voter' | 'candidate' | 'officer' | 'journalist';

export interface Role {
  id: RoleId;
  title: string;
  description: string;
  color: string;
  heroImage: string;
}

export interface Choice {
  stepIndex: number;
  stepLabel: string;
  selected: 'a' | 'b';
  choiceText: string;
  timestamp: number;
}

export interface Scores {
  trust: number;
  speed: number;
  accuracy: number;
}

export interface CrossRoleEvent {
  sourceRole: RoleId;
  sourceStep: number;
  affectedRole: RoleId;
  eventDescription: string;
  timestamp: number;
}

export interface ScenarioJSON {
  scenario: string;
  choice_a: string;
  choice_b: string;
  civic_fact: string;
  consequence_preview: string;
  deltas: {
    trust: number;
    speed: number;
    accuracy: number;
    trustB: number;
    speedB: number;
    accuracyB: number;
  };
}

export interface Session {
  uid: string;
  role: RoleId | null;
  currentStep: number;
  choices: Choice[];
  scores: Scores;
  completedRoles: RoleId[];
  crossRoleEvents: CrossRoleEvent[];
  startedAt: number;
}

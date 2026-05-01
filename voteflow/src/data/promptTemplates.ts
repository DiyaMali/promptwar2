import type { RoleId } from './roles';

export const SCENARIO_SYSTEM_PROMPT = `You are a nonpartisan civic education simulator. Present a realistic, morally complex scenario based on the provided context. Respond ONLY with a valid JSON object matching the requested schema. Do not include markdown formatting like \`\`\`json.`;

export interface PromptContext {
  role: RoleId;
  stepNumber: number;
  stepLabel: string;
  previousChoices: string[];
  crossRoleContext?: string;
}

export function buildScenarioPrompt(context: PromptContext): string {
  const { role, stepNumber, stepLabel, previousChoices, crossRoleContext } = context;
  
  return `Generate a scenario for the role of ${role} at step ${stepNumber}: ${stepLabel}.
Previous choices: ${previousChoices.join(', ') || 'None'}.
${crossRoleContext ? `External event: ${crossRoleContext}` : ''}

Output JSON format:
{
  "scenario": "string",
  "choice_a": "string",
  "choice_b": "string",
  "civic_fact": "string",
  "consequence_preview": "string",
  "deltas": {
    "trust": [-2 to 2],
    "speed": [-2 to 2],
    "accuracy": [-2 to 2],
    "trustB": [-2 to 2],
    "speedB": [-2 to 2],
    "accuracyB": [-2 to 2]
  }
}`;
}

export function buildOutcomePrompt(role: RoleId, choiceLabels: string[], scores: {trust: number, speed: number, accuracy: number}, outcomeTitle: string): string {
  return `Generate a personalized summary for the role of ${role} based on their performance.
Outcome Title: ${outcomeTitle}
Scores: Trust (${scores.trust}), Speed (${scores.speed}), Accuracy (${scores.accuracy})
Choices made: ${choiceLabels.join(', ')}.

Output JSON format:
{
  "summary": "string"
}`;
}

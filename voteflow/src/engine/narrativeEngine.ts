import type { RoleId, ScenarioJSON } from '../types/voteflow.types';
import { STEP_LABELS } from '../data/stepLabels';
import { SCENARIO_SYSTEM_PROMPT, buildScenarioPrompt } from '../data/promptTemplates';
import { getFallbackFact } from '../data/civicFacts';
import { LOCAL_SCENARIOS } from '../data/localScenarios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_URL = GEMINI_API_KEY
  ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`
  : '';

/**
 * Generates a scenario for the given role and step.
 * Uses local scenario bank by default. Falls back to Gemini API if configured.
 */
export async function generateScenario(
  role: RoleId,
  stepNumber: number,
  previousChoices: string[],
  crossRoleContext?: string
): Promise<ScenarioJSON> {
  // Use local scenarios first (always available, no API needed)
  const localScenario = LOCAL_SCENARIOS[role]?.[stepNumber];
  if (localScenario && !GEMINI_API_KEY) {
    // Add a small delay to simulate loading for better UX
    await new Promise((r) => setTimeout(r, 800));
    return localScenario;
  }

  // If Gemini API is configured, use it for dynamic scenarios
  if (GEMINI_API_KEY) {
    try {
      const stepLabel = STEP_LABELS[role][stepNumber] ?? `Step ${stepNumber + 1}`;
      const userPrompt = buildScenarioPrompt({
        role,
        stepNumber,
        stepLabel,
        previousChoices,
        crossRoleContext,
      });

      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SCENARIO_SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: 0.85,
            maxOutputTokens: 1024,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!res.ok) throw new Error(`Gemini API returned ${res.status}`);

      const data = await res.json();
      const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      const parsed: ScenarioJSON = JSON.parse(text);

      if (!parsed.scenario || !parsed.choice_a || !parsed.choice_b || !parsed.deltas) {
        throw new Error('Invalid ScenarioJSON shape');
      }

      return parsed;
    } catch {
      // Fall through to local scenario
    }
  }

  // Final fallback: local scenario or generic
  if (localScenario) {
    await new Promise((r) => setTimeout(r, 400));
    return localScenario;
  }

  const stepLabel = STEP_LABELS[role][stepNumber] ?? `Step ${stepNumber + 1}`;
  const fallbackFact = getFallbackFact(role, stepNumber);
  return {
    scenario: `You face a critical decision at the "${stepLabel}" stage. Consider the implications carefully.`,
    choice_a: 'Take the cautious, transparent approach.',
    choice_b: 'Take the bold, decisive approach.',
    civic_fact: fallbackFact,
    consequence_preview: 'Your choice will shape what comes next.',
    deltas: { trust: 1, speed: 0, accuracy: 1, trustB: 0, speedB: 1, accuracyB: -1 },
  };
}

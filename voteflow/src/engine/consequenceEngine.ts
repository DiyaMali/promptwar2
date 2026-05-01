import { ref, update } from 'firebase/database';
import { getFirebaseDb } from '../firebase/firebaseConfig';
import type { Scores, ScenarioJSON } from '../types/voteflow.types';

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function applyConsequence(scores: Scores, scenario: ScenarioJSON, choice: 'a' | 'b'): Scores {
  const d = scenario.deltas;
  if (choice === 'a') {
    return {
      trust: clamp(scores.trust + (d.trust ?? 0) * 5, 0, 100),
      speed: clamp(scores.speed + (d.speed ?? 0) * 5, 0, 100),
      accuracy: clamp(scores.accuracy + (d.accuracy ?? 0) * 5, 0, 100),
    };
  }
  return {
    trust: clamp(scores.trust + (d.trustB ?? 0) * 5, 0, 100),
    speed: clamp(scores.speed + (d.speedB ?? 0) * 5, 0, 100),
    accuracy: clamp(scores.accuracy + (d.accuracyB ?? 0) * 5, 0, 100),
  };
}

export async function writeScoresToFirebase(uid: string, scores: Scores): Promise<void> {
  const db = getFirebaseDb();
  if (!db) return;
  await update(ref(db, `sessions/${uid}`), { scores });
}

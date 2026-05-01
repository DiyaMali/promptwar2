import { ref, push } from 'firebase/database';
import { getFirebaseDb } from '../firebase/firebaseConfig';
import { RIPPLE_TRIGGERS } from '../data/rippleTriggers';
import type { RoleId, CrossRoleEvent } from '../types/voteflow.types';

export async function checkAndFireRipple(
  sessionId: string,
  role: RoleId,
  step: number,
  choice: 'a' | 'b'
): Promise<CrossRoleEvent | null> {
  const trigger = RIPPLE_TRIGGERS.find(
    (t) => t.sourceRole === role && t.sourceStep === step && t.choiceTrigger === choice
  );
  if (!trigger) return null;

  const event: CrossRoleEvent = {
    sourceRole: trigger.sourceRole,
    sourceStep: trigger.sourceStep,
    affectedRole: trigger.affectedRole,
    eventDescription: trigger.eventDescription,
    timestamp: Date.now(),
  };

  const db = getFirebaseDb();
  if (db) {
    await push(ref(db, `sessions/${sessionId}/crossRoleEvents`), event);
  }

  return event;
}

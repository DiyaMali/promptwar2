import { signInAnonymously } from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';
import { getFirebaseAuth, getFirebaseDb } from './firebaseConfig';
import type { Session } from '../types/voteflow.types';

const LS_KEY = 'voteflow_uid';

function buildDefaultSession(uid: string): Session {
  return {
    uid,
    role: null,
    currentStep: 0,
    choices: [],
    scores: { trust: 50, speed: 50, accuracy: 50 },
    completedRoles: [],
    crossRoleEvents: [],
    startedAt: Date.now(),
  };
}

export async function createOrRestoreSession(): Promise<Session> {
  const storedUid = localStorage.getItem(LS_KEY);
  const db = getFirebaseDb();

  if (storedUid && db) {
    try {
      const snapshot = await get(ref(db, `sessions/${storedUid}`));
      if (snapshot.exists()) return snapshot.val() as Session;
    } catch { /* session not found */ }
  }

  const auth = getFirebaseAuth();
  if (!auth || !db) {
    const fallbackUid = storedUid ?? `local_${Date.now()}`;
    localStorage.setItem(LS_KEY, fallbackUid);
    return buildDefaultSession(fallbackUid);
  }

  const credential = await signInAnonymously(auth);
  const uid = credential.user.uid;
  localStorage.setItem(LS_KEY, uid);
  const session = buildDefaultSession(uid);
  await set(ref(db, `sessions/${uid}`), session);
  return session;
}

export async function getSession(uid: string): Promise<Session | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  const snapshot = await get(ref(db, `sessions/${uid}`));
  return snapshot.exists() ? (snapshot.val() as Session) : null;
}

export async function updateSession(uid: string, updates: Partial<Session>): Promise<void> {
  const db = getFirebaseDb();
  if (!db) return;
  await update(ref(db, `sessions/${uid}`), updates);
}

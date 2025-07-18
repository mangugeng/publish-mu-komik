import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from '../keys/mu-komik-firebase-adminsdk-fbsvc-5b14de3d47.json';

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
}

export const dbAdmin = getFirestore();
export const adminAuth = getAuth(); 
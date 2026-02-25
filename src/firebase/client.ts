import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDoMv7fz9vUbyOXhiNUdgEfIWLgiNe7zRw",
  authDomain: "infinity-vibe.firebaseapp.com",
  projectId: "infinity-vibe",
  storageBucket: "infinity-vibe.firebasestorage.app",
  messagingSenderId: "52478226145",
  appId: "1:52478226145:web:3605eaaaa6fb6e371f11a0",
  measurementId: "G-EGYX83Z6EJ"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


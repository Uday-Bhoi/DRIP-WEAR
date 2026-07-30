import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  updateProfile as updateFirebaseUserProfile,
  type User
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration with environment variables and production fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBEdQ5JE6eYoSVpmehFb3Cb3M9u-XOFqFo',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'dripwear-95fc5.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'dripwear-95fc5',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'dripwear-95fc5.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '22118733315',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:22118733315:web:85f493b1e69f134250a036',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-P48G6RY9KH',
};

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firebase Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Ensure local persistence for Firebase Auth sessions
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn('Firebase persistence warning:', err);
});

// ──────────────────────────────────────────
// Authentication Helpers (Pure Firebase Auth)
// ──────────────────────────────────────────

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const token = await user.getIdToken();
  return { user, token };
};

export const signInWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const registerWithEmail = async (email: string, password: string, displayName: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (result.user && displayName) {
    await updateFirebaseUserProfile(result.user, { displayName });
  }
  return result.user;
};

export const logoutFirebase = () => firebaseSignOut(auth);

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

import { initializeApp } from 'firebase/app';
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

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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

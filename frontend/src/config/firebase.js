import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-key-for-local-demo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "freelancing-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "freelancing-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "freelancing-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:1234567890"
};

// Check if configuration is missing and log a helpful reminder
const isDefault = firebaseConfig.apiKey === "dummy-key-for-local-demo";
if (isDefault) {
  console.warn(
    "⚠️ Firebase configuration environment variables are missing!\n" +
    "Please create a frontend/.env file with the following keys:\n" +
    "  VITE_FIREBASE_API_KEY\n" +
    "  VITE_FIREBASE_AUTH_DOMAIN\n" +
    "  VITE_FIREBASE_PROJECT_ID\n" +
    "  VITE_FIREBASE_STORAGE_BUCKET\n" +
    "  VITE_FIREBASE_MESSAGING_SENDER_ID\n" +
    "  VITE_FIREBASE_APP_ID\n" +
    "Falling back to dummy/local emulator configuration."
  );
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

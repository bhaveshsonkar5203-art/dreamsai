import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";

const readEnvValue = (key, fallback) => {
  try {
    return (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) || fallback;
  } catch {
    return fallback;
  }
};

const defaultFirebaseConfig = {
  apiKey: "AIzaSyAmy7pXtqLpq7GsvYZY9xVxjQr5PyL43IE",
  authDomain: "dreamsai-22e7c.firebaseapp.com",
  projectId: "dreamsai-22e7c",
  storageBucket: "dreamsai-22e7c.firebasestorage.app",
  messagingSenderId: "590220962512",
  appId: "1:590220962512:web:0d2ceb339b6b1531688cd5"
};

export const firebaseConfig = {
  apiKey: readEnvValue("VITE_FIREBASE_API_KEY", defaultFirebaseConfig.apiKey),
  authDomain: readEnvValue("VITE_FIREBASE_AUTH_DOMAIN", defaultFirebaseConfig.authDomain),
  projectId: readEnvValue("VITE_FIREBASE_PROJECT_ID", defaultFirebaseConfig.projectId),
  storageBucket: readEnvValue("VITE_FIREBASE_STORAGE_BUCKET", defaultFirebaseConfig.storageBucket),
  messagingSenderId: readEnvValue("VITE_FIREBASE_MESSAGING_SENDER_ID", defaultFirebaseConfig.messagingSenderId),
  appId: readEnvValue("VITE_FIREBASE_APP_ID", defaultFirebaseConfig.appId)
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, doc, setDoc, getDocs, getDoc, deleteDoc };



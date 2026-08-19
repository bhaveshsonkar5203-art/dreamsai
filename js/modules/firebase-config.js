import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmy7pXtqLpq7GsvYZY9xVxjQr5PyL43IE",
  authDomain: "dreamsai-22e7c.firebaseapp.com",
  projectId: "dreamsai-22e7c",
  storageBucket: "dreamsai-22e7c.firebasestorage.app",
  messagingSenderId: "590220962512",
  appId: "1:590220962512:web:0d2ceb339b6b1531688cd5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, doc, setDoc, getDocs, getDoc };


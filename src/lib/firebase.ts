import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWZQ6EZhy535Uqo-8U5IqoQy5kJDKvZR0",
  authDomain: "oct4crypt--dev.firebaseapp.com",
  projectId: "oct4crypt--dev",
  storageBucket: "oct4crypt--dev.firebasestorage.app",
  messagingSenderId: "871078534864",
  appId: "1:871078534864:web:e4bd363b68c6d720cec8d5",
  measurementId: "G-6G0WYFKH2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

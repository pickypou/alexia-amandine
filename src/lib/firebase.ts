import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import du service de stockage si nécessaire

// ✅ Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCjGfleNzT0zXUm1o2GvdKI7qY6e_3eHl4",
  authDomain: "alexia-d2307.firebaseapp.com",
  projectId: "alexia-d2307",
  storageBucket: "alexia-d2307.firebasestorage.app",
  messagingSenderId: "1085054087381",
  appId: "1:1085054087381:web:eb16b282145c18efe7325c"
};

// ✅ Initialisation Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export des services utiles
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app, "gs://alexia-d2307.firebasestorage.app");


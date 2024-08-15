import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "instafood-8bbd3.firebaseapp.com",
  projectId: "instafood-8bbd3",
  storageBucket: "instafood-8bbd3.appspot.com",
  messagingSenderId: "667254282387",
  appId: "1:667254282387:web:b31484ab91aed167849566",
  measurementId: "G-8WK8YPLVXW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

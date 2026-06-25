import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRqctH3wJ_tJoVywbPq1YQ9GXsqhKP2_A",
  authDomain: "raingamestore-76ad9.firebaseapp.com",
  projectId: "raingamestore-76ad9",
  storageBucket: "raingamestore-76ad9.firebasestorage.app",
  messagingSenderId: "199780447584",
  appId: "1:199780447584:web:90737a5962faf5b2b51a05",
  measurementId: "G-ECCHL57JKT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

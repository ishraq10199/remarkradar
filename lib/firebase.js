import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const existingApps = getApps();
const app = !existingApps.length
  ? initializeApp(firebaseConfig)
  : existingApps[0];

if (existingApps.length > 1) {
  console.log("MORE THAN ONE CLIENT APP FOUND");
  for (eachApp of existingApps) {
    console.log("--------------------------------------");
    console.log(eachApp);
    console.log("--------------------------------------");
  }
}

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

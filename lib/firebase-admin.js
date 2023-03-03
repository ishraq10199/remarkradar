import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  credential: cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n")
      : undefined,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }),
  databaseURL: "https://remarkradar-demo.firebaseio.com",
};

const existingApps = getApps();
const app = !existingApps.length
  ? initializeApp(firebaseAdminConfig)
  : existingApps[0];

if (existingApps.length > 1) {
  console.log("MORE THAN ONE ADMIN APP FOUND");
  for (eachApp of existingApps) {
    console.log("--------------------------------------");
    console.log(eachApp);
    console.log("--------------------------------------");
  }
}
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };

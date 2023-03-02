import db from "@/lib/firebase-admin";
// import { doc, getDocs, collection } from "firebase/firestore";

export default async function handler(_, res) {
  try {
    const sitesRef = db.collection("sites");
    const sites = await sitesRef.get();
    if (sites.empty) {
      console.log("No such document exists");
      res.status(404).json({ message: "No such document exists" });
    } else {
      res.status(200).json(sites.docs);
    }
  } catch (err) {
    console.log("Error getting document", err);
    throw err;
  }
}

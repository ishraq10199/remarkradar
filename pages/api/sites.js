import db from "@/lib/firebase-admin";
// import { doc, getDocs, collection } from "firebase/firestore";

export default async function handler(_, res) {
  const query = db.collection("sites").orderBy("createdAt");
  const snapshot = await query.get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json({ sites });
}

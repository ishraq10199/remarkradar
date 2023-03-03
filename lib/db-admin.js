import db from "@/lib/firebase-admin";
import { compareDesc, parseISO } from "date-fns";

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();
    const feedback = [];
    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) => {
      return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
    });

    return { feedback };
  } catch (error) {
    return {
      error,
    };
  }
}

export async function getAllSites() {
  try {
    const snapshot = await db.collection("sites").get();
    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    sites.sort((a, b) => {
      return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
    });

    return { sites };
  } catch (error) {
    return {
      error,
    };
  }
}

// export async function getAllFeedback() {
//   const snapshot = await db.collection("feedback").get();
//   const feedback = [];
//   snapshot.forEach((doc) => {
//     feedback.push({ id: doc.id, ...doc.data() });
//   });
//   return feedback;
// }

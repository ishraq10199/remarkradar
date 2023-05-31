import { db } from "@/lib/firebase-admin";
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

export async function getAllActiveFeedback(siteId) {
  try {
    const snapshot = await db
      .collection("feedback")
      .where("siteId", "==", siteId)
      .where("status", "==", "active")
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

export async function getSiteById(siteId) {
  try {
    const doc = await db.collection("sites").doc(siteId).get();
    const site = { id: doc.id, ...doc.data() };
    return { site };
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

    // if (snapshot.empty) {
    //   return { sites };
    // }

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

export async function getUserSites(userId) {
  try {
    const snapshot = await db
      .collection("sites")
      .where("authorId", "==", userId)
      .where("status", "==", "active")
      .get();
    const sites = [];

    // if (snapshot.empty) {
    //   return { sites };
    // }

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

export async function getUserFeedback(userId) {
  try {
    const snapshot = await db
      .collection("feedback")
      .where("authorId", "==", userId)
      .where("status", "in", ["pending", "active"])
      .get();

    const feedback = [];

    // if (snapshot.empty) {
    //   return { feedback };
    // }

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

export async function getUserFeedbackCount(userId) {
  try {
    const query = db
      .collection("feedback")
      .where("authorId", "==", userId)
      .where("status", "in", ["pending", "active"]);

    const count = await query.count().get();
    console.log(count.data());

    return count.data();
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
}

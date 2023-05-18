import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { getStripe } from "./stripe";

export function createUser(uid, data) {
  return setDoc(
    doc(db, "users", uid),
    {
      uid,
      ...data,
    },
    { merge: true }
  );
}

export async function createSite(data) {
  const site = doc(collection(db, "sites"));
  await setDoc(site, data);
  return site;
}

export async function createFeedback(data) {
  const feedback = doc(collection(db, "feedback"));
  await setDoc(feedback, data);
  return feedback;
}

export async function deleteFeedback(id) {
  const docRef = doc(db, "feedback", id);
  return await updateDoc(docRef, { status: "removed" });
}

export async function updateFeedback(id, newData) {
  const docRef = doc(db, "feedback", id);
  return await updateDoc(docRef, newData);
}

export async function createCheckoutSession(id) {
  const checkoutSessionRef = await addDoc(
    collection(db, "users", id, "checkout_sessions"),
    {
      price: "price_1Mj0bYHZ8IjT3wWRqxsGiNWi",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  // Wait for the CheckoutSession to get attached by the extension
  onSnapshot(checkoutSessionRef, async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

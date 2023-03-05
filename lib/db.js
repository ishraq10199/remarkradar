import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

export function createSite(data) {
  const site = doc(collection(db, "sites"));
  setDoc(site, data);
  return site;
}

export function createFeedback(data) {
  return addDoc(collection(db, "feedback"), { ...data });
}

export function deleteFeedback(id) {
  const docRef = doc(db, "feedback", id);
  return deleteDoc(docRef);
}

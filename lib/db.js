import { collection, addDoc, setDoc, doc } from "firebase/firestore";
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
  return addDoc(collection(db, "sites"), { ...data });
}

export function createFeedback(data) {
  return addDoc(collection(db, "feedback"), { ...data });
}

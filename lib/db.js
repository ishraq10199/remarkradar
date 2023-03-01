import { collection, setDoc, doc } from "firebase/firestore";
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

import { getUserFeedback } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async function handler(req, res) {
  try {
    const user = await auth.verifyIdToken(req.headers.token);
    const { feedback, error } = await getUserFeedback(user.uid);
    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

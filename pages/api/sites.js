import { getUserSites } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async function handler(req, res) {
  try {
    const user = await auth.verifyIdToken(req.headers.token);
    const { sites, error } = await getUserSites(user.uid);
    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

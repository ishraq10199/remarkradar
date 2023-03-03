import { getAllFeedback } from "@/lib/db-admin";

export default async function handler(req, res) {
  const { feedback, error } = await getAllFeedback(req.query.siteId);
  if (error) {
    res.status(500).json({ error: error });
  } else {
    res.status(200).json({ feedback });
  }
}

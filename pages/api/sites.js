import { getAllSites } from "@/lib/db-admin";

export default async function handler(_, res) {
  const { sites, error } = await getAllSites();
  if (error) {
    res.status(500).json({ error: error });
  } else {
    res.status(200).json({ sites });
  }
}

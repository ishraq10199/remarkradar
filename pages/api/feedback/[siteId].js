import { getAllFeedback } from "@/lib/db-admin";
import { logger, prepObjectKeys } from "@/utils/logger";

export default async function handler(req, res) {
  const { feedback, error } = await getAllFeedback(req.query.siteId);
  if (error) {
    const headers = prepObjectKeys(req.headers);
    logger.error(
      {
        request: {
          headers: headers,
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    );
    res.status(500).json({ error: error });
  } else {
    res.status(200).json({ feedback });
  }
}

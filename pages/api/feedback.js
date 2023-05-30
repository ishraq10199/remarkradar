import { getUserFeedback } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";
import { logger, prepObjectKeys } from "@/utils/logger";

export default async function handler(req, res) {
  try {
    const user = await auth.verifyIdToken(req.headers.token);
    const { feedback, error } = await getUserFeedback(user.uid);

    res.status(200).json({ feedback });
  } catch (error) {
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
  }
}

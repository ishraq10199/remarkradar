import { getUserFeedbackCount } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";
import { logger, prepObjectKeys } from "@/utils/logger";

export default async function handler(req, res) {
  try {
    const user = await auth.verifyIdToken(req.headers.token);
    const { count, error } = await getUserFeedbackCount(user.uid);

    res.status(200).json({ count });
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

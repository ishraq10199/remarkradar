import pino from "pino";
import { logflarePinoVercel } from "pino-logflare";

// create pino-logflare console stream for serverless functions and send function for browser logs
const { stream, send } = logflarePinoVercel({
  apiKey: "wI2TDJu02m5g",
  sourceToken: "4a58fa50-c2b4-49c4-9523-c489702ce573",
});

// create pino loggger
const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
    level: "debug",
    base: {
      processes_str: JSON.stringify(process.versions),
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
  },
  stream
);

const prepObjectKeys = (headers) => {
  const keyValues = {};
  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, "_");
    keyValues[newKey] = headers[key];
  });

  return keyValues;
};

export { prepObjectKeys, logger };

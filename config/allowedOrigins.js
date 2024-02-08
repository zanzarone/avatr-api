const { Failure } = require("./failure");
const { logWarn, logInfo } = require("../middleware/logger");

let allowedOrigins = [];

if (process.env.NODE_ENV === "development") {
  if (process.env.DEV_ORIGIN) {
    logInfo(`Development origin on ${process.env.DEV_ORIGIN}`);
    allowedOrigins.push(process.env.DEV_ORIGIN);
  } else {
    logWarn("No development origin specified");
  }
}

if (!process.env.REMOTE_ORIGIN)
  throw new Failure("No remote origin specified", 500);

allowedOrigins.push(process.env.REMOTE_ORIGIN);

module.exports = allowedOrigins;

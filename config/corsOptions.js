const { logWarn } = require("../middleware/logger");
const allowedOrigins = require("./allowedOrigins");
const { Failure } = require("./failure");
const corsOptions = {
  origin: (origin, callback) => {
    logWarn(
      `Avat ${JSON.stringify(allowedOrigins)}, ${origin} ${
        process.env.NODE_ENV
      }`
    );
    if (
      allowedOrigins.indexOf(origin) !== -1 ||
      process.env.NODE_ENV === "development"
    ) {
      callback(null, true);
    } else {
      callback(new Failure("Not allowed by CORS", 401));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

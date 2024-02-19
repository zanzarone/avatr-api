// const { logWarn } = require("../middleware/logger");
const allowedOrigins = require("./allowedOrigins");
const { Failure, Paths, SubCode } = require("./failure");
const corsOptions = {
  origin: (origin, callback) => {
    // logWarn(
    //   `Avat ${JSON.stringify(allowedOrigins)}, ${origin} ${
    //     process.env.NODE_ENV
    //   }`
    // );
    if (
      process.env.NODE_ENV === "development" ||
      //! If you do not want to block
      //! server-to-server requests, add a !origin check in the origin function
      !origin ||
      allowedOrigins.indexOf(origin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(
        new Failure(
          "Not allowed by CORS",
          Code.Internal,
          [{ path: Paths.Cors, msg: origin }],
          Paths.Cors,
          SubCode.Validation
        )
      );
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

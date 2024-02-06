const { Failure } = require("../config/failure");
const { logEvents, logError, logSuccess, logWarn } = require("./logger");

const errorHandler = (err, req, res, next) => {
  let status;
  if (err instanceof Failure) {
    status = err.code ?? 500;
  } else {
    //! server error, if is not applicable
    status = res.statusCode ? res.statusCode : 500;
  }

  let line = `${err.name}: [${err.message}]\t[${req.method}]\t[${req.url}]\t[${req.headers.origin}]`;
  //TODO in a file, for now. Then will be applied to mongo db
  logEvents(line, "errLog.log");
  line = `Status ${status} - ${line}`;
  if (status >= 200 && status < 300) {
    logSuccess(line);
  } else if (status >= 300 && status < 400) {
    logWarn(line);
  } else {
    line = `${line}\n${err.stack}`;
    logError(line);
  }
  //# Output redirect also to the console for development

  res.status(status);
  res.json({ message: err.message, isError: true });
};

module.exports = errorHandler;

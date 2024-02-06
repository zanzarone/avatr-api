const { Failure } = require("../config/failure");
const { logEvents, logError, logSuccess, logWarn } = require("./logger");

const errorHandler = (failure, req, res, next) => {
  let status;
  let errors;
  if (failure instanceof Failure) {
    status = failure.code ?? 500;
    if (failure.errors) {
      errors = failure.errors.map((e) => {
        return `type:${e?.type}, path:${e?.path} => ${e?.msg}`;
      });
    }
    // errors = failure.errors ?? undefined;
  } else {
    //! server error, if is not applicable
    status = res.statusCode ? res.statusCode : 500;
  }

  console.log(errors);
  let line = `${failure.name}: ${failure.message}, [${errors?.map(
    (e) => `${e},`
  )}]\t[${req.method}]\t[${req.url}]\t[${req.headers.origin}]`;
  //TODO in a file, for now. Then will be applied to mongo db
  logEvents(line, "errLog.log");
  line = `Status ${status} - ${line}`;
  if (status >= 200 && status < 300) {
    logSuccess(line);
  } else if (status >= 300 && status < 400) {
    logWarn(line);
  } else {
    line = `${line}\n${failure.stack}`;
    logError(line);
  }
  //# Output redirect also to the console for development

  res.status(status);
  res.json({ message: failure.message, isError: true });
};

module.exports = errorHandler;

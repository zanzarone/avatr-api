const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const chalk = require("chalk");

const log = console.log;
chalk.level = 1; // Use colours in the VS Code Debug Window

const logSuccess = (text) => log(chalk.green(text));
const logWarn = (text) => log(chalk.yellow(text));
const logError = (text) => log(chalk.red(text));
const logInfo = (text) => log(chalk.blueBright(text));

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    logError(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  next();
};

module.exports = { logEvents, logger, logSuccess, logWarn, logError, logInfo };

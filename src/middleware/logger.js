const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromiss = require("fs").promises;
const path = require("path");

// helper function
const LogEvent = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "../", "logs"))) {
      // when the log file is not found then we create a new one where we log event

      await fs.promises.mkdir(path.join(__dirname, "../", "logs"));
    }
    await fs.promises.appendFile(
      path.join(__dirname, "../", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

// writting the middle ware
const Logger = (req, res, next) => {
  LogEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = {
  LogEvent,
  Logger,
};

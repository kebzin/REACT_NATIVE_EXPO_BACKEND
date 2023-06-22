const { LogEvent } = require("./logger");

// error handular
const errorHandlers = (err, req, res, next) => {
  // overriding express error handuller

  LogEvent(
    `${err.name}: ${err.message}\t${req.method}\t${req.uri}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);
  const status = res.statusCode ? res.statusCode : 500; // dserver error
  res.status(status);
  res.json({ message: err.message });
};

module.exports = errorHandlers;

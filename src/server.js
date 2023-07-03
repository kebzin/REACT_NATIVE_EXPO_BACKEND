const express = require("express");
const connect = require("./connect/connect");
const app = express();
const Register = require("./routers/Authentication");

const { Logger, LogEvent } = require("./middleware/logger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const corssOption = require("./config/corsOption");
const user = require("./routers/users");

// middleware
app.use(Logger);
app.use(cors(corssOption));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// routs
// app.use("/api/price", Price);
app.use("/api/auth", Register);
// app.use("/api/fine", Fine);
app.use("/api/user", user);
// app.use("/api/driver", Driver);
// app.use("/api/message", Message);

// Connect to Database
void (async () => {
  // void function does not return any value , it mean that the function does cannot be stored in a variable
  try {
    await connect();
    console.log("connected to database"); // if connect is true then succesfully connected
  } catch (error) {
    console.log("error connecting to database:", error.message);
    LogEvent(
      `${error.on}: ${error.code}\t${error.syscall}\t${error.hostname}\t${error.status}`,
      "mongoErrLog.log"
    );
  }
})();

module.exports = app;

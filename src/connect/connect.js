const mongoose = require("mongoose");

const connect = () => {
  // function that connect my app to the server
  return mongoose.connect(process.env.DATABASE_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });
};

module.exports = connect;

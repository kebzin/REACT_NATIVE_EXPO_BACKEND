const mongoose = require("mongoose");

// const URI =
//   "mongodb+srv://kebba:Howareyoudoing1@cluster0.odehr6g.mongodb.net/?retryWrites=true&w=majority"; // link to my database at atlass
const connect = () => {
  // function that connect my app to the server
  return mongoose.connect(process.env.DATABASE_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });
};

module.exports = connect;

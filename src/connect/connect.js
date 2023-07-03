const mongoose = require("mongoose");

<<<<<<< HEAD
// const URI =
//   "mongodb+srv://kebba:Howareyoudoing1@cluster0.odehr6g.mongodb.net/?retryWrites=true&w=majority"; // link to my database at atlass
=======
>>>>>>> c49414b12197a78a00c699fcbbaafc561ccb90db
const connect = () => {
  // function that connect my app to the server
  return mongoose.connect(process.env.DATABASE_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  });
};

module.exports = connect;

// const mongoose = require("mongoose");

// const MessageSchema = new mongoose.Schema(
//   {
//     officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
//     MessageContent: { type: String },
//     ReciverID: { type: String },
//     view: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// MessageSchema.set("toJSON", {
//   transform: (document, returnObject) => {
//     returnObject.id = returnObject._id.toString();
//     delete returnObject._id;
//     delete returnObject.__v;
//     return returnObject;
//   },
// });

// const Message = mongoose.model("Message", MessageSchema);
// module.exports = Message;

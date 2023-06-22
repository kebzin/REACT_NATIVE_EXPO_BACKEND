// const mongoose = require("mongoose");

// const transportationSchema = new mongoose.Schema(
//   {
//     fineId: { type: String },
//     officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
//   },
//   { timestamps: true }
// );

// transportationSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     return returnedObject;
//   },
// });

// const transaction = mongoose.model("transaction", transportationSchema);
// module.exports = transaction;

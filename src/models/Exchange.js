// const mongoose = require("mongoose");

// const driversSchema = new mongoose.Schema(
//   {
//     driversFirstName: { type: "string" },
//     driversLastName: { type: "string" },
//     driversPhone: { type: "string" },
//     driversAddress: { type: "string" },
//     driversLicensNumber: { type: "string" },
//     driversCarNumberPlate: { type: "string" },
//     FineID: { type: mongoose.Schema.Types.ObjectId, ref: "fine" },
//     userID: { type: "String" },
//   },
//   { timestamps: true }
// );

// //

// driversSchema.set("toJSON", {
//   transform: (document, retornObject) => {
//     retornObject.id = document._id.toString();
//     delete retornObject._id;
//     delete retornObject.__v;
//     return retornObject;
//   },
// });
// const drivers = mongoose.model("drivers", driversSchema);

// module.exports = drivers;

// const mongoose = require("mongoose");

// const finedSchema = new mongoose.Schema(
//   {
//     OffenceCommited: { type: String },
//     fineDescription: { type: String },
//     LicenNumber: { type: String },
//     NumberPlat: { type: String },
//     fineAmount: { type: String },
//     officerId: { type: mongoose.Schema.Types.ObjectId, ref: "officers" },
//     Longitude: { type: String, default: "" },
//     Latitude: { type: String, default: "" },
//     discription: { type: String },
//     status: { type: String, default: "Pending" },
//     wanted: { type: Boolean },
//     category: { type: String, default: "" },
//     amountPaid: { type: Number, default: 0 },
//     bonus: { type: String, default: 0 },

//     // bonuse : (fineAmount)=>{
//     //     // calculate the bonus value of the fineAmount

//     // }
//   },
//   { timestamps: true }
// );

// finedSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     return returnedObject;
//   },
// });

// const Fine = mongoose.model("Fine", finedSchema);
// module.exports = Fine;

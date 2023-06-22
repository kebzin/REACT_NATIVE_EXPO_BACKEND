// const mongoose = require("mongoose");

// // pricing schema
// const PricingSchema = new mongoose.Schema(
//   {
//     OffenceName: {
//       type: String,
//     },
//     OffencePrice: {
//       type: Number,
//     },
//     AdminID: { type: "string" },
//     OffenceCategory: { type: String },
//   },
//   { timestamps: true }
// );

// PricingSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//     return returnedObject;
//   },
// });

// const Pricing = mongoose.model("Pricing", PricingSchema);

// module.exports = Pricing;

const mongoose = require("mongoose");

const PropertyCategorySchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

PropertyCategorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

const transaction = mongoose.model("transaction", PropertyCategorySchema);
module.exports = transaction;

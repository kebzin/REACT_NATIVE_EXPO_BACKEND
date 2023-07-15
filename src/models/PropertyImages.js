const mongoose = require("mongoose");

// Define the Property Image schema
const PropertyImageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
      require: true,
    },
    image_url: [{ type: String, default: "", require: true }], // Array of image URLs associated with the property
  },
  { timestamps: true }
);

PropertyImageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

// Create the Property Image model using the PropertyImageSchema
const PropertyImage = mongoose.model("PropertyImage", PropertyImageSchema);

// Export the Property Image model
module.exports = PropertyImage;

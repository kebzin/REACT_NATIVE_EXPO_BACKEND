const mongoose = require("mongoose");

// Define the Property Image schema
const PropertyImageSchema = new mongoose.Schema(
  {
    image_urls: [{ type: String }], // Array of image URLs associated with the property
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

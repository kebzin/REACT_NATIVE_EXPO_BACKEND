const mongoose = require("mongoose");

// Define the property schema
const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Add required validation for title
    description: { type: String, required: true }, // Add required validation for description
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties_category",
      required: true, // Add required validation for category_id
      index: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true, // Add required validation for location
      index: true,
    },
    price: { type: Number, required: true }, // Add required validation for price
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true, // Add required validation for owner_id
      index: true,
    },
    property_image_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property_Image",
    }, // Correct the property_image_id field name to follow camel case convention
    number_of_bedroom: { type: Number }, // Correct the field name to follow camel case convention
    number_of_bathroom: { type: Number }, // Correct the field name to follow camel case convention
    rating: { type: Number },
  },
  { timestamps: true }
);

// Create indexes for faster queries
propertySchema.index({ category_id: 1, location: 1, owner_id: 1 });

// Define a transformation for toJSON method to modify the returned object
propertySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

// Create the Properties model using the propertySchema
const Properties = mongoose.model("properties", propertySchema);

// Export the Properties model
module.exports = Properties;

/**
 * The Properties schema represents the properties in the application available for renting or exchanging.
 * It includes fields such as title, description, category ID, location ID, price, owner ID,
 * property image ID, number of bedrooms, number of bathrooms, and rating.
 * The schema defines required validations for certain fields and indexes for faster queries.
 * The schema also includes a transformation function to customize the returned object when converting it to JSON format,
 * removing unnecessary fields and mapping the internal _id field to a more user-friendly id field.
 * The Properties model is created using the schema and exported for use in other parts of the application.
 */

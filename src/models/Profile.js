const mongoose = require("mongoose");

// Define the Profile Image schema
const profileImageSchema = new mongoose.Schema({
  image_url: [{ type: String, default: "" }], // Add validation for non-empty image URL
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Add required validation for userId
});

profileImageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

// Create the Profile Image model using the profileImageSchema
const ProfileImage = mongoose.model("ProfileImage", profileImageSchema);

// Export the Profile Image model
module.exports = ProfileImage;

/**
 * The Profile Image schema represents the profile image of a user in the application.
 * It includes fields for the image URL and the associated user's ID.
 * The schema includes a transformation function to customize the returned object when converting it to JSON format,
 * removing unnecessary fields and mapping the internal _id field to a more user-friendly id field.
 * The Profile Image model is created using the schema and exported for use in other parts of the application.
 *
 * Note: Additional code can be added to this schema to implement features such as file storage,
 * image processing, access control, and any other custom functionality required for the application.
 */

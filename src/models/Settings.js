const mongoose = require("mongoose");

// Define the Setting schema
const settingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    pushNotification: { type: Boolean, default: false, required: true },
    receivedMessages: { type: Number, default: true, required: true },
    emailNotifications: { type: Boolean, default: true, required: true }, // Enable or disable email notifications
    rentalAvailability: { type: Boolean, default: true, required: true }, // Enable or disable rental availability
    exchangeAvailability: { type: Boolean, default: false, required: true }, // Enable or disable item exchange availability
    currency: { type: String, default: "GMD", required: true }, // Default currency for pricing and transactions
    location: { type: String, default: "Global", required: true }, // Default location for search and user preferences
  },
  { timestamps: true }
);

settingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});

// Create the Setting model using the settingSchema
const Setting = mongoose.model("Setting", settingSchema);

// Export the Setting model
module.exports = Setting;

/**
 * The Setting schema represents the user settings in the application.
 * It includes fields for the associated user's ID, various settings such as push notifications, email notifications,
 * rental and exchange availability, default currency, and default location.
 * The schema includes a transformation function to customize the returned object when converting it to JSON format,
 * removing unnecessary fields and mapping the internal _id field to a more user-friendly id field.
 * The Setting model is created using the schema and exported for use in other parts of the application.
 */

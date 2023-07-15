const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    location: { type: String, require: true, default: "" },
    Email: { type: String, require: true },
    password: { type: String, require: true },
    gender: { type: String, require: true, default: "" },
    PhoneNumber: { type: String, require: true },
    accountStatus: { type: String, default: "Active", require: true },
    companyName: { type: String, require: true, default: "" },
    webSite: { type: String, require: true, default: "" },
    termCheck: { type: Boolean, require: true, default: "" },
    usersSetting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Setting",
      require: true,
    },
    socialMediaAccounts: [{ type: String, default: "", require: true }],
    profileImageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProfileImage",
      require: true,
    },
    verificationToken: { type: String, require: true, default: "" },
    verified: { type: Boolean, default: false, require: true },
  },
  { timestamps: true }
);

usersSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    return returnedObject;
  },
});
const users = mongoose.model("users", usersSchema);

module.exports = users;

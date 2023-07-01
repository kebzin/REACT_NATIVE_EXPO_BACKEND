const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    location: { type: String },
    email: { type: String },
    password: { type: String },
    gender: { type: String },
    PhoneNumber: { type: String },
    accountStatus: { type: String, default: "Active" },
    companyName: { type: String },
    webSite: { type: String },
    usersSetting: { type: mongoose.Schema.Types.ObjectId, ref: "setting" },
    socialMediaAccounts: [{ type: String }, { type: String }],
    profileImage: { type: mongoose.Schema.Types.ObjectId, ref: "profileImage" },
    verificationToken: { type: String },
    verified: { type: Boolean, default: false },
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

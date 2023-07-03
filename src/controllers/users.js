const user = require("../models/Users");
const property = require("../models/Properties");
const exchange = require("../models/Exchange");
const profImage = require("../models/Profile");
const settings = require("../models/Settings");

/**
 * Get user details, including profile image and setting.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
const getUserDetails = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists
    const User = await user
      .findById(userId)
      .populate("profileImage")
      .populate("setting")
      .select("-password") // Exclude the password field
      .exec();

    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Format the response

    // Send the formatted response
    res.json(User);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user details" });
  }
};

/**
 * Update user details.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>}
 */
const updateUser = async (req, res) => {
  try {
    // Extract the user ID from the request parameters
    const userId = req.params.userId;

    // Retrieve the updates from the request body
    const updates = req.body;

    // Check if the user exists
    const User = await user.findById(userId).exec();

    // If user doesn't exist, return an error response
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user fields using spread operator
    user.set({ ...updates });

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Send the updated user object in the response
    res.json({ message: "User data has been updated succesfully" });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating user details" });
  }
};

/**
 * Deletes a user and associated data from the application.
 *
 * This function removes a user from the database along with their posts,
 * profile, settings, and exchange items. It ensures data consistency, privacy,
 * and provides a clean user experience by removing all traces of the user's
 * actions within the application.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The HTTP response indicating the success or failure of the deletion operation.
 * @throws {Error} - If the user ID is not provided or an error occurs during deletion.
 */

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID
    const User = await user.findById(userId);
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Delete the user's exchange items
      await exchange.deleteMany({ userId }).session(session);

      // Delete the user's posts
      await property.deleteMany({ userId }).session(session);

      // Delete the user's profile image
      await profImage.findOneAndDelete({ userId }).session(session);

      // Delete the user's settings
      await settings.findOneAndDelete({ userId }).session(session);

      // Find all messages sent by the user and delete them
      const sentMessages = await Message.find({ senderId: userId }).session(
        session
      );
      for (const message of sentMessages) {
        await message.remove({ session });
      }

      // Delete the user's notifications
      await Notification.deleteMany({ userId }).session(session);

      // Delete the user
      await User.remove({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      // Rollback the transaction if an error occurs
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    // Error handling
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
};

module.exports = {
  deleteUser,
};

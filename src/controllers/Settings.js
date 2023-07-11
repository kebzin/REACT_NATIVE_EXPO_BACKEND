const setting = require("../models/Settings");
const users = require("../models/Users");

/**
 * Get the settings of a user.
 *
 * This function retrieves the settings of a user based on the provided user ID.
 * It first checks if the user exists by querying the 'users' collection using the user ID.
 * If the user exists, it proceeds to retrieve the corresponding settings.
 * If the user does not exist, it returns an appropriate error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getSetting = async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Retrieve the user's settings
    const setting = await settings.findOne({ userId });

    // Handle the case when the user has no settings
    if (!setting) {
      return res
        .status(404)
        .json({ message: "Settings not found for the user." });
    }

    // Return the user's settings
    return res.status(200).json({ setting });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("An error occurred while getting the user settings:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Update the settings of a user.
 *
 * This function updates the settings of a user based on the provided user ID.
 * It first checks if the user exists by querying the 'users' collection using the user ID.
 * If the user exists, it proceeds to update the corresponding settings.
 * If the user does not exist, it returns an appropriate error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateSetting = async (req, res) => {
  const userId = req.params.id;
  const { settingData } = req.body;

  try {
    // Check if the user exists
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's settings
    const updatedSetting = await settings.findOneAndUpdate(
      { userId },
      settingData,
      { new: true }
    );

    // Handle the case when the user has no settings
    if (!updatedSetting) {
      return res
        .status(404)
        .json({ message: "Settings not found for the user." });
    }

    // Return the updated user's settings
    return res.status(200).json({ setting: updatedSetting });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("An error occurred while updating the user settings:", error);

    // Check for specific error types and return appropriate responses
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({
          message: "Invalid input data. Please provide valid settings.",
        });
    }

    // For other unhandled errors, return a generic error response
    return res.status(500).json({ message: "Internal server error." });
  }
};

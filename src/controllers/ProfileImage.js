const profileImage = require("../models/Profile");
const user = require("../models/Users");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Get the profile image of a user.
 *
 * This function retrieves the profile image of a user based on the provided user ID.
 * It first checks if the user exists by querying the 'users' collection using the user ID.
 * If the user exists, it retrieves the corresponding profile image.
 * If the user does not exist or has no profile image, it returns an appropriate error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getProfileImage = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const existingUser = await user.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has a profile image
    if (!existingUser.image_url) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    // Fetch the profile image from the database
    const image = await profileImage.findById(existingUser.profileImage);

    // Resize the image if needed
    const resizedImageBuffer = await sharp(image.imageData)
      .resize({ width: 500, height: 500 })
      .toBuffer();

    // Set caching headers for the image
    res.set("Cache-Control", "public, max-age=3600"); // Cache the image for 1 hour

    // Return the image to the client
    res.status(200).json({ imageUrl: resizedImageBuffer.toString("base64") });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(
      "An error occurred while retrieving the user profile image:",
      error
    );

    // For other unhandled errors, return a generic error response
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Update the profile image of a user.
 *
 * This function updates the profile image of a user based on the provided user ID.
 * It first checks if the user exists by querying the 'users' collection using the user ID.
 * If the user exists, it proceeds to update the corresponding profile image.
 * If the user does not exist, it returns an appropriate error response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "profile-" + uniqueSuffix + ext);
  },
});

// Define file upload limits and file types
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const ext = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (ext && mimeType) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, JPG, and PNG files are allowed."
        )
      );
    }
  },
}).single("profileImage");

// Upload profile image and update user's profile image URL
const uploadProfileImage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file selected for upload." });
    }

    const userId = req.body.userId;

    try {
      const User = await user.findById(userId);
      if (!User) {
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: "User not found." });
      }

      const imageUrl = req.file.path;
      const profileImage = await profileImage.create({ imageUrl, userId });

      user.profileImage = profileImage._id;
      await user.save();

      return res
        .status(200)
        .json({ message: "Profile image uploaded successfully.", imageUrl });
    } catch (error) {
      fs.unlinkSync(req.file.path);
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred during profile image upload." });
    }
  });
};

module.exports = { uploadProfileImage };

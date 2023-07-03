const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../models/Users");
const Setting = require("../models/Settings");
const ProfileImage = require("../models/Profile");

/**
Registers a new user by checking if the user already exists, hashing the password,
and adding the user to the database.
@param {Object} req - The request object containing user data in the body.
@param {Object} res - The response object used to send a JSON response.
@param {Function} next - The next function to pass control to the next middleware.
@returns {Promise} - A promise that resolves to a JSON response or passes control to the error-handling middleware.
*/

const registerUser = async (req, res) => {
  const content = req.body;
<<<<<<< HEAD
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

=======
>>>>>>> 0d966af6c4bff956b9e09d3365495393b0be5fa1
  // A transaction ensures that either all operations within it are successfully completed, or none of them are applied.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
<<<<<<< HEAD
    // Check if the email address is valid
    if (!emailRegex.test(content.email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // checking if the user exist befor adding
=======
    // Checking if the user already exists...
>>>>>>> c49414b12197a78a00c699fcbbaafc561ccb90db
    const existingUser = await users
      .findOne({ email: content.email })
      .lean()
      .exec();
    if (existingUser) {
      return res.status(409).json({
        message: `Your user ID could not be created because ${content.email} is already taken. Please choose a new one.`,
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(content.password, salt);
    console.log("Hashed password:", hashedPassword);

    // Add the user to the database within the transaction session
    const newUser = await users.create(
      {
        firstName: content.firstName,
        lastName: content.lastName,
        // Add other user details...
      },
      { session }
    );

    // Adding the user setting table during user creation within the same session
    const userSetting = await Setting.create(
      {
        userId: newUser._id,
        pushNotification: content.pushNotification,
        receivedMessages: content.receivedMessages,
        emailNotifications: content.emailNotifications,
        rentalAvailability: content.rentalAvailability,
        exchangeAvailability: content.exchangeAvailability,
        currency: content.currency,
        location: content.location,
      },

      { session }
    );

    // Adding the user profile image table during user creation within the same session
    const profileImage = await ProfileImage.create(
      {
        image_url: content.image_url,
        userId: newUser._id,
      },
      { session }
    );

    // Assign the userSetting and profileImage IDs to the newUser
    newUser.usersSetting = userSetting._id;
    newUser.profileImage = profileImage._id;
    await newUser.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: `User "${newUser.Email}" created. This email address will serve as your new user ID and cannot be changed later.`,
    });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    if (error.message) {
      return res.status(500).json({ message: error.message });
    } else {
      return res
        .status(500)
        .json({ message: "An error occurred during user registration." });
    }
  }
};

// login function

/**
 * Authenticates a user by checking their credentials and generates a JWT for authorization.
 *
 * @param {Object} req - The request object containing user login data in the body.
 * @param {Object} res - The response object used to send a JSON response.
 * @param {Function} next - The next function to pass control to the next middleware.
 * @returns {Promise} - A promise that resolves to a JSON response or passes control to the error-handling middleware.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await users
      .findOne({ email })
      .populate("ProfileImage usersSetting")
      .exec();

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Check if the user's account is active
    if (!user.active) {
      return res.status(401).json({
        message: "Your account is inactive. Please contact the administrator.",
      });
    }

    // Generate an access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Generate a refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Set the refresh token as a secure HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Remove sensitive data from the user object
    const { password: _, ...userInfo } = user.toObject();

    // Return the access token and user information
    res.status(200).json({ accessToken, user: userInfo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

/**
 * Refreshes the access token using a valid refresh token.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves to a JSON response or passes control to the error-handling middleware.
 */
const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Check if the user exists
    const foundUser = await users.findById(decoded.userId).exec();
    if (!foundUser) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Generate a new access token with extended expiration
    const accessToken = generateAccessToken(foundUser._id);

    // Send the new access token to the client
    res.json({ accessToken });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Refresh token expired" });
    }
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

/**
 * Generates a new access token with an extended expiration time.
 *
 * @param {string} userId - The user ID.
 * @returns {string} - The generated access token.
 */
const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

/**
 * Logs out a user by clearing the refresh token cookie.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const logout = (req, res) => {
  // Clear the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  // Send a success message
  res.status(200).json({ message: "Logout successful." });
};

module.exports = { registerUser, login, logout, refreshAccessToken };

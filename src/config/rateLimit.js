const rateLimit = require("express-rate-limit");

// Create a rate limiter
const registerUserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Maximum number of requests allowed in the windowMs timeframe
  message: "Too many registration attempts. Please try again later.",
});

module.exports = { registerUserLimiter };

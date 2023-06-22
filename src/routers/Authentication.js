const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  logout,
  refreshAccessToken,
} = require("../controllers/Autentication");
const { registerUserLimiter } = require("../config/rateLimit");

// const verifyJWT = require("../middleware/verifyjwt");

// implementing the routh

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refreshAccessToken]);

// router.use(verifyJWT);
router.post("/register", registerUserLimiter, registerUser);
module.exports = router;

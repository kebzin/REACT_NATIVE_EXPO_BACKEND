const allowOrigin = require("./allowOrigin");

const corssOption = {
  origin: (origin, callback) => {
    if (allowOrigin.indexOf(origin) !== -1 || !origin) {
      // only those list orign are allow to access our api, or those that do not have an origin example testing our api using any
      callback(null, true);
    } else {
      callback(
        new Error(`Origin ${origin} is not allowed to access this application`)
      );
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corssOption;

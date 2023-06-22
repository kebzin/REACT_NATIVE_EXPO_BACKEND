const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const autHeader = req.headers.authorization || req.headers.Authorization;

  if (!autHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = autHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (erro, decoded) => {
    console.log(erro);
    console.log(token);
    if (erro) return res.status(401).json({ message: "Forbidden" });

    req.Officers = decoded.userInfo._id;
    next();
  });
};

module.exports = verifyJWT;

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token Required",
    });
  }

  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid Token",
      });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
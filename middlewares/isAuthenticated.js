const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      success: false,
      message: "Authorization error. Token is not valid",
    });
  }
  try {
    const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

    if (verifyUser) {
      req.userId = verifyUser._id;
    }
    next();
  } catch (e) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

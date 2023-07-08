const jwt = require("jsonwebtoken");
const AppError = require("../utils/errors");

const authChecker = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new AppError(401, "Authorization token required");
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.json({ error: "Invalid Authorization token" }).status(401);
      }
      req.userId = decodedToken.id;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authChecker;

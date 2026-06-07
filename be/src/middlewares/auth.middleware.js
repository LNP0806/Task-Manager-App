const jwt = require("jsonwebtoken");

const AppError = require("../utils/app-error");
const pool = require("../config/db");

const requiredAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Authentication token is required", 401));
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [decoded.id],
    );

    const user = result.rows[0];

    if (!user) {
      return next(new AppError("User no longer exists", 404));
    }

    req.user = user;

    next();
  } catch (error) {
    return next(new AppError("Invalid authentication token", 401));
  }
};

module.exports = {
  requiredAuth,
};

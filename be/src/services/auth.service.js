const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");
const AppError = require("../utils/app-error");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
  );
};

const register = async (data) => {
  const existingUserResult = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [data.email.trim().toLowerCase()],
  );

  if (existingUserResult.rows.length > 0) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
    `,
    [data.name.trim(), data.email.trim().toLowerCase(), hashedPassword],
  );

  const user = result.rows[0];

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

const login = async (data) => {
  const result = await pool.query(
    `
    SELECT id, name, email, password_hash FROM users WHERE email = $1
    `,
    [data.email.trim().toLowerCase()],
  );

  const user = result.rows[0];

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(data.password, user.password_hash);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
    token,
  };
};

module.exports = {
  register,
  login,
};

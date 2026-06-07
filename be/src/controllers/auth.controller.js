const authService = require("../services/auth.service");
const { successResponse } = require("../utils/api-response");

const register = async (req, res, next) => {
  const { name, email, password } = req.validateBody;

  const result = await authService.register({ name, email, password });

  return successResponse(res, "User registered successfully", result, 201);
};

const login = async (req, res, next) => {
  const { email, password } = req.validateBody;

  const result = await authService.login({ email, password });

  return successResponse(res, "User logged in successfully", result);
};

module.exports = {
  register,
  login,
};

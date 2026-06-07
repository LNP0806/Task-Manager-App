const express = require("express");

const authController = require("../controllers/auth.controller");
const { validateBody } = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const asyncHandler = require("../middlewares/async-handler.middleware");

const { requiredAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", validateBody(registerSchema), asyncHandler(authController.register));
router.post("/login", validateBody(loginSchema), asyncHandler(authController.login));

module.exports = router;
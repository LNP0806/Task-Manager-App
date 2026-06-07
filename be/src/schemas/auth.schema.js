const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters long"),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long"),
});

const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be at least 6 characters long"),
});

module.exports = {
  registerSchema,
  loginSchema,
};

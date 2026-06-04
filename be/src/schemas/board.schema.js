const { z } = require("zod");

const createBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .trim()
    .min(1, "Title cannot be empty")
    .max(100, "Title must be less than or equal to 100 characters"),

  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .max(500, "Title must be less than or equal to 500 characters"),
});

module.exports = {
  createBoardSchema,
};

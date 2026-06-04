const { z, refine } = require("zod");

const createCardSchema = z.object({
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

  status: z
    .enum(["todo", "doing", "review", "done"], {
      invalid_type_error: "Status must be todo, doing, review or done",
    })
    .optional(),
});

const updateCardSchema = z
  .object({
    title: z
      .string({
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
  })
  .refine(
    (data) => data.title !== undefined || data.description !== undefined,
    {
      message: "At least one field is required",
    },
  );

const moveCardSchema = z.object({
  targetStatus: z
    .enum(["todo", "doing", "review", "done"], {
      invalid_type_error: "Target status must be todo, doing, review or done",
    }),

  position: z
    .number({
      invalid_type_error: "Position must be a number",
    })
    .min(0, "Position must be a positive number")
    .optional(),
});

module.exports = {
  createCardSchema,
  updateCardSchema,
  moveCardSchema,
};

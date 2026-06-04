const express = require("express");

const router = express.Router();

const asyncHandler = require("../middlewares/async-handler.middleware");

const {
  validateBody,
  validateQuery,
} = require("../middlewares/validate.middleware");

const { updateCardSchema, moveCardSchema } = require("../schemas/card.schema");

const cardController = require("../controllers/card.controller");

router.patch(
  "/:id/move",
  validateBody(moveCardSchema),
  asyncHandler(cardController.moveCard),
);

router.patch(
  "/:id",
  validateBody(updateCardSchema),
  asyncHandler(cardController.updateCard),
);

router.delete("/:id", asyncHandler(cardController.deleteCard));

module.exports = router;

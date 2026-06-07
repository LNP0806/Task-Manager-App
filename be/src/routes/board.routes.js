const express = require("express");

const asyncHandler = require("../middlewares/async-handler.middleware");

const {requiredAuth} = require("../middlewares/auth.middleware");

const {
  validateBody,
  validateQuery,
} = require("../middlewares/validate.middleware");

const { createBoardSchema } = require("../schemas/board.schema");
const { createCardSchema } = require("../schemas/card.schema");

const boardController = require("../controllers/board.controller");

const router = express.Router();

router.use(requiredAuth);

router.get("/", asyncHandler(boardController.getAllBoards));

router.get("/:id", asyncHandler(boardController.getBoardDetailById));

router.post(
  "/:id/cards",
  validateBody(createCardSchema),
  asyncHandler(boardController.createCard),
);

router.post(
  "/",
  validateBody(createBoardSchema),
  asyncHandler(boardController.createBoard),
);

module.exports = router;

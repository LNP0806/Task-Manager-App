const express = require("express");

const asyncHandler = require("../middlewares/async-handler.middleware");

const boardController = require("../controllers/board.controller");

const router = express.Router();

router.get("/", asyncHandler(boardController.getAllBoards));

router.get("/:id", asyncHandler(boardController.getBoardDetailById));

router.post("/:id/cards", asyncHandler(boardController.createCard));

router.post("/", asyncHandler(boardController.createBoard));

module.exports = router;

const express = require("express");

const asyncHandlerMiddleware = require("../middlewares/async-handler.middleware");

const boardController = require("../controllers/board.controller");

const router = express.Router();

router.get("/", asyncHandlerMiddleware(boardController.getAllBoards));

module.exports = router;

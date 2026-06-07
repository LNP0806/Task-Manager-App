const AppError = require("../utils/app-error");

const { successResponse } = require("../utils/api-response");

const boardServices = require("../services/board.service");

const getAllBoards = async (req, res) => {
  const userId = req.user.id;

  const result = await boardServices.getAllBoards(userId);

  return successResponse(res, "Get boadrs successfully", result.data, 200);
};

const createBoard = async (req, res) => {
  const { title, description } = req.validateBody;
  const userId = req.user.id;

  const newBoard = await boardServices.createBoard(userId, { title, description });

  return successResponse(res, "Create board successfully", newBoard, 201);
};

const getBoardDetailById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const board = await boardServices.getBoardDetailById(id, userId);

  if (!board) {
    throw new AppError("Board not found", 404);
  }

  return successResponse(res, "Get board successfully", board);
};

const createCard = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.validateBody;
  const userId = req.user.id;
  const newCard = await boardServices.createCard(id, userId, {
    title,
    description,
    status,
  });

  return successResponse(res, "Create card successfully", newCard, 201);
};

module.exports = {
  getAllBoards,
  createBoard,
  getBoardDetailById,
  createCard,
};

const AppError = require("../utils/app-error");

const boardServices = require("../services/board.service");

const getAllBoards = async (req, res) => {
  const boards = await boardServices.getAllBoards();

  res.json({
    success: true,
    message: "Get boards successfully",
    data: boards,
  });
};

const createBoard = async (req, res) => {
  const { title, description } = req.body;

  const newBoard = await boardServices.createBoard({ title, description });

  res.status(201).json({
    success: true,
    message: "Create board successfully",
    data: newBoard,
  });
};

const getBoardDetailById = async (req, res) => {
  const { id } = req.params;

  const board = await boardServices.getBoardDetailById(id);

  if (!board) {
    throw new AppError("Board not found", 404);
  }

  res.json({
    success: true,
    message: "Get board details successfully",
    data: board,
  });
};

const createCard = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const newCard = await boardServices.createCard(id, {
    title,
    description,
    status,
  });

  res.status(201).json({
    success: true,
    message: "Create card successfully",
    data: newCard,
  });
};

module.exports = {
  getAllBoards,
  createBoard,
  getBoardDetailById,
  createCard,
};

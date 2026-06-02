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

module.exports = {
  getAllBoards,
  createBoard,
};

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

module.exports = {
  getAllBoards,
};

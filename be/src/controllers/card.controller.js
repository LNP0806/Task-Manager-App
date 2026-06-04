const AppError = require("../utils/app-error");
const { successResponse } = require("../utils/api-response");

const cardService = require("../services/card.service");
const { de } = require("zod/v4/locales");

const updateCard = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.validateBody;

  const updatedCard = await cardService.updateCard(id, { title, description });

  if (!updatedCard) {
    throw new AppError("Card not found", 404);
  }

  return successResponse(res, "Updated card successfully", updatedCard);
};

const deleteCard = async (req, res, next) => {
  const { id } = req.params;

  const deletedCard = await cardService.deleteCard(id);

  if (!deletedCard) {
    throw new AppError("Card not found", 404);
  }

  return successResponse(res, "Deleted card successfully", deletedCard);
};

const moveCard = async (req, res, next) => {
  const { id } = req.params;
  const { targetStatus, position } = req.validateBody;

  const movedCard = await cardService.moveCard(id, { targetStatus, position });

  if (!movedCard) {
    throw new AppError("Card not found", 404);
  }

  return successResponse(res, "Changed card status successfully", movedCard);
};

module.exports = {
  updateCard,
  deleteCard,
  moveCard,
};

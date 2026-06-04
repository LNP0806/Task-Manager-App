const pool = require("../config/db");

const updateCard = async (id, payload) => {
  const { title, description } = payload;

  const fields = [];
  const values = [];

  let paramIndex = 1;

  if (title !== undefined) {
    fields.push(`title = $${paramIndex}`);
    values.push(title);
    paramIndex++;
  }

  if (description !== undefined) {
    fields.push(`description = $${paramIndex}`);
    values.push(description);
    paramIndex++;
  }

  values.push(id);

  const result = await pool.query(
    `
    UPDATE cards
    SET ${fields.join(", ")}
    WHERE id = $${paramIndex}
    RETURNING id, board_id, title, description, status, position, created_at, updated_at
    `,
    values,
  );

  const card = result.rows[0];

  return {
    id: card.id,
    boardId: card.board_id,
    title: card.title,
    description: card.description,
    status: card.status,
    position: card.position,
    createdAt: card.created_at,
    updatedAt: card.updated_at,
  };
};

const deleteCard = async (id) => {
  const result = await pool.query(
    `
    DELETE cards
    WHERE id = $1
    RETURNING id, board_id, title, description, status, position, created_at, updated_at
    `,
    [id],
  );

  const card = result.rows[0];

  return {
    id: card.id,
    boardId: card.board_id,
    title: card.title,
    description: card.description,
    status: card.status,
    position: card.position,
    createdAt: card.created_at,
    updatedAt: card.updated_at,
  };
};

const moveCard = async (id, payload) => {
  const result = await pool.query(
    `
    UPDATE cards
    SET status = $1, position = $2
    WHERE id = $3
    RETURNING id, board_id, title, description, status, position, created_at, updated_at
    `,
    [payload.targetStatus, payload.position, id],
  );

  const card = result.rows[0];

  return {
    id: card.id,
    boardId: card.board_id,
    title: card.title,
    description: card.description,
    status: card.status,
    position: card.position,
    createdAt: card.created_at,
    updatedAt: card.updated_at,
  };
};

module.exports = {
  updateCard,
  deleteCard,
  moveCard,
};

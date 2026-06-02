const pool = require("../config/db");

const getAllBoards = async () => {
  const result = await pool.query(
    `
    SELECT 
      b.id, 
      b.title, 
      b.description, 
      b.created_at, 
      b.updated_at,
      COUNT(c.id)::int AS card_count
    FROM boards b
    LEFT JOIN cards c ON c.board_id = b.id
    GROUP BY b.id, b.title, b.description, b.created_at, b.updated_at
    ORDER BY id ASC
    `,
  );

  const boards = result.rows;

  const data = boards.map((board) => ({
    id: board.id,
    title: board.title,
    description: board.description,
    createdAt: board.created_at,
    updatedAt: board.updated_at,
    cardCount: board.card_count,
  }));

  return data;
};

const createBoard = async (data) => {
  const result = await pool.query(
    `
    INSERT INTO boards (title, description)
    VALUES ($1, $2)
    RETURNING id, title, description, created_at, updated_at, 0::int AS card_count
    `,
    [data.title.trim(), data.description.trim()],
  );

  const newBoard = result.rows[0];

  const board = {
    id: newBoard.id,
    title: newBoard.title,
    description: newBoard.description,
    createdAt: newBoard.created_at,
    updatedAt: newBoard.updated_at,
    cardCount: newBoard.card_count,
  };

  return board;
};

module.exports = {
  getAllBoards,
  createBoard,
};

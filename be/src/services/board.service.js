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

  const boards = result.rows.map((board) => ({
    id: board.id,
    title: board.title,
    description: board.description,
    createdAt: board.created_at,
    updatedAt: board.updated_at,
    cardCount: board.card_count,
  }));

  return {
    data: boards,
  };
};

const createBoard = async (payload) => {
  const result = await pool.query(
    `
    INSERT INTO boards (title, description)
    VALUES ($1, $2)
    RETURNING id, title, description, created_at, updated_at, 0::int AS card_count
    `,
    [payload.title.trim(), payload.description.trim()],
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

const getBoardDetailById = async (id) => {
  const boardResult = await pool.query(
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
    WHERE b.id = $1
    GROUP BY b.id, b.title, b.description, b.created_at, b.updated_at
    `,
    [id],
  );

  const board = boardResult.rows[0];

  if (!board) return null;

  let columns = [
    {
      id: "todo",
      status: "todo",
      title: "To do",
      cards: [],
    },
    {
      id: "doing",
      status: "doing",
      title: "Doing",
      cards: [],
    },
    {
      id: "review",
      status: "review",
      title: "Review",
      cards: [],
    },
    {
      id: "done",
      status: "done",
      title: "Done",
      cards: [],
    },
  ];

  const cardResult = await pool.query(
    `
    SELECT 
      id,
      board_id,
      title,
      description,
      status,
      position,
      created_at,
      updated_at
    FROM cards
    WHERE board_id = $1
    ORDER BY id ASC
    `,
    [id],
  );

  const cards = cardResult.rows;

  cards.forEach((card) => {
    const targetColumn = columns.find(
      (column) => column.status === card.status,
    );

    if (targetColumn) {
      targetColumn.cards.push({
        id: card.id,
        boardId: card.board_id,
        title: card.title,
        description: card.description,
        status: card.status,
        position: card.position,
        createdAt: card.created_at,
        updatedAt: card.updated_at,
      });
    }
  });

  return {
    id: board.id,
    title: board.title,
    description: board.description,
    createdAt: board.created_at,
    updatedAt: board.updated_at,
    cardCount: board.card_count,
    columns,
  };
};

const createCard = async (id, payload) => {
  const result = await pool.query(
    `
    INSERT INTO cards (title, description, status, board_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id, board_id, title, description, status, position, created_at, updated_at
    `,
    [
      payload.title.trim(),
      payload.description.trim(),
      payload.status.trim(),
      id,
    ],
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
  getAllBoards,
  createBoard,
  getBoardDetailById,
  createCard,
};

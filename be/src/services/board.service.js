const pool = require("../config/db");

const getAllBoards = async () => {
  const result = await pool.query(
    `
    SELECT id, title, description
    FROM boards
    ORDER BY id ASC
    `,
  );

  return result.rows;
};

module.exports = {
  getAllBoards,
};

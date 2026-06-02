const express = require("express");

const boardRoutes = require("./routes/board.routes");
const columnRoutes = require("./routes/column.routes");
const cardRoutes = require("./routes/card.routes");

const notFoundMiddleware = require("./middlewares/not-found.middleware");
const requestLoggerMiddleware = require("./middlewares/request-logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use(requestLoggerMiddleware);

app.use("/boards", boardRoutes);

app.use("/columns", columnRoutes);

app.use("/cards", cardRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;

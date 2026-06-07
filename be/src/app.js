const express = require("express");

const boardRoutes = require("./routes/board.routes");
const cardRoutes = require("./routes/card.routes");
const authRoutes = require("./routes/auth.routes");

const notFoundMiddleware = require("./middlewares/not-found.middleware");
const requestLoggerMiddleware = require("./middlewares/request-logger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use(requestLoggerMiddleware);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend server is running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend server is running",
  });
});

app.use("/auth", authRoutes);

app.use("/boards", boardRoutes);
app.use("/api/boards", boardRoutes);

app.use("/cards", cardRoutes);
app.use("/api/cards", cardRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;

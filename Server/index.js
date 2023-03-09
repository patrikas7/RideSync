import express from "express";
import http from "http";
import Logging from "./library/Logging.js";
import { config } from "./config/config.js";
import AuthRouter from "./routes/AuthRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
import SearchRouter from "./routes/SearchRoutes.js";
import TripRouter from "./routes/TripRoutes.js";
import mongoose from "mongoose";

const router = express();

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("connected");
    startServer();
  })
  .catch((error) => {
    Logging.error("Connection failed");
    Logging.error(error);
  });

const startServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(
        `⚡️[server]: Server is running at http://localhost:${config.server.port}`
      )
    );

  router.use("/auth", AuthRouter);
  router.use("/user", UserRouter);
  router.use("/search", SearchRouter);
  router.use("/trips", TripRouter);
};

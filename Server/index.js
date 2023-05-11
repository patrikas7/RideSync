import express from "express";
import http from "http";
// import Logging from "./library/Logging.js";
import { config } from "./config/config.js";
import AuthRouter from "./routes/AuthRoutes.js";
import UserRouter from "./routes/UserRoutes.js";
import SearchRouter from "./routes/SearchRoutes.js";
import TripRouter from "./routes/TripRoutes.js";
import TripSubscriptionRouter from "./routes/TripSubscriptionRoutes.js";
import CarServiceRouter from "./routes/CarServiceRoutes.js";
import CarRouter from "./routes/CarRoutes.js";
import TripBookmarkRouter from "./routes/TripBookmarkRoutes.js";
import NotificationRouter from "./routes/NotificationRoutes.js";
import TripSearchRequestRouter from "./routes/TripSearchRequestRoutes.js";
import ReviewRouter from "./routes/ReviewRoutes.js";
import DriverAdRouter from "./routes/DriverAdRoutes.js";
import mongoose from "mongoose";
import { chatService } from "./services/ChatService.js";
import { Server } from "socket.io";

export const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("connected");
    startServer();
    chatService(io);
  })
  .catch((error) => {
    Logging.error("Connection failed");
    Logging.error(error);
  });

const startServer = () => {
  app.use((req, res, next) => {
    // Logging.info(
    //   `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    // );

    res.on("finish", () => {
      // Logging.info(
      //   `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      // );
    });

    next();
  });

  app.use((req, res, next) => {
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

  server.listen(
    config.server.port,
    () =>
      console.log(
        `⚡️[server]: Server is running at http://localhost:${config.server.port}`
      )
    // Logging.info(
    //   `⚡️[server]: Server is running at http://localhost:${config.server.port}`
    // )
  );

  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
  app.use("/search", SearchRouter);
  app.use("/trips", TripRouter);
  app.use("/tripSubscriptions", TripSubscriptionRouter);
  app.use("/cars", CarServiceRouter);
  app.use("/car", CarRouter);
  app.use("/bookmarks", TripBookmarkRouter);
  app.use("/notifications", NotificationRouter);
  app.use("/trip-search-requests", TripSearchRequestRouter);
  app.use("/reviews", ReviewRouter);
  app.use("/driver-ad", DriverAdRouter);
};

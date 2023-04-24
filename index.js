import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sboRoutes from "./routes/sboRoutes.js";
import compression from "compression";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const corsOptions = {
  origin: "https://sbofrontend.onrender.com",
  //   origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const connect = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("DB connection successful"))
    .catch((error) => {
      throw error;
    });
};

app.use(compression());
app.use("/api/user", userRoutes);
app.use("/api/sbo", sboRoutes);
app.use("/api/auth", authRoutes);

app.listen(8080, (error) => {
  try {
    connect();
    console.log("App running on port 8080");
  } catch (error) {
    console.log(error);
  }
});

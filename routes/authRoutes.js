import express from "express";
import { signUp, login, protect } from "../controllers/authController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);

export default router;

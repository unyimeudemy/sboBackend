import express from "express";
import { protect } from "../controllers/authController.js";
import { restrictTo } from "../controllers/sboController.js";
import {
  currentUserProfile,
  feedback,
  getAllStaff,
  getStaffBySearch,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", protect, currentUserProfile);
router.get("/getAllStaff", protect, getAllStaff);
// router.get("/getAllStaff", protect, restrictTo, getAllStaff);
router.get("/getStaffBySearch", getStaffBySearch);
router.post("/feedback", feedback);

export default router;

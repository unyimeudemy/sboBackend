import express from "express";
import { protect } from "../controllers/authController.js";
import {
  fillSboStaff,
  fillSboVisitor,
  getAllMySBO,
  getAllSBO,
  restrictTo,
  filteredSBOByDepartment,
  filteredSBOByStaffNames,
  filteredSBOByTime,
  getAllSBOsByVisitors,
  filteredSBOByDetail,
} from "../controllers/sboController.js";

const router = express.Router();

router.post("/fillSboStaff", protect, fillSboStaff);
router.post("/fillSboVisitor", fillSboVisitor);
router.get("/mySBOs", protect, getAllMySBO);
// router.get("/allSBOs", protect, restrictTo, getAllSBO);
router.get("/allSBOs", protect, getAllSBO);

router.get(
  "/filteredSBOsByDepartment",
  protect,
  restrictTo,
  filteredSBOByDepartment
);

router.get(
  "/filteredSBOsByStaffName",
  protect,
  restrictTo,
  filteredSBOByStaffNames
);

router.get("/getAllSBOsByVisitors", protect, restrictTo, getAllSBOsByVisitors);

router.get("/filteredSBOsByTime", protect, restrictTo, filteredSBOByTime);

router.get("/filteredSBOsByDetail", protect, restrictTo, filteredSBOByDetail);

export default router;

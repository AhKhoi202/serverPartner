import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as statistics from "../controllers/statistics";

const router = express.Router();
// router.use(verifyToken);
router.get("/get-statistics-project", statistics.revenueStatisticsProject);
router.get(
  "/get-statistics-payment-project",
  statistics.getPaymentProjectByMonth
);

export default router;

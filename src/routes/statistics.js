import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as statistics from "../controllers/statistics";

const router = express.Router();
// router.use(verifyToken);
// tổng các giai đoạn theo thagns và năm
router.get("/get-statistics-project", statistics.revenueStatisticsProject);
// từng lần thanh toán giai đoạn theo tháng cua năm
router.get(
  "/get-statistics-payment-project",
  statistics.getPaymentProjectByMonth
);
router.get(
  "/get-statistics-partner",
  statistics.getTotalPayPartnerByMonthAndYear
);

export default router;

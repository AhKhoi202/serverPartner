import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as statistics from "../controllers/statistics";

const router = express.Router();
// router.use(verifyToken);
// tổng các giai đoạn theo năm
router.get("/get-statistics-project", statistics.revenueStatisticsProject);
// từng lần thanh toán giai đoạn theo tháng cua năm
router.get(
  "/get-statistics-payment-project",
  statistics.getPaymentProjectByMonth
);
//==================================================================
//thông tin thanh toán theo tháng và năm cho partner
router.get(
  "/get-statistics-partner",
  statistics.getTotalPayPartnerByMonthAndYear
);
// lấy thông tin từng hóa đơn thanh toán cho partner theo tháng
router.get(
  "/get-statistics-payment-partner",
  statistics.getPaymentPartnerByMonth
);
export default router;

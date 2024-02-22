import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as payment from "../controllers/payment";

const router = express.Router();

router.use(verifyToken);
router.get("/get-payment/:referralBonusesId", payment.getPaymentStages);
router.post("/post-payment-stages", payment.createPaymentStages);
router.delete("/delete-payment-stages", payment.deletePaymentStages);
router.put("/put-payment-stages", payment.updatePaymentStages);

export default router;

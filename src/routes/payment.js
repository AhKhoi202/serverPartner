import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as payment from "../controllers/payment";

const router = express.Router();

// router.use(verifyToken);
router.get("/get-payment", payment.getPaymentStages);
router.post("/post-payment-stages", payment.createPaymentStages);

export default router;

 
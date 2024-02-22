import * as payment from "../services/payment";
import db from "../models";

export const getPaymentStages = async (req, res) => {
  try {
    const referralBonusesId = req.params; // Lấy id từ request
    const response = await payment.getPaymentStages(referralBonusesId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get payment stages controller: " + error,
    });
  }
};

// tạo
export const createPaymentStages = async (req, res) => {
  try {
    const response = await payment.createPaymentStage(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at create project controller: " + error,
    });
  }
};

// xóa
export const deletePaymentStages = async (req, res) => {
  try {
    const id = req.body.id;
    const response = await payment.deletePaymentStageById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at delete payment stage controller: " + error,
    });
  }
};
export const updatePaymentStages = async (req, res) => {
  try {
    const payload = req.body.payload;
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "khong co payload",
      });
    const response = await payment.updatePaymentStage(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at update payment stage controller: " + error,
    });
  }
};

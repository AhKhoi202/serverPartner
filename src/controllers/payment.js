import * as payment from "../services/payment";
import db from "../models";

export const getPaymentStages = async (req, res) => {
  try {
    const response = await payment.getPaymentStages();
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
    // const { name, customerId, userId } = req.body;
    // if (!userId || !name || !customerId)
    //   return res.status(400).json({
    //     err: 1,
    //     msg: "missing input",
    //   });

    const response = await payment.createPaymentStage(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at create project controller: " + error,
    });
  }
};

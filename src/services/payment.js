import db from "../models";
import { v4 } from "uuid";

//lấy thông tin
export const getPaymentStages = async (...args) => {
  const whereCondition = {};
  if (args.length > 0) {
    // Xử lý các đối số đặc biệt như referralBonusesId và projectId
    args.forEach((arg) => {
      if (arg.referralBonusesId) {
        whereCondition["referralBonusesId"] = arg.referralBonusesId;
      }
      if (arg.projectId) {
        whereCondition["projectId"] = arg.projectId;
      }
    });
  }
  const response = await db.PaymentStage.findAll({
    where: whereCondition,
    raw: false,
    include: [
      {
        model: db.ReferralBonuses,
        as: "referralBonuses",
        nest: true,
      },
    ],
    ...args,
  });
  return {
    err: response ? 0 : 1,
    msg: response ? "Get PaymentStages ok" : "Failed to get PaymentStages.",
    response,
  };
};

//tạo
export const createPaymentStage = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.PaymentStage.create({
        ...body,
        id: v4(),
      });
      resolve({
        err: 0,
        msg: "Create",
      });
    } catch (error) {
      reject(error);
    }
  });

// Xóa theo id
export const deletePaymentStageById = async (id) => {
  try {
    const response = await db.PaymentStage.destroy({
      where: {
        id: id,
      },
    });
    return {
      err: response ? 0 : 1,
      msg: response
        ? "Delete PaymentStage ok"
        : "Failed to delete PaymentStage.",
    };
  } catch (error) {
    return {
      err: 1,
      msg: "Failed to delete PaymentStage.",
      error: error,
    };
  }
};

// cập nhật - hình ảnh chứng minh
export const updatePaymentStage = async (payload) => {
  try {
    const response = await db.PaymentStage.update(payload, {
      where: { id: payload.id },
      raw: true,
    });
    return {
      err: response ? 0 : 1,
      msg: response
        ? "Update PaymentProof ok"
        : "Failed to update PaymentProof.",
    };
  } catch (error) {
    return {
      err: 1,
      msg: "Failed to update PaymentProof.",
      error: error,
    };
  }
};

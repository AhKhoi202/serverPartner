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

//tạo giai đoạn thanh toán cho partner
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

// Xóa theo id giai đoạn thanh toán cho partner
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

// cập nhật - hình ảnh chứng minh giai đoạn thanh toán cho partner
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



//lấy thông tin
export const getPaymentProject = async (...args) => {
  const whereCondition = {};
  if (args.length > 0) {
    // Xử lý các đối số đặc biệt như referralBonusesId và projectId
    args.forEach((arg) => {
      if (arg.projectId) {
        whereCondition["projectId"] = arg.projectId;
      }
    });
  }
  const response = await db.PaymentProject.findAll({
    where: whereCondition,
    raw: false,
    include: [
      {
        model: db.Project,
        as: "project",
        nest: true,
      },
    ],
    ...args,
  });
  return {
    err: response ? 0 : 1,
    msg: response ? "Get PaymentProject ok" : "Failed to get PaymentProject.",
    response,
  };
};

//tạo giai đoạn thanh toán cho PaymentProject
export const createPaymentProject = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.PaymentProject.create({
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

// Xóa theo id giai đoạn thanh toán cho PaymentProject
export const deletePaymentProjectById = async (id) => {
  try {
    const response = await db.PaymentProject.destroy({
      where: {
        id: id,
      },
    });
    return {
      err: response ? 0 : 1,
      msg: response
        ? "Delete PaymentProject ok"
        : "Failed to delete PaymentProject.",
    };
  } catch (error) {
    return {
      err: 1,
      msg: "Failed to delete PaymentProject.",
      error: error,
    };
  }
};

// cập nhật - hình ảnh chứng minh giai đoạn thanh toán cho partner
export const updatePaymentProject = async (payload) => {
  try {
    const response = await db.PaymentProject.update(payload, {
      where: { id: payload.id },
      raw: true,
    });
    return {
      err: response ? 0 : 1,
      msg: response
        ? "Update PaymentProject ok"
        : "Failed to update Payment Project.",
    };
  } catch (error) {
    return {
      err: 1,
      msg: "Failed to update Payment Project.",
      error: error,
    };
  }
};

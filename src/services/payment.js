import db from "../models";
import { v4 } from "uuid";

export const getPaymentStages = async (...args) => {
  const whereCondition = {};
  if (args.length > 0) {
    // Xử lý các đối số đặc biệt như referralBonusesId và projectId
    console.log(args);

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
const db = require("../models");
import { v4 } from "uuid";

// tìm thông tin người giới thiệu liên quan
export const findReferrer = async (referralCode) => {
  try {
    const referrer = await db.ReferralCode.findOne({
      where: { code: referralCode },
    });
    let currentUser = await db.User.findOne({
      where: { id: referrer.userId },
      attributes: {
        exclude: ["password"],
      },
    });
    return currentUser ? currentUser : null; // Trả về thông tin người giới thiệu, hoặc null nếu không tìm thấy
  } catch (error) {
    console.error("Error finding referrer:", error);
    return null;
  }
};

// thêm người giới thiệu và chiết khấu vào ReferralBonuses
export const createReferralBonuses = (userId, discount, projectId, level) => {
  return new Promise(async (resolve, reject) => {
    // Kiểm tra đầu vào hợp lệ
    if (typeof discount !== "number" || discount < 0) {
      return reject(new Error("Invalid discount amount"));
    }
    try {
      const newRecord = await db.ReferralBonuses.create({
        id: v4(),
        userId: userId,
        projectId: projectId,
        referralLevel: level,
        amount: discount,
      });

      resolve({
        err: 0,
        msg: "Create",
        record: newRecord, // Trả về bản ghi đã được tạo
      });
    } catch (error) {
      console.error("Error updating database with discount:", error);
      reject(error);
    }
  });
};

// lấy thông tin chiết khấu dự án
export const getReferralBonuses = async (...args) => {
  const whereCondition = {};
  if (args.length > 0) {
    args.forEach((arg) => {
      if (arg.projectId) {
        whereCondition["projectId"] = arg.projectId;
      }
    });
  }
  const response = await db.ReferralBonuses.findAll({
    where: whereCondition,
    raw: false,
    include: [
      {
        model: db.User,
        as: "user",
        attributes: { exclude: ["password"] },
        nest: true,
      },
    ],
    ...args,
  });
  return {
    err: response ? 0 : 1,
    msg: response
      ? "Get Referral Bonuses ok"
      : "Failed to get Referral Bonuses.",
    response,
  };
};

//cập nhật mức chiết khấu ReferralBonuses
export const updateReferralBonuses = async (payload) => {
  try {
    const response = await db.ReferralBonuses.update(payload, {
      where: { id: payload.id },
      raw: true,
    });

    return {
      err: response[0] > 0 ? 0 : 1,
      msg:
        response[0] > 0
          ? "Update Referral Bonuses"
          : "Failed to update Referral Bonuses",
    };
  } catch (error) {
    throw error;
  }
};

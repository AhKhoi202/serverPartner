const db = require("../models");
import { v4 as generateId } from "uuid";

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

export const updateDatabaseWithDiscount = (
  userId,
  discount,
  projectId,
  level
) => {
  return new Promise(async (resolve, reject) => {
    // Kiểm tra đầu vào hợp lệ
    if (typeof discount !== "number" || discount < 0) {
      return reject(new Error("Invalid discount amount"));
    }

    try {
      const newRecord = await db.ReferralBonuses.create({
        id: generateId(),
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

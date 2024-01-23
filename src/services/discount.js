const db = require("../models");

export const findReferrer = async (referralCode) => {
  var referralCode = "SANGB6";
  if (!referralCode) return null;

  try {
    const referrer = await db.User.findOne({
      where: { referralCode: currentUser.referralCode },
      include: [{
        model: db.ReferralCodes,
        as: 'referral'
      }]
    });

    return referrer; // Trả về thông tin người giới thiệu, hoặc null nếu không tìm thấy
  } catch (error) {
    console.error("Error finding referrer:", error);
  }
};

export const updateDatabaseWithDiscount = async (userId, discount) => {
  // Kiểm tra đầu vào hợp lệ
  if (typeof discount !== "number" || discount < 0) {
    throw new Error("Invalid discount amount");
  }

  try {
    const referralBonus = await db.ReferralBonus.create({
      userId: userId,
      amount: discount,
      id: generateId(),
    });

    return referralBonus; // Trả về bản ghi đã được tạo hoặc cập nhật
  } catch (error) {
    // Xử lý lỗi khi cập nhật cơ sở dữ liệu
    console.error("Error updating database with discount:", error);
    throw error;
  }
}

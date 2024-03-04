import * as discounts from "../services/discount";
import db from "../models";

// tính chiết khấu cho các cấp và thêm vào database
export const calculateReferralBonuses = async (req, res) => {
  const projectId = req.body.projectId;
  const project = await db.Project.findOne({
    where: { id: projectId },
  });
  let currentUser = await db.User.findOne({
    where: { id: project.userId },
  });
  let level = 1;
  const discountRates = { 1: 4, 2: 2, 3: 1, 4: 0.5, 5: 0.5 }; // Tỷ lệ chiết khấu cho mỗi cấp
  // const discount = project.actualRevenue * discountRates[level];
  const discount = discountRates[level];
  // lưu người dùng trực tiếp giới thiệu dự án vào bảng ReferralBonuses
  const a = await discounts.createReferralBonuses(
    currentUser.id,
    discount,
    projectId,
    level
  );
  // console.log(a)
  // tìm những người giới thiệu có liên quan
  while (currentUser.referralCode && level in discountRates) {
    // láy người dùng gàn nhất
    const referrer = await discounts.findReferrer(currentUser.referralCode);
    // console.log(referrer)
    if (referrer) {
      level++;
      // tính amount của ngừi dùng liên quan theo cấp giới thiệu
      // const discount = project.actualRevenue * discountRates[level];
      const discount = discountRates[level];
      // thêm người dùng có liên quan vào bảng ReferralBonuses
      await discounts.createReferralBonuses(
        referrer.id,
        discount,
        projectId,
        level
      );
    } else {
      break; // Kết thúc vòng lặp nếu không tìm thấy người giới thiệu
    }
    currentUser = referrer;
  }
};

// thong tin người giới thiệu và chiết khấu theo dự án
export const getReferralBonusesByProjectId = async (req, res) => {
  const { projectId } = req.params;
  try {
    const response = await discounts.getReferralBonuses({
      projectId: projectId,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get Referral Bonuses controller: " + error,
    });
  }
};
// thong tin người giới thiệu và chiết khấu theo id
export const getReferralBonusesById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await discounts.getReferralBonuses({
      id: id,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get Referral Bonuses By Id controller: " + error,
    });
  }
};

// thay đổi mức chiết khấu Referral Bonuses
export const handleUpdateReferralBonuses = async (req, res) => {
  const payload = req.body;
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "khong co payload",
      });
    const response = await discounts.updateReferralBonuses(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at handleUpdateReferralBonuses controller: " + error,
    });
  }
};

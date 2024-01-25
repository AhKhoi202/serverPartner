import * as authDiscount from "../services/discount";
import db from "../models";

// tính chiết khấu cho các cấp và thêm vào database
export const calculateReferralBonuses = async (req, res) => {
  const projectId = req.body.projectId;
  const project = await db.Project.findOne({
    where: { id: projectId },
  });
  console.log(project.name);
  let currentUser = await db.User.findOne({
    where: { id: project.userId },
  });
  let level = 1;
  const discountRates = { 1: 4, 2: 2, 3: 1, 4: 0.5, 5: 0.5 }; // Tỷ lệ chiết khấu cho mỗi cấp

  // const discount = project.actualRevenue * discountRates[level];
  const discount = discountRates[level];

  console.log(currentUser.name);
  console.log(level);
  console.log(discount);
  // lưu người dùng trực tiếp giới thiệu dự án vào bảng ReferralBonuses
  await authDiscount.createReferralBonuses(
    currentUser.id,
    discount,
    projectId,
    level
  );
  // tìm những người giới thiệu có liên quan
  while (currentUser.referralCode && level in discountRates) {
    // láy người dùng gàn nhất
    const referrer = await authDiscount.findReferrer(currentUser.referralCode);
    if (referrer) {
      level++;
      // tính amount của ngừi dùng liên quan theo cấp giới thiệu
      // const discount = project.actualRevenue * discountRates[level];
      console.log(referrer.name);
      console.log(level);
      const discount = discountRates[level];
      console.log(discount);
      // thêm người dùng có liên quan vào bảng ReferralBonuses
      await authDiscount.createReferralBonuses(
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
export const getReferralBonuses = async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  try {
    const response = await authDiscount.getReferralBonuses({
      projectId: projectId,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get project progress controller: " + error,
    });
  }
};

// thay đổi mwucs chiết khấu Referral Bonuses
export const handleUpdateReferralBonuses = async (req, res) => {
  const payload = req.body;
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "khong co payload",
      });
    const response = await authDiscount.updateReferralBonuses(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at handleUpdateReferralBonuses controller: " + error,
    });
  }
};
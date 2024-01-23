import * as authDiscount from "../services/discount";
import db from "../models";

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
  const maxReferralLevel = 3; //xét đến cấp 3
  const discountRates = { 1: 0.05, 2: 0.02, 3: 0.01 }; // Tỷ lệ chiết khấu cho mỗi cấp

  const discount = project.actualRevenue * discountRates[level];
  console.log(discount);
  await authDiscount.updateDatabaseWithDiscount(
    currentUser.id,
    discount,
    projectId,
    level
  );
  console.log(level);
  console.log(currentUser.name);

  while (currentUser.referralCode && level <= maxReferralLevel) {
    const referrer = await authDiscount.findReferrer(currentUser.referralCode);
    // console.log(referrer)
    if (referrer) {
      level++;
      const discount = project.actualRevenue * discountRates[level];
      console.log(discount);
      await authDiscount.updateDatabaseWithDiscount(
        referrer.id,
        discount,
        projectId,
        level
      );
      console.log(level);
    } else {
      break; // Kết thúc vòng lặp nếu không tìm thấy người giới thiệu
    }
    currentUser = referrer;
    console.log(currentUser.name);
  }
};

import * as authDiscount from "../services/discount";

export const calculateReferralBonuses = async (projectId) => {

  const project = await db.Project.findByPk(projectId);
  let currentUser = await db.User.findByPk(project.userId);
  let level = 1;
  const maxReferralLevel = 3; //xét đến cấp 3
  const discountRates = { 1: 0.5, 2: 0.2, 3: 0.1 }; // Tỷ lệ chiết khấu cho mỗi cấp

  while (currentUser.referralCode && level <= maxReferralLevel) {
    const referrer = await authDiscount.findReferrer(currentUser.referralCode);

    if (referrer) {
      const discount = project.actualRevenue * discountRates[level] 
      await authDiscount.updateDatabaseWithDiscount(referrer.id, discount);
      level++;
    } else {
      break; // Kết thúc vòng lặp nếu không tìm thấy người giới thiệu
    }

    currentUser = referrer;
  }
}


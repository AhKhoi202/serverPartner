import db from "../models";
import { Sequelize } from "sequelize";

// thống kê thu nhập theo tháng từ hợp đồng
export const revenueStatisticsProjectByMonth = async () => {
  try {
    const result = await db.Project.findAll({
      attributes: [
        [
          Sequelize.fn("date_trunc", "month", Sequelize.col("endDate")),
          "month",
        ],
        [Sequelize.fn("SUM", Sequelize.col("actualRevenue")), "totalRevenue"],
      ],
      group: "month",
      order: [[Sequelize.col("month"), "ASC"]],
    });

    // Xử lý kết quả cho endDate null
    const modifiedResult = result.map((item) => {
      const endDate = item.getDataValue("month");
      let month = 0; // Giá trị mặc định nếu không có endDate
      if (endDate) {
        month = new Date(endDate).getMonth() + 1;
      }
      return {
        month,
        totalRevenue: item.getDataValue("totalRevenue"),
      };
    });

    return { err: 0, msg: "Success", data: modifiedResult };
  } catch (error) {
    return { err: 1, msg: error.message, data: null };
  }
};
// thu nhập theo năm  từ hợp đồng
export const revenueStatisticsProjectByYear = async () => {
  try {
    const result = await db.Project.findAll({
      attributes: [
        [Sequelize.fn("date_trunc", "year", Sequelize.col("endDate")), "year"],
        [Sequelize.fn("SUM", Sequelize.col("actualRevenue")), "totalRevenue"],
      ],
      group: "year",
      order: [[Sequelize.col("year"), "ASC"]],
    });

    // Xử lý kết quả cho endDate null
    const modifiedResult = result.map((item) => {
      const endDate = item.getDataValue("year");
      let year = 0; // Giá trị mặc định nếu không có endDate
      if (endDate) {
        year = new Date(endDate).getFullYear();
      }
      return {
        year,
        totalRevenue: item.getDataValue("totalRevenue"),
      };
    });

    return { err: 0, msg: "Success", data: modifiedResult };
  } catch (error) {
    return { err: 1, msg: error.message, data: null };
  }
};
//=======================================================================

// thống kê tổng thu nhập từ dự án theo tháng (các giai đoạn trả từ khách)
export const getTotalPayByMonthAndYear = async (year) => {
  try {
    const result = await db.PaymentProject.findAll({
      attributes: [
        // Sử dụng EXTRACT để lấy tháng và năm từ cột paymentDate
        [
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('MONTH FROM "paymentDate"')
          ),
          "month",
        ],
        [
          Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
          "year",
        ],
        [Sequelize.fn("SUM", Sequelize.col("pay")), "totalPay"],
      ],
      where: Sequelize.where(
        Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
        year
      ),
      group: [
        Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "paymentDate"')),
        Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
      ],
      order: [
        [
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('MONTH FROM "paymentDate"')
          ),
          "ASC",
        ],
      ],
    });
    return { err: 0, msg: "Success", data: result };
  } catch (error) {
    return { err: 1, msg: error.message, data: null };
  }
};
// thống kê tổng thu nhập từ dự án theo năm (các giai đoạn trả từ khách)
export const getTotalPayByYear = async (year) => {
  try {
    const result = await db.PaymentProject.findAll({
      attributes: [
        // Trích xuất năm từ cột paymentDate và nhóm theo năm
        [
          Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
          "year",
        ],
        [Sequelize.fn("SUM", Sequelize.col("pay")), "totalPay"],
      ],
      where: Sequelize.where(
        Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
        year
      ),
      group: [
        Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
      ],
    });
    return { err: 0, msg: "Success", data: result };
  } catch (error) {
    return { err: 1, msg: error.message, data: null };
  }
};
// thống kê từng lần thanh toán theo tháng
export const getPaymentProjectByMonth = async (month, year) => {
  try {
    const response = await db.PaymentProject.findAll({
      where: {
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('MONTH FROM "PaymentProject"."paymentDate"')
            ),
            "=",
            month
          ),
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('YEAR FROM "PaymentProject"."paymentDate"')
            ),
            "=",
            year
          ),
        ],
      },
      include: [
        {
          model: db.Project,
          as: "project",
          required: true,
          attributes: { exclude: ["updatedAt"] },
        },
      ],
    });
    return {
      err: response ? 0 : 1,
      msg: response
        ? "getPaymentProjectByMonth successful"
        : "getPaymentProjectByMonth not found for month " +
          month +
          " and year " +
          year,
      data: response,
    };
  } catch (error) {
    return { err: 1, msg: error.message, data: null };
  }
};
//=============================
// chiết khấu cho partner theo từng tháng
export const getTotalPayPartnerByMonthAndYear = async (year) => {
  try {
    const result = await db.PaymentStage.findAll({
      attributes: [
        // Sử dụng EXTRACT để lấy tháng và năm từ cột paymentDate
        [
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('MONTH FROM "paymentDate"')
          ),
          "month",
        ],
        [
          Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
          "year",
        ],
        [Sequelize.fn("SUM", Sequelize.col("paid")), "totalPay"],
      ],
      where: Sequelize.where(
        Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
        year
      ),
      group: [
        Sequelize.fn("EXTRACT", Sequelize.literal('MONTH FROM "paymentDate"')),
        Sequelize.fn("EXTRACT", Sequelize.literal('YEAR FROM "paymentDate"')),
      ],
      order: [
        [
          Sequelize.fn(
            "EXTRACT",
            Sequelize.literal('MONTH FROM "paymentDate"')
          ),
          "ASC",
        ],
      ],
    });
    return { err: 0, msg: "Success", data: result };
  } catch (error) {
    return { err: 1, msg: error.message, data: null };
  }
};

// thống kê từng lần thanh toán partner theo tháng
export const getPaymentPartnerByMonth = async (month, year) => {
  try {
    const response = await db.PaymentStage.findAll({
      where: {
        [Sequelize.Op.and]: [
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('MONTH FROM "PaymentStage"."paymentDate"')
            ),
            "=",
            month
          ),
          Sequelize.where(
            Sequelize.fn(
              "EXTRACT",
              Sequelize.literal('YEAR FROM "PaymentStage"."paymentDate"')
            ),
            "=",
            year
          ),
        ],
      },
      include: [
        {
          model: db.ReferralBonuses,
          as: "referralBonuses",
          required: true,
          include: [
            {
              model: db.Project,
              as: "project",
              required: true,
            },
            {
              model: db.User,
              as: "user",
              required: true,
              attributes: {
                exclude: ["password"],
              },
            },
          ],
        },
      ],
    });
    return {
      err: response ? 0 : 1,
      msg: response
        ? "getPaymentPartnerByMonth successful"
        : "getPaymentPartnerByMonth not found for month " +
          month +
          " and year " +
          year,
      data: response,
    };
  } catch (error) {
    return { err: 1, msg: error.message, data: null };
  }
};

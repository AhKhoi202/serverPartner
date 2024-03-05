import * as statistics from "../services/statistics";

// thông tin tổng thanh toán của các giai đoạn theo từng tháng và năm
export const revenueStatisticsProject = async (req, res) => {
  const year = req.query.year;
  try {
    const monthStatistics = await statistics.getTotalPayByMonthAndYear(year);
    const yearStatistics = await statistics.getTotalPayByYear(year);
    return res.status(200).json({
      monthlyRevenue: monthStatistics,
      yearlyRevenue: yearStatistics,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at revenueStatisticsProject controller: " + error,
    });
  }
};

// thống kê từng lần thanh toán theo tháng
export const getPaymentProjectByMonth = async (req, res) => {
  const month = req.query.month;
  const year = req.query.year;

  try {
    const monthStatistics = await statistics.getPaymentProjectByMonth(
      month,
      year
    );
    return res.status(200).json(monthStatistics);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at getPaymentProjectByMonth controller: " + error,
    });
  }
};

export const getTotalPayPartnerByMonthAndYear = async (req, res) => {
  const year = req.query.year;
  try {
    const monthStatistics = await statistics.getTotalPayPartnerByMonthAndYear(
      year
    );
    return res.status(200).json({
      monthlyRevenue: monthStatistics,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at getTotalPayPartnerByMonthAndYear controller: " + error,
    });
  }
};

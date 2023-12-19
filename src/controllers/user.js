import * as services from "../services/user";

export const getCurrent = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getOne(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at user controller: " + error,
    });
  }
};
// sua thong tin nguoi dung
export const updateUser = async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "khoong co payload",
      });
    const response = await services.updateUser(payload, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at edit user controller: " + error,
    });
  }
};
//tao khach hang tiem nang
export const createCustomers = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const { id } = req.user;
    if (!id || !name || !phone || !email)
      return res.status(400).json({
        err: 1,
        msg: "missing input",
      });
    const response = await services.createCustomersService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at create customers controller: " + error,
    });
  }
};
// xem thong tin khach hang da nhap
export const getCRUDCustomers = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getCustomers(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get customers controller: " + error,
    });
  }
};
// admin xem thong tin tat ca khach hang
export const getAllCustomers = async (req, res) => {
  try {
    const response = await services.getCustomersAdmin();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get customers controller: " + error,
    });
  }
};
// admin xem thong tin tat ca nguoi dung
export const getAllUser = async (req, res) => {
  try {
    const response = await services.getUser();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get customers controller: " + error,
    });
  }
};
// xoa thong tin khach hang
export const handleDeleteCustomers = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        err: 1,
        msg: "missing required parameters!",
      });
    }
    const response = await services.deleteCustomers(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at delete customers controller: " + error,
    });
  }
};
// xoa thong tin nguoi dung
export const handleDeleteUsers = async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(200).json({
        err: 1,
        msg: "missing required parameters!",
      });
    }

    // const customers = await services.findCustomersByUserId(req.body.id);
    // if (customers.length > 0) {
    //   return res.status(400).json({
    //     err: 2,
    //     msg: "Không thể xóa người dùng vì họ đang được tham chiếu trong bảng Customers.",
    //   });
    // }
    const response = await services.deleteUsers(req.body.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at delete user controller: " + error,
    });
  }
};
// sua thong tin khach hang
export const handleEditCustomers = async (req, res) => {
  const payload = req.body;
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "khoong co payload",
      });
    const response = await services.updateCustomers(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at handleEditCustomers controller: " + error,
    });
  }
};
// admin sua thong tin nguoi dung
export const handleEditUsers = async (req, res) => {
  const payload = req.body;
  try {
    if (!payload)
      return res.status(400).json({
        err: 1,
        msg: "khoong co payload",
      });
    const response = await services.updateUsers(payload);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at handleEditUsers controller: " + error,
    });
  }
};

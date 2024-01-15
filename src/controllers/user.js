import * as services from "../services/user";
import bcrypt from "bcryptjs";
import db from "../models";
import jwt from "jsonwebtoken";
import { ForgotPassword } from "../services/emailServices";

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

//forgotpassword
export const forgotPassword = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user)
      return res.status(200).json({
        err: 1,
        msg: "Không tồn tại người dùng có email trên.",
      });
    const token = jwt.sign({ id: user.id }, "jwt_secret_key", {
      expiresIn: "15m",
    });
    ForgotPassword( email, token);
    return res.status(200).json({
      err: 0,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at forgotPassword controller: " + error,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Xác thực token
    const decoded = jwt.verify(token, "jwt_secret_key");
    // Tìm kiếm người dùng bằng ID từ token
    const user = await db.User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    // Băm mật khẩu mới
    const hashedPassword = await bcrypt.hash(password, 12);
    // Cập nhật mật khẩu trong cơ sở dữ liệu
    await db.User.update(
      { password: hashedPassword },
      { where: { id: decoded.id } }
    );

    res.json({ message: "Đặt lại mật khẩu thành công." });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token không hợp lệ." });
    }
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ." });
  }
};

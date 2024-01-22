import db from "../models";
import { v4 as generateId } from "uuid";

// GET CURRENT
export const getOne = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.ReferralCode,
            as: "code", // Phải giống trong thuộc tính as của User model
            nest: true, // Biến nó thành object
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "OK" : "Failed to get .",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

// cap nhat thong tin nguoi dung
export const updateUser = (payload, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.update(payload, {
        where: { id },
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "Update" : "Failed to update user",
      });
    } catch (error) {
      reject(error);
    }
  });

// tao khach hang tiem nang
export const createCustomersService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.Customer.create({
        ...body,
        id: generateId(),
        userId,
      });
      resolve({
        err: 0,
        msg: "Create",
      });
    } catch (error) {
      reject(error);
    }
  });

// hien thi thong tin khach hang cho tung partner
export const getCustomers = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findAll({
        where: { userId },
        raw: true,
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get customers ok" : "Failed to get customers .",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

// xoa thong tin khach hang
export const deleteCustomers = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { id },
      });
      if (!response) {
        resolve({
          err: 2,
          msg: "The customer isn't exist",
          response,
        });
      }
      if (response) {
        await response.destroy();
        resolve({
          err: 0,
          msg: "The customer is delete",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

// xoa thong tin nguoi dung
export const deleteUsers = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id },
      });
      if (!response) {
        resolve({
          err: 2,
          msg: "The user isn't exist",
          response,
        });
      }
      const count = await db.Customer.count({
        where: { userId: id },
      });
      if (count > 0) {
        resolve({
          err: 3,
          msg: "Không thể xóa người dùng vì người dùng có thông tin khách hàng.",
        });
      }
      if (response) {
        await response.destroy();
        resolve({
          err: 0,
          msg: "The user is delete",
        });
      }
    } catch (error) {
      reject(error);
    }
  });

// sua thong tin khach hang
export const updateCustomers = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.update(payload, {
        where: { id: payload.id },
        raw: true,
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "Update" : "Failed to update user services",
      });
    } catch (error) {
      reject(error);
    }
  });

// hien thi thong tin tat ca cac khach hang
export const getCustomersAdmin = async () => {
  try {
    const response = await db.Customer.findAll({
      raw: false,
      include: [
        {
          model: db.User,
          as: "user", // Phải giống trong thuộc tính as của Customer model
          attributes: { exclude: ["password"] },
          nest: true, // Biến nó thành object
        },
      ],
    });

    return {
      err: response ? 0 : 1,
      msg: response ? "Get customers ok" : "Failed to get customers.",
      response,
    };
  } catch (error) {
    throw error;
  }
};

// hien thi thong tin tat ca cac người dùng
export const getUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findAll({
        raw: true,
        attributes: { exclude: ["password"] },
        include: [
          {
            model: db.Role,
            as: "role", // Phải giống trong thuộc tính as của User model
            nest: true, // Biến nó thành object
          },
          {
            model: db.ReferralCode,
            as: "referral", // Phải giống trong thuộc tính as của User model
            nest: true, // Biến nó thành object
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get user ok" : "Failed to get user services .",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

// admin sua thong tin nguoi dung
export const updateUsers = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      if (payload["role.name"]) {
        const roleId = await findRoleIdByName(payload["role.name"]);
        if (roleId) {
          payload.roleId = roleId;
        } else {
          // Xử lý trường hợp không tìm thấy Role
          throw new Error("Role not found");
        }
      }

      const response = await db.User.update(payload, {
        where: { id: payload.id },
        raw: true,
      });
      resolve({
        err: response[0] > 0 ? 0 : 1,
        msg: response[0] > 0 ? "Update" : "Failed to update user services",
      });
    } catch (error) {
      reject(error);
    }
  });

async function findRoleIdByName(roleName) {
  try {
    const role = await db.Role.findOne({
      where: { name: roleName },
    });
    return role ? role.id : null;
  } catch (error) {
    // Xử lý lỗi ở đây
    console.error("Error in findRoleIdByName:", error);
    throw error;
  }
}

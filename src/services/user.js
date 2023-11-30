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

// hien thi thong tin khach hang
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

import db from "../models";
import { v4 as generateId } from 'uuid'


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

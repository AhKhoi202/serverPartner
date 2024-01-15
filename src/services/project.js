import db from "../models";
import { v4 as generateId } from "uuid";

//tạo project
export const createProjectService = (body, userId, customerId) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.Project.create({
        ...body,
        id: generateId(),
        userId,
        customerId,
      });
      resolve({
        err: 0,
        msg: "Create",
      });
    } catch (error) {
      reject(error);
    }
  });

// get thong tin khách hàng theo id
export const getCustomerById = async (id) => {
  if (!id) {
    return {
      err: 1,
      msg: "Invalid customer ID",
      customer: null,
    };
  }

  const response = await db.Customer.findOne({ _id: id });
  return {
    err: response ? 0 : 1,
    msg: response ? "Get customer by Id successful" : "Customer not found" + id,
    customer: response,
  };
};

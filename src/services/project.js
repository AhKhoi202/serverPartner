import db from "../models";
import { v4 as generateId } from "uuid";

//tạo project
export const createProjectService = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.Project.create({
        ...body,
        id: generateId(),
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
  // console.log(id)
  if (!id) {
    return {
      err: 1,
      msg: "Invalid customer ID",
      customer: null,
    };
  }
  const response = await db.Customer.findOne({ where: { id } });
  // console.log(response)
  return {
    err: response ? 0 : 1,
    msg: response ? "Get customer by Id successful" : "Customer not found" + id,
    customer: response,
  };
};

export const getProjectsByUserId = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Project.findAll({
        where: { userId },
        raw: false,
        include: [
          {
            model: db.Customer,
            as: "customer", // Phải giống trong thuộc tính as của Customer model
            nest: true, // Biến nó thành object
          },
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Get projects ok" : "Failed to get projects.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAllProjects = async () => {
  const response = await db.Project.findAll({
    raw: false,
    include: [
      {
        model: db.User,
        as: "user", 
        nest: true, 
      },
      {
        model: db.Customer,
        as: "customer", // Phải giống trong thuộc tính as của Customer model
        nest: true, // Biến nó thành object
      },
    ],
  });
  return {
    err: response ? 0 : 1,
    msg: response ? "Get all projects ok" : "Failed to get all projects.",
    response,
  };
};


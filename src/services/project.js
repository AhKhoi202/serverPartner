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
export const getProjectById = async (id) => {
  if (!id) {
    return {
      err: 1,
      msg: "Invalid Project ID",
      project: null,
    };
  }
  const response = await db.Project.findOne({ where: { id } });
  // console.log(response)
  return {
    err: response ? 0 : 1,
    msg: response ? "Get Project by Id successful" : "Project not found" + id,
    project: response,
  };
};
// get thong tin khách hàng theo id
export const getCustomerById = async (id) => {
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

// lấy thông tin dự án theo tưng partner
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

// lấy thông tin dự án tùy theo đầu vào
export const getProjects = async (...args) => {
  // Tạo object chứa các điều kiện lọc dựa trên tham số đầu vào
  const whereCondition = {};
  if (args.length > 0) {
    // Xử lý các đối số đặc biệt như userId và projectId

    args.forEach((arg) => {
      if (arg.userId) {
        whereCondition["userId"] = arg.userId;
      }
      if (arg.projectId) {
        whereCondition["id"] = arg.projectId;
      }
      // Các điều kiện lọc khác có thể được thêm vào tại đây
    });
  }

  const response = await db.Project.findAll({
    where: whereCondition,
    raw: false,
    include: [
      {
        model: db.User,
        as: "user",
        attributes: { exclude: ["password"] },
        nest: true,
      },
      {
        model: db.Customer,
        as: "customer", // Phải giống trong thuộc tính as của Customer model
        nest: true, // Biến nó thành object
      },
    ],
    ...args,
  });
  return {
    err: response ? 0 : 1,
    msg: response ? "Get all projects ok" : "Failed to get all projects.",
    response,
  };
};

//thêm tiến độ dự án
export const updateProjectProgress = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.ProjectProgress.create({
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

// lấy tiến độ dự án
export const getProjectsProgress = async (...args) => {
  const whereCondition = {};
  if (args.length > 0) {
    args.forEach((arg) => {
      if (arg.projectId) {
        whereCondition["projectId"] = arg.projectId;
      }
    });
  }
  const response = await db.ProjectProgress.findAll({
    where: whereCondition,
    raw: false,
    ...args,
  });
  return {
    err: response ? 0 : 1,
    msg: response ? "Get all projects ok" : "Failed to get all projects.",
    response,
  };
};

export const updateProject = async (payload) => {
  try {
    const response = await db.Project.update(payload, {
      where: { id: payload.id },
      raw: true,
    });

    return {
      err: response[0] > 0 ? 0 : 1,
      msg: response[0] > 0 ? "Update" : "Failed to update project",
    };
  } catch (error) {
    throw error;
  }
};

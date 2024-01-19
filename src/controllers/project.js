import * as services from "../services/project";
import db from "../models";

export const createProject = async (req, res) => {
  try {
    const { name, customerId, userId } = req.body;
    if (!userId || !name || !customerId)
      return res.status(400).json({
        err: 1,
        msg: "missing input",
      });

    const response = await services.createProjectService(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at create project controller: " + error,
    });
  }
};

// lay thong tin khách hàng khi tạo dự án
export const getCustomerById = async (req, res) => {
  const { customerId } = req.params;
  try {
    const response = await services.getCustomerById(customerId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get customer by Id controller: " + error,
    });
  }
};

//lấy thông tin dự án theo người dùng
export const getProjectsUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getProjects({ userId: id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get project by userId controller: " + error,
    });
  }
};

//dự án cho admin
export const getAllProject = async (req, res) => {
  try {
    const response = await services.getProjects();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get project controller: " + error,
    });
  }
};

// tiến độ theo dự án
export const getProjectsProgress = async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId)
  try {
    const response = await services.getProjectsProgress({
      projectId: projectId,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get project progress controller: " + error,
    });
  }
};

export const updateProjectProgress = async (req, res) => {
  try {
    const { projectId, updateDate } = req.body;
    console.log(req.body);
    if (!projectId || !updateDate)
      return res.status(400).json({
        err: 1,
        msg: "missing input",
      });
    const response = await services.updateProjectProgress(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at create customers controller: " + error,
    });
  }
};

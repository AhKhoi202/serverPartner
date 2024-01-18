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

export const getCustomerById = async (req, res) => {
  const { customerId } = req.params;
  // console.log(customerId)
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

export const getProjectsUser = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await services.getProjects({ userId:id } );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at get project by userId controller: " + error,
    });
  }
};

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

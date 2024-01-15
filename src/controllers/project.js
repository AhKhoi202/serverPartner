import * as services from "../services/project";

export const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.user;
    const { customerId } = req.params;

    if (!userId || !name || !customerId)
      return res.status(400).json({
        err: 1,
        msg: "missing input",
      });

    const response = await services.createProjectService(
      req.body,
      userId,
      customerId
    );

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

import * as services from "../services/user";

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
      msg: "Failed at user controller: " + error,
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


// xem thong tin khach hang
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
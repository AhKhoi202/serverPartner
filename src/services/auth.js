import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = async ({
  phone,
  password,
  name,
  email,
  address,
  career,
  roleId,
}) => {
  try {
    const response = await db.User.findOrCreate({
      where: { phone },
      defaults: {
        phone,
        name,
        password: hashPassword(password),
        email,
        address,
        career,
        roleId:'r2',
        id: v4(),
      },
    });

    const token =
      response[1] &&
      jwt.sign(
        { id: response[0].id, phone: response[0].phone },
        "dkanskfsdkfsndfksnfsdf",
        { expiresIn: "2d" }
      );

    return {
      err: token ? 0 : 2,
      msg: token
        ? "Register is successfully !"
        : "Phone number has been already used !",
      token: token || null,
    };
  } catch (error) {
    throw error;
  }
};

export const loginService = async ({ phone, password }) => {
  try {
    const response = await db.User.findOne({
      where: { phone },
      raw: true,
    });

    const isCorrectPassword =
      response && bcrypt.compareSync(password, response.password);

    const token =
      isCorrectPassword &&
      jwt.sign(
        { id: response.id, phone: response.phone },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );

    return {
      err: token ? 0 : 2,
      msg: token
        ? "Login is successful!"
        : response
        ? "Password is wrong!"
        : "Phone number not found!",
      token: token || null,
    };
  } catch (error) {
    throw error;
  }
};

import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { sendSimpleEmail } from "./emailServices";

require("dotenv").config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const generateSelfReferralCode = async (input) => {
  let isUnique = false;
  let selfReferralCode;

  while (!isUnique) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(input + Date.now(), salt);
    selfReferralCode = hash.substring(hash.length - 6).toUpperCase();

    const existingCode = await db.User.findOne({ where: { selfReferralCode } });
    if (!existingCode) {
      isUnique = true;
    } else {
      input += "a";
    }
  }

  return selfReferralCode;
};

export const registerService = async ({
  phone,
  password,
  name,
  email,
  address,
  career,
  referralCode,
}) => {
  try {
    const emailExists = await db.User.findOne({ where: { email } });
    if (emailExists) {
      return { err: 1, msg: "Email đã được sử dụng." };
    }
    await sendSimpleEmail(email);

    const response = await db.User.findOrCreate({
      where: { phone },
      defaults: {
        phone,
        name,
        password: hashPassword(password),
        email,
        address,
        career,
        referralCode,
        roleId: "r2",
        id: v4(),
      },
    });
// console.log(response[0].id);
    const selfReferralCode = await generateSelfReferralCode(email);
    await db.ReferralCode.create({
      code: selfReferralCode,
      userId: response[0].id,
      id: v4(),
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

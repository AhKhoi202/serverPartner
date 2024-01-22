import db from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import { promisify } from "util";

const hashSync = promisify(bcrypt.hashSync);

const generateSelfReferralCode = async (input) => {
  try {
    let isUnique = false;
    let selfReferralCode;

    // while (!isUnique) {
      const salt = bcrypt.genSaltSync();
      const hash = await hashSync(input + Date.now(), salt);
      selfReferralCode = hash.substring(hash.length - 5).toUpperCase();

    //   const existingCode = await db.User.findOne({
    //     where: { selfReferralCode },
    //   });
    //   if (!existingCode) {
    //     isUnique = true;
    //   } else {
    //     input += "a";
    //   }
    // }

    return selfReferralCode;
  } catch (error) {
    console.error("Error generating self-referral code:", error);
    throw error;
  }
};

// Chạy hàm và in kết quả ra console
generateSelfReferralCode("khoianh202@gmai.com")
  .then((selfReferralCode) => {
    console.log("Generated Self Referral Code:", selfReferralCode);
  })
  .catch((error) => {
    console.error(error);
  });

import express from "express";
import * as userProject from "../controllers/project";

const router = express.Router();

router.post("/new-project", userProject.createProject);
router.get("/get-customer/:customerId", userProject.getCustomerById);

export default router;

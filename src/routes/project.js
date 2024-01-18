import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userProject from "../controllers/project";

const router = express.Router();
router.use(verifyToken);
router.post("/new-project", userProject.createProject);
router.get("/get-customer/:customerId", userProject.getCustomerById);
router.get("/get-projects", userProject.getProjectsUser);
router.get("/get-all-projects", userProject.getAllProject);

export default router;

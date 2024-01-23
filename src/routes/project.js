import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as project from "../controllers/project";
import * as discount from "../controllers/discount";

const router = express.Router();
router.use(verifyToken);
router.post("/new-project", project.createProject);
router.get("/get-customer/:customerId", project.getCustomerById);
router.get("/get-projects", project.getProjectsUser);
router.get("/get-all-projects", project.getAllProject);
router.post("/post-project-progress", project.updateProjectProgress);
router.get("/get-project-progress/:projectId", project.getProjectsProgress);
router.put("/put-project", project.handleEditProject);

router.post("/post-discount", discount.calculateReferralBonuses);

export default router;

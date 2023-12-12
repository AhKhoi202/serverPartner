import express from "express";
import verifyToken from "../middlewares/verifyToken";
import * as userController from "../controllers/user";

const router = express.Router();

router.put("/edit-customer", userController.handleEditCustomers);
router.put("/edit-user", userController.handleEditUsers);
router.delete("/delete-customer", userController.handleDeleteCustomers);
router.get("/get-Allcustomers", userController.getAllCustomers);
router.get("/get-Allusers", userController.getAllUser);

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);
router.put("/", userController.updateUser);
router.post("/new-customers", userController.createCustomers);
router.get("/get-customers", userController.getCRUDCustomers);

export default router;

import express from "express";
import { changePassword, createUser, logOut, loginUser } from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();



router.route("/signUp").post(createUser);
router.route("/signIn").post(loginUser);
router.route("/logout").get(isAuthenticatedUser,logOut);
// router.route("/changePassword").post(isAuthenticatedUser, changePassword);

export default router;

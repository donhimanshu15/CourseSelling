import express from "express";

import { isAuthenticatedUser } from "../middleware/auth.js";
import { createCourse, deleteCourse, getAllCourses, getCategoryOfCourse, getParticularCourse, updateCourse } from "../controllers/courseController.js";
const router = express.Router();

router.route("/createCourse").post(createCourse);
router.route("/getAllcourses").get(getAllCourses);
router.route("/updateCourse/:id").put(updateCourse);
router.route("/deleteCourse/:id").delete(deleteCourse);
router.route("/course/:id").get(getParticularCourse)
router.route("/categories").get(getCategoryOfCourse)
// router.route("/createUser").post(createUser);
// router.route("/loginUser").post(loginUser);
// router.route("/logoutUser").get(logOut);
// router.route("/changePassword").post(isAuthenticatedUser, changePassword);

export default router;

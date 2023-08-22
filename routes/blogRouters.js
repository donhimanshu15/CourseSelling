import express from "express";

import { isAuthenticatedUser } from "../middleware/auth.js";
import { createBlog, deleteBlog, getAllblogs, getOneBlog, updateBlog } from "../controllers/blogController.js";

const router = express.Router();

router.route("/blog").post(createBlog);
router.route("/blogs").get(getAllblogs);
router.route("/updateBlogs/:id").put(updateBlog);
router.route("/deleteBlog/:id").delete(deleteBlog);
router.route("/blog/:id").get(getOneBlog)

// router.route("/createUser").post(createUser);
// router.route("/loginUser").post(loginUser);
// router.route("/logoutUser").get(logOut);
// router.route("/changePassword").post(isAuthenticatedUser, changePassword);

export default router;

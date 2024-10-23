import express from "express";
const router = express.Router();
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
} from "../controllers/postsController.js";
import { createPostValidation } from "../middleware/validation.js";
import auth from "../middleware/verifyToken.js";
import { isAuthor } from "../middleware/isAuthor.js";

router.get("/", getAllPosts);
router.get("/:id", getPostById);

router.post("/", auth, createPostValidation, isAuthor, createPost);
router.delete("/:id", auth, isAuthor, deletePost);

/*  router.put("/:id", updatePost); */

export default router;

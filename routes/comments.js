import express from "express";
import auth from "../middleware/verifyToken.js";
import {
  getCommentsByPost,
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentsController.js";
import { isAuthor } from "../middleware/isAuthor.js";

const router = express.Router();

router.get("/post/:postId", getCommentsByPost);
router.post("/", auth, createComment);

router.delete("/:id", auth,isAuthor,  deleteComment);
router.put("/:id", auth, isAuthor, updateComment);

export default router;

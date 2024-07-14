import express from "express";
import auth from "../middleware/verifyToken.js";
import {
  getCommentsByPost,
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentsController.js";

const router = express.Router();

router.get("/post/:postId", getCommentsByPost);
router.post("/", auth, createComment);

router.delete("/:id", auth, deleteComment);
router.put("/:id", auth, updateComment);

export default router;

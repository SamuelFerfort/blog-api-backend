import express from "express";
import auth from "../middleware/verifyToken.js";
import { getCommentsByPost, createComment } from "../controllers/commentsController.js";

const router = express.Router();

router.get("/post/:postId", getCommentsByPost);
router.post("/", auth, createComment);

/* 
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment); */

export default router;

import express from "express";
const router = express.Router();

router.get("/post/:postId", getCommentsByPost);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;

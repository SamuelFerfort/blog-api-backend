import Comment from "../models/comment";
import {body , validationResult} from "express-validator"
export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "Author"
    );
    if (!comments) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error finding comments:", err.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }

};





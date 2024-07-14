import Comment from "../models/comment.js";

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate({
      path: "author",
      select: "name",
    });
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

export const createComment = async (req, res) => {
  const comment = new Comment({
    post: req.body.postId,
    author: req.user.id,
    content: req.body.content,
  });

  try {
    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate({
      path: "author",
      select: "name",
    });

    res.status(201).json({
      message: "Comment Created",
      success: true,
      comment: populatedComment,
    });
  } catch (err) {
    console.error("Error saving comment", err);
    res.status(400).json({ message: err });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export const updateComment = async (req, res) => {
  const { content } = req.body;

  if (!content)
    return res.status(400).json({ message: "Comment content is required" });

  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.content = content;

    await comment.save();
    res.json({
      message: "Comment updated successfully",
      comment,
      success: true,
    });
  } catch (err) {
    console.error("Error updating comment", err);

    res
      .status(500)
      .json({ message: "Error updating the comment", error: err.message });
  }
};

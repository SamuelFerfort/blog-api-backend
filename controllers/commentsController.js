import Comment from "../models/comment.js";



export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate({path: "Author", select: "name"}
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


export const createComment = async (req, res) => {

  const comment = new Comment({ 
    post: req.body.postId,
    author: req.user.id,
    content: req.body.content
  })


  try {
    await comment.save()
    res.status(201).json({message: "Comment Created", success: true, comment})
  } catch (err) {
    console.error("Error saving comment", err)
    res.status(400).json({message: err})
  }

}


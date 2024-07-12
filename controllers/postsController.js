import Post from "../models/post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (!posts) return res.status(404).json({ message: "No posts found" });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error getting all posts", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async(req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: "No posts found" });
    res.json(post)
  } catch (err) {
    console.error("Error getting post", err)
    res.status(500).json({ message: "Internal server error" });

  }
}

export const createPost = async (req, res) => {};

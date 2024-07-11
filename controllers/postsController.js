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

export const createPost = async (req, res) => {};

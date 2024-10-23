import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findMany({ published: true })

    if (!posts) return res.status(404).json({ message: "No posts found" });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error getting all posts", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: "No posts found" });
    res.json(post);
  } catch (err) {
    console.error("Error getting post", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  const { title, content, summary, mainImage, images, tags } = req.body;

  const post = {
    title,
    content,
    summary,
    mainImage,
    images,
    tags,
    authorId: req.user.id,
  }

  try {
    await post.create(post);
    res.json({ message: "Post created" });
  } catch (err) {
    console.error("Error creating post", err);
    res.status(500).json({
      message: "Error creating post",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post", err);
    res.status(500).json({
      message: "Error deleting post",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

import mongoose from "mongoose";
import User from "./models/user.js";
import Post from "./models/post.js";
import { mockPosts } from "./mockPosts.js";
import "dotenv/config";

async function populatePosts() {
  try {
    // Ensure database connection
    await mongoose.connect(process.env.DEV_DB);

    // Get all user IDs (assuming you have users in the database)
    const users = await User.find({}, "_id");
    if (users.length === 0) {
      throw new Error(
        "No users found in the database. Please add some users first."
      );
    }

    const posts = [];

    for (const mockPost of mockPosts) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const post = new Post({
        title: mockPost.title,
        content: mockPost.content,
        author: randomUser._id,
        tags: mockPost.tags,
        summary: mockPost.summary,
        mainImage: mockPost.mainImage,
        images: mockPost.images,
        comments: [],
      });

      posts.push(post);
    }

    // Save all posts
    await Post.insertMany(posts);

    console.log(`Successfully added ${posts.length} mock posts to the database.`);
  } catch (error) {
    console.error("Error populating posts:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}


populatePosts();

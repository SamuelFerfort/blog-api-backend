import mongoose from "mongoose";
import User from "./models/user.js";
import Post from "./models/post.js";
import "dotenv/config";
// Mock data
const mockTitles = [
  "The Future of AI",
  "10 Tips for Productive Coding",
  "Understanding Blockchain Technology",
  "The Rise of Remote Work",
  "Cybersecurity Best Practices",
];

const mockContents = [
  "Artificial Intelligence is rapidly evolving...",
  "Boost your coding productivity with these tips...",
  "Blockchain is a decentralized technology that...",
  "Remote work has become increasingly popular...",
  "Protecting your digital assets is crucial in today's world...",
];

const mockTags = [
  ["AI", "Technology", "Future"],
  ["Coding", "Productivity", "Development"],
  ["Blockchain", "Cryptocurrency", "Technology"],
  ["Remote Work", "Business", "Lifestyle"],
  ["Cybersecurity", "Technology", "Privacy"],
];

const mockSummaries = [
  "An exploration of AI's potential impact on various industries.",
  "Practical advice to enhance your coding efficiency and output.",
  "A comprehensive guide to understanding blockchain technology.",
  "Examining the shift towards remote work and its implications.",
  "Essential cybersecurity practices for individuals and businesses.",
];

async function populatePosts(count = 10) {
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

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * mockTitles.length);
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const post = new Post({
        title: mockTitles[randomIndex],
        content: mockContents[randomIndex],
        author: randomUser._id,
        tags: mockTags[randomIndex],
        summary: mockSummaries[randomIndex],
      });

      posts.push(post);
    }

    // Save all posts
    await Post.insertMany(posts);

    console.log(`Successfully added ${count} mock posts to the database.`);
  } catch (error) {
    console.error("Error populating posts:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}

// Usage
populatePosts(10); // This will create 20 mock posts

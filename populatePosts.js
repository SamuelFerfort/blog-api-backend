import { mockPosts } from "./mockPosts.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function populatePosts() {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      throw new Error(
        "No users found in the database. Please add some users first."
      );
    }

    for (const mockPost of mockPosts) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const post = await prisma.post.create({
        data: {
          title: mockPost.title,
          content: mockPost.content,
          authorId: randomUser.id,
          summary: mockPost.summary,
          mainImage: mockPost.mainImage,
          images: mockPost.images,
          tags: {
            connectOrCreate: mockPost.tags.map((tag) => ({
              where: { name: tag },
              create: { name: tag },
            })),
          },
        },
      });

      console.log(`Created post: ${post.title}`);
    }

    console.log(
      `Successfully added ${mockPosts.length} mock posts to the database.`
    );
  } catch (error) {
    console.error("Error populating posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

populatePosts();

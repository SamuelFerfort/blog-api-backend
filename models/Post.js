import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Post {
  static async findMany({ published = true }) {
    return prisma.post.findMany({
      where: {
        published,
      },
      include: {
        author: {
          select: { name: true },
        },
        tags: {
          select: { name: true },
        },
      },
    });
  }

  static async findById(id) {
    return prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        tags: { select: { name: true } },
      },
    });
  }

  static async create(data) {
    const { title, content, summary, mainImage, images, tags, authorId } = data;
    return prisma.post.create({
      data: {
        title,
        content,
        summary,
        mainImage,
        images,
        authorId,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  static async findByIdAndDelete(id) {
    return prisma.post.delete({ where: { id } });
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class Comment {
  static async findByPostId(postId) {
    return prisma.comment.findMany({
      where: { postId },
      include: { author: { select: { name: true } } },
    });
  }

  static async create(data) {
    const { postId, authorId, content } = data;

    return prisma.comment.create({
      data: {
        postId,
        authorId,
        content,
      },
      include: { author: { select: { name: true } } },
    });
  }

  static async findByIdAndDelete(id) {
    return prisma.comment.delete({ where: { id } });
  }

  static async findByIdAndUpdate(id, data) {
    return prisma.comment.update({
      where: { id },
      data,
      include: { author: { select: { name: true } } },
    });
  }
}

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class User {
  static async findOne({email}) {

    return prisma.user.findUnique({ where: { email } });
  }

  static async findById({id}) {
    return prisma.user.findUnique({ where: { id: id } });
  }

  static async create(userData) {
    const { email, name, password } = userData;

    return prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }
}

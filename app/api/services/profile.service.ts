// profile.service.ts
import { prisma } from "@/prisma";

export async function get(uuid?: string) {
  const where = uuid ? { uuid } : {};

  const [users, total] = await Promise.all([
    prisma.users.findMany({
      where,
      orderBy: {
        created_at: "desc",
      },
    }),
    prisma.users.count(),
  ]);

  return {
    total,
    users,
  };
}

export async function create(body: any) {
  const existingUser = await prisma.users.findUnique({
    where: { username: body.username },
  });

  if (existingUser) {
    throw new Error(`Username ${body.username} already exists`);
  }

  const user = await prisma.users.create({
    data: {
      username: body.username,
      name: body.name,
      gender: body.gender ?? null,
      location: body.location ?? null,
    },
  });

  return user;
}

import { prisma } from "@/prisma";

export async function getProfiles() {
  const users = await prisma.users.findMany({
    orderBy: {
      created_at: "desc",
    }
  });

  return {
    users,
    total: users.length,
  };
}

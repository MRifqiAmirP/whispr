import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

type RouteContext = {
  params: Promise<{
    uuid: string;
  }>;
};

// GET ONE USER
export async function GET(_: Request, context: RouteContext) {
  const { uuid } = await context.params;

  const user = await prisma.users.findUnique({
    where: { uuid },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// UPDATE USER
export async function PUT(req: Request, context: RouteContext) {
  const { uuid } = await context.params;
  const body = await req.json();

  const user = await prisma.users.update({
    where: { uuid },
    data: {
      username: body.username,
      name: body.name,
      gender: body.gender,
      location: body.location,
    },
  });

  return NextResponse.json(user);
}

// DELETE USER
export async function DELETE(_: Request, context: RouteContext) {
  const { uuid } = await context.params;

  await prisma.users.delete({
    where: { uuid },
  });

  return NextResponse.json({ message: "User deleted" });
}

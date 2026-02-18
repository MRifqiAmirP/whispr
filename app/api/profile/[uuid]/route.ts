import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

// GET ONE USER
export async function GET(
  _: Request,
  { params }: { params: { uuid: string } }
) {
  const user = await prisma.users.findUnique({
    where: { uuid: params.uuid },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// UPDATE USER
export async function PUT(
  req: Request,
  { params }: { params: { uuid: string } }
) {
  const body = await req.json();

  const user = await prisma.users.update({
    where: { uuid: params.uuid },
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
export async function DELETE(
_: Request,
  { params }: { params: { uuid: string } }
) {
  const { uuid } = params;

  await prisma.users.delete({
    where: { uuid },
  });

  return NextResponse.json({ message: "User deleted" });
}

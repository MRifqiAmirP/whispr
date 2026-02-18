import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

interface Params {
  params: {
    uuid: string;
  };
}

// GET ONE USER
export async function GET(_: Request, { params }: Params) {
  const user = await prisma.users.findUnique({
    where: { uuid: params.uuid },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// UPDATE USER
export async function PUT(req: Request, { params }: Params) {
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
  { params }: { params: Promise<{ uuid: string }> },
) {
  const { uuid } = await params;
  console.log("Deleting UUID:", uuid);

  await prisma.users.delete({
    where: { uuid },
  });

  return NextResponse.json({ message: "User deleted" });
}

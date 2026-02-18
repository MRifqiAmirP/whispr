import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import * as profileService from "../services/profile.service"

// GET ALL USERS
export async function GET() {
  const data = await profileService.get();

  return Response.json(data);
}

// CREATE USER
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await profileService.create(body);

    return NextResponse.json(user, { status: 201 });

  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
      },
      { status: 400 }
    );
  }
}

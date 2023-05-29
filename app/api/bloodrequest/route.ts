import prisma from "@/utils/client";
import { BloodRequest } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const body: BloodRequest = await request.json();
  const { name, email, phone, date, group, reason } = body;
  try {
    const bloodrequest = await prisma.bloodRequest.create({
      data: {
        name,
        email,
        date,
        group,
        phone,
        reason,
      },
    });
    return NextResponse.json(bloodrequest, { status: 500 });
  } catch (error) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (session != null) {
    const body: BloodRequest = await request.json();
    const { id, status } = body;
    try {
      const updateBloodRequest = await prisma.bloodRequest.update({
        where: {
          id,
        },
        data: {
          status: status,
        },
      });
      return NextResponse.json(updateBloodRequest, { status: 204 });
    } catch (error) {
      return NextResponse.json({ message: "server error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}

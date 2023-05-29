import prisma from "@/utils/client";
import { BloodRequest } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (session != null) {
    try {
      const requests: BloodRequest[] = await prisma.bloodRequest.findMany();
      return NextResponse.json(requests, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "server error" }, { status: 500 });
    }
  } else {
  }
}

export async function POST(request: Request) {
  const body: BloodRequest = await request.json();
  const { name, email, phone, date, group, reason, status } = body;
  try {
    const bloodrequest = await prisma.bloodRequest.create({
      data: {
        name,
        email,
        date,
        group,
        phone,
        reason,
        status: "pending",
      },
    });
    return NextResponse.json(bloodrequest, { status: 200 });
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
      return NextResponse.json(updateBloodRequest, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
}

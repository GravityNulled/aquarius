import prisma from "@/utils/client";
import { BloodRequest } from "@prisma/client";
import { NextResponse } from "next/server";

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
    console.log(bloodrequest);
    return NextResponse.json(bloodrequest);
  } catch (error) {
    return NextResponse.json({ message: "error" });
  }
}

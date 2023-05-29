import prisma from "@/utils/client";
import { Donation } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: Donation = await request.json();
  const { name, email, phone, date, age, gender, weight } = body;
  try {
    const donationRequest = await prisma.donation.create({
      data: {
        age,
        date,
        email,
        gender,
        name,
        phone,
        weight,
      },
    });
    return NextResponse.json<Donation>(donationRequest, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}

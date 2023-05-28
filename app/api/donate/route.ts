import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: IDonation = await request.json();
  const { name, email, phone, date, age, gender, weight } = body;
  return NextResponse.json<IDonation>({
    name,
    email,
    phone,
    date,
    age,
    gender,
    weight,
  });
}

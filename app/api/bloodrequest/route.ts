import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body: IBloodRequest = await request.json();
  const { name, email, phone, date, group, reason } = body;
  return NextResponse.json<IBloodRequest>({
    name,
    email,
    phone,
    date,
    group,
    reason,
  });
}

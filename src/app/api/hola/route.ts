import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = (searchParams.get("name") || "").trim();
  if (!name) return new NextResponse("Falta el nombre", { status: 400 });
  return new NextResponse(`Hola, ${name}`);
}
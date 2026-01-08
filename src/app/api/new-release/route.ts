import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = searchParams.get("pageSize") || "10";
    const res = await axios.get(
      `https://restxdb.onrender.com/api/new/1?lang=in&pageSize=${pageSize}`
    );
    if (!res.data?.success) {
      return NextResponse.json(
        { success: false, message: "failed fetch recommendation" },
        { status: 500 }
      );
    }
    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 }
    );
  }
}

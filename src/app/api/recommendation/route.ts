import axios from "axios";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const res = await axios.get(`${process.env.REST_API}/api/foryou/1?lang=in`);
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

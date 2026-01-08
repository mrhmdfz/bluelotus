import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");
    const res = await axios.get(
      `https://restxdb.onrender.com/api/chapters/${bookId}?lang=in`
    );
    if (!res.data?.success) {
      return NextResponse.json(
        { success: false, message: "failed fetch chapters" },
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

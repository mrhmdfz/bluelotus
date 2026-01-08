import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const bookId = searchParams.get("bookId");
    const chapter = searchParams.get("chapter") ?? "0";

    if (!bookId) {
      return NextResponse.json(
        { success: false, message: "bookId required" },
        { status: 400 }
      );
    }

    const res = await axios.get(
      `https://restxdb.onrender.com/api/watch/${bookId}/${chapter}?lang=in`
    );

    if (!res.data?.success) {
      return NextResponse.json(
        { success: false, message: "failed fetch stream" },
        { status: 500 }
      );
    }

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 }
    );
  }
}

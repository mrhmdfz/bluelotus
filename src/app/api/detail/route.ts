import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const ENDPOINTS = ["/api/foryou/1?lang=in", "/api/new/1", "/api/rank"];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");
    if (!bookId) {
      const res = await axios.get(`${process.env.REST_API}${ENDPOINTS[0]}`);
      if (!res.data?.success) {
        return NextResponse.json(
          { success: false, message: "Failed to fetch recommendation" },
          { status: 500 }
        );
      }
      return NextResponse.json({
        success: true,
        data: res.data.data.list ?? res.data.data,
      });
    }
    for (const endpoint of ENDPOINTS) {
      const res = await axios.get(`${process.env.REST_API}${endpoint}`);
      if (!res.data?.success) continue;

      const list = res.data.data.list ?? res.data.data;
      const detail = list.find(
        (item: any) => item.bookId.toString() === bookId
      );
      if (detail) {
        return NextResponse.json({ success: true, data: detail });
      }
    }
    return NextResponse.json(
      { success: false, message: "Book not found in any list" },
      { status: 404 }
    );
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

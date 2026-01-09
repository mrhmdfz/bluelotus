import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "suggest";

  if (!query || query.length < 3) {
    return NextResponse.json({ data: { list: [] } });
  }

  try {
    const endpoint =
      type === "search"
        ? `${process.env.REST_API}/api/search/${query}/1?lang=in`
        : `${process.env.REST_API}/api/suggest/${query}?lang=in`;

    const res = await axios.get(endpoint);
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { success: false, data: { list: [] } },
      { status: 500 }
    );
  }
}

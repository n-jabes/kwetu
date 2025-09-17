import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("kwetu_token")?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, message: "No token found" }, { status: 401 });
    }

    const apiBaseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      return NextResponse.json({ success: false, message: "API base URL not configured" }, { status: 500 });
    }

    const res = await fetch(`${apiBaseUrl}/auth/me`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch user data";
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

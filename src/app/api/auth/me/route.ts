import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("kwetu_token")?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, message: "No token found" }, { status: 401 });
    }

    const apiBaseUrl = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://kwetu-backend-ytdc.onrender.com';

    const response = await fetch(`${apiBaseUrl}/users/profile`, {
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText);
      
      return NextResponse.json({ 
        success: false, 
        message: `Backend API error: ${response.status} ${response.statusText}` 
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    console.error('Error in /api/auth/me:', error);
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch user data";
    return NextResponse.json({ 
      success: false, 
      message: `Internal server error: ${errorMessage}` 
    }, { status: 500 });
  }
}

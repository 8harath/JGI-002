import { NextRequest, NextResponse } from "next/server";
import { getSubjectFiles } from "@/lib/file-scanner";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const semesterIdStr = searchParams.get("semesterId");
    const subjectSlug = searchParams.get("subjectSlug");

    if (!semesterIdStr || !subjectSlug) {
      return NextResponse.json(
        { error: "Missing semesterId or subjectSlug parameter" },
        { status: 400 }
      );
    }

    const semesterId = parseInt(semesterIdStr, 10);

    if (isNaN(semesterId)) {
      return NextResponse.json(
        { error: "Invalid semesterId parameter" },
        { status: 400 }
      );
    }

    const categories = await getSubjectFiles(semesterId, subjectSlug);

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching subject files:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

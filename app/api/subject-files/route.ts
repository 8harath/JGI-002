import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Read the pre-generated manifest file
function getManifest() {
  const manifestPath = path.join(process.cwd(), "public", "manifest.json");
  try {
    const manifestData = fs.readFileSync(manifestPath, "utf-8");
    return JSON.parse(manifestData);
  } catch (error) {
    console.error("Error reading manifest:", error);
    return {};
  }
}

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

    // Read from the pre-generated manifest
    const manifest = getManifest();
    const key = `${semesterId}-${subjectSlug}`;
    const categories = manifest[key] || [];

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

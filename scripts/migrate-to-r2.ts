/**
 * Cloudflare R2 Migration Script
 *
 * This script uploads files from the public directory to Cloudflare R2 bucket.
 * It's designed to migrate large files that exceed Vercel's deployment size limits.
 *
 * Setup Instructions:
 * 1. Create a Cloudflare account at https://dash.cloudflare.com
 * 2. Go to R2 Object Storage and create a new bucket (e.g., "jgi-resources")
 * 3. Create API tokens with R2 read/write permissions
 * 4. Set environment variables in .env.local:
 *    - R2_ACCOUNT_ID=your_account_id
 *    - R2_ACCESS_KEY_ID=your_access_key
 *    - R2_SECRET_ACCESS_KEY=your_secret_key
 *    - R2_BUCKET_NAME=jgi-resources
 *    - R2_PUBLIC_URL=https://pub-xxxxx.r2.dev (after enabling public access)
 *
 * Usage:
 *   npx tsx scripts/migrate-to-r2.ts
 */

import { S3Client, PutObjectCommand, HeadBucketCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";

// Configuration
const R2_CONFIG = {
  accountId: process.env.R2_ACCOUNT_ID || "",
  accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  bucketName: process.env.R2_BUCKET_NAME || "jgi-resources",
};

// Validate configuration
function validateConfig() {
  const missing = [];
  if (!R2_CONFIG.accountId) missing.push("R2_ACCOUNT_ID");
  if (!R2_CONFIG.accessKeyId) missing.push("R2_ACCESS_KEY_ID");
  if (!R2_CONFIG.secretAccessKey) missing.push("R2_SECRET_ACCESS_KEY");

  if (missing.length > 0) {
    console.error("❌ Missing environment variables:", missing.join(", "));
    console.error("\nPlease set these in .env.local file:");
    console.error("  R2_ACCOUNT_ID=your_account_id");
    console.error("  R2_ACCESS_KEY_ID=your_access_key");
    console.error("  R2_SECRET_ACCESS_KEY=your_secret_key");
    console.error("  R2_BUCKET_NAME=jgi-resources");
    console.error("  R2_PUBLIC_URL=https://pub-xxxxx.r2.dev");
    process.exit(1);
  }
}

// Initialize R2 client (S3-compatible)
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_CONFIG.accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_CONFIG.accessKeyId,
    secretAccessKey: R2_CONFIG.secretAccessKey,
  },
});

// Helper: Get all files recursively
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Helper: Format file size
function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// Upload a single file to R2
async function uploadFile(localPath: string, basePath: string): Promise<void> {
  const relativePath = path.relative(basePath, localPath);
  const key = relativePath.replace(/\\/g, "/"); // Normalize path separators
  const fileContent = fs.readFileSync(localPath);
  const contentType = mime.lookup(localPath) || "application/octet-stream";
  const fileSize = fs.statSync(localPath).size;

  console.log(`📤 Uploading: ${key} (${formatSize(fileSize)})`);

  try {
    const command = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: key,
      Body: fileContent,
      ContentType: contentType,
    });

    await r2Client.send(command);
    console.log(`✅ Uploaded: ${key}`);
  } catch (error) {
    console.error(`❌ Failed to upload ${key}:`, error);
    throw error;
  }
}

// Main migration function
async function migrateToR2() {
  console.log("🚀 Starting Cloudflare R2 Migration\n");

  validateConfig();

  // Test connection
  console.log("🔗 Testing R2 connection...");
  try {
    await r2Client.send(new HeadBucketCommand({ Bucket: R2_CONFIG.bucketName }));
    console.log("✅ Connected to R2 bucket:", R2_CONFIG.bucketName);
  } catch (error) {
    console.error("❌ Failed to connect to R2:", error);
    console.error("\nMake sure:");
    console.error("1. Your bucket exists");
    console.error("2. API credentials are correct");
    console.error("3. API token has R2 read/write permissions");
    process.exit(1);
  }

  // Directory to migrate
  const sourceDir = path.join(process.cwd(), "public", "CLG STUFF!");

  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Source directory not found: ${sourceDir}`);
    process.exit(1);
  }

  console.log(`\n📁 Source directory: ${sourceDir}`);
  console.log("🔍 Scanning for files...\n");

  const files = getAllFiles(sourceDir);
  console.log(`📊 Found ${files.length} files to upload\n`);

  const totalSize = files.reduce((sum, file) => sum + fs.statSync(file).size, 0);
  console.log(`💾 Total size: ${formatSize(totalSize)}\n`);

  // Upload files
  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    try {
      await uploadFile(file, sourceDir);
      uploaded++;
    } catch (error) {
      failed++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("📊 Migration Summary");
  console.log("=".repeat(50));
  console.log(`✅ Uploaded: ${uploaded} files`);
  console.log(`❌ Failed: ${failed} files`);
  console.log(`💾 Total size: ${formatSize(totalSize)}`);
  console.log("=".repeat(50));

  if (uploaded > 0) {
    console.log("\n🎉 Migration completed!");
    console.log("\n📝 Next steps:");
    console.log("1. Enable public access for your R2 bucket in Cloudflare dashboard");
    console.log("2. Get the public URL (https://pub-xxxxx.r2.dev)");
    console.log("3. Update R2_PUBLIC_URL in .env.local");
    console.log("4. Update file paths in your code to use R2 URLs");
    console.log("5. Remove the 'public/CLG STUFF!' directory to save deployment size");
  }
}

// Run migration
migrateToR2().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});

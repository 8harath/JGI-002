# Cloudflare R2 Migration Guide

This guide will help you migrate your large files from Vercel's deployment to Cloudflare R2 for better performance and cost savings.

## Why Migrate to R2?

**Current Problem:**
- Your `public/CLG STUFF!` folder is **684MB**
- Vercel free tier limit: **100MB**
- Vercel Pro tier limit: **1GB** ($20/month)

**R2 Benefits:**
- ✅ **10GB free storage**
- ✅ **10M free reads/month**
- ✅ **Zero egress fees** (bandwidth is FREE)
- ✅ **Global CDN included**
- ✅ **S3-compatible API**
- ✅ **Works perfectly with Vercel**

## Step 1: Create Cloudflare R2 Bucket

1. **Sign up for Cloudflare** (if you don't have an account)
   - Go to https://dash.cloudflare.com/sign-up
   - Free tier is sufficient

2. **Navigate to R2**
   - In Cloudflare dashboard, click "R2" in the sidebar
   - Click "Create bucket"

3. **Create bucket**
   - Name: `jgi-resources` (or any name you prefer)
   - Location: Choose closest to your users (or "Automatic")
   - Click "Create bucket"

## Step 2: Get API Credentials

1. **Create API Token**
   - In R2 dashboard, click "Manage R2 API Tokens"
   - Click "Create API token"
   - Name: `JGI Upload`
   - Permissions: **Object Read & Write**
   - Click "Create API Token"

2. **Save Credentials**
   - Copy the following (you won't see them again):
     - **Access Key ID**
     - **Secret Access Key**
   - Also note your **Account ID** from the R2 overview page

## Step 3: Enable Public Access

1. **Configure Public Access**
   - Go to your bucket settings
   - Click "Settings" tab
   - Under "Public access", click "Allow Access"
   - Click "Connect Domain" (or use the default `r2.dev` subdomain)

2. **Get Public URL**
   - After enabling, you'll get a URL like: `https://pub-xxxxxxxxxxxxx.r2.dev`
   - Save this URL - you'll need it later

## Step 4: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your_account_id_here
R2_ACCESS_KEY_ID=your_access_key_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
R2_BUCKET_NAME=jgi-resources
R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxx.r2.dev
```

**Important:** Add `.env.local` to your `.gitignore` (should already be there)

## Step 5: Install Dependencies

```bash
npm install @aws-sdk/client-s3 mime-types tsx
npm install -D @types/mime-types
```

## Step 6: Run Migration Script

```bash
npx tsx scripts/migrate-to-r2.ts
```

This will:
- ✅ Validate your credentials
- ✅ Connect to R2
- ✅ Upload all files from `public/CLG STUFF!`
- ✅ Show progress and summary

**Expected output:**
```
🚀 Starting Cloudflare R2 Migration

🔗 Testing R2 connection...
✅ Connected to R2 bucket: jgi-resources

📁 Source directory: /path/to/public/CLG STUFF!
🔍 Scanning for files...

📊 Found 150 files to upload
💾 Total size: 684.5 MB

📤 Uploading: sem1/notes.pdf (8.2 MB)
✅ Uploaded: sem1/notes.pdf
...

📊 Migration Summary
✅ Uploaded: 150 files
❌ Failed: 0 files
💾 Total size: 684.5 MB
```

## Step 7: Update Your Code

### Option A: Create R2 Helper Utility

Create `lib/r2.ts`:

```typescript
/**
 * Get the full R2 URL for a resource path
 */
export function getR2Url(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_R2_URL || process.env.R2_PUBLIC_URL;

  if (!baseUrl) {
    console.warn('R2_PUBLIC_URL not set, falling back to local files');
    return path;
  }

  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${baseUrl}/${cleanPath}`;
}
```

### Option B: Update Resource Paths

If your resources have paths like `/CLG STUFF!/sem1/notes.pdf`, update them to use R2:

```typescript
import { getR2Url } from '@/lib/r2';

// Before
const fileUrl = resource.path;

// After
const fileUrl = getR2Url(resource.path);
```

### Option C: Update Resources Data

If you have a resources array, add an environment variable to `.env.local`:

```bash
NEXT_PUBLIC_R2_URL=https://pub-xxxxxxxxxxxxx.r2.dev
```

Then in your code:

```typescript
const resources = resourcesData.map(r => ({
  ...r,
  path: process.env.NEXT_PUBLIC_R2_URL
    ? `${process.env.NEXT_PUBLIC_R2_URL}/${r.path.replace('/CLG STUFF!/', '')}`
    : r.path
}));
```

## Step 8: Clean Up Local Files

**After verifying everything works:**

1. **Backup first** (just in case):
   ```bash
   cp -r "public/CLG STUFF!" ~/backup-clg-stuff
   ```

2. **Remove from project**:
   ```bash
   rm -rf "public/CLG STUFF!"
   ```

3. **Update .gitignore** (optional):
   ```bash
   echo "backup-clg-stuff/" >> .gitignore
   ```

This saves **684MB** from your deployment! 🎉

## Step 9: Deploy to Vercel

```bash
git add .
git commit -m "Migrate large files to Cloudflare R2"
git push origin main
```

Your Vercel deployment will now be under 100MB and much faster!

## Cost Estimate

### Cloudflare R2 (Recommended)
- **Storage:** 684MB = **$0.00/month** (within 10GB free tier)
- **Requests:** Even with 100,000 reads/month = **$0.00** (within 10M free tier)
- **Bandwidth:** Unlimited = **$0.00** (zero egress fees)
- **Total:** **$0.00/month** ✅

### Vercel (Current)
- **Free tier:** Cannot deploy (over 100MB limit)
- **Pro tier:** $20/month just to fit the files
- **Total:** **$20/month** ❌

**Savings: $20/month = $240/year!**

## Alternative Solutions

If you don't want to use R2, here are other options:

### 1. Supabase Storage
- **Free tier:** 1GB storage, 2GB bandwidth
- **Setup:** Similar to R2, but need Supabase account
- **Cost:** Free (if under 1GB)

### 2. Backblaze B2
- **Free tier:** 10GB storage, 1GB/day downloads
- **Setup:** Similar to R2 (S3-compatible)
- **Cost:** Free (within limits), then $0.005/GB

### 3. GitHub Releases
- **Free tier:** Unlimited (for public repos)
- **Max file size:** 2GB per file
- **Setup:** Manual upload to releases
- **Cost:** Free
- **Downside:** Not a CDN, slower access

### 4. Firebase Storage
- **Free tier:** 5GB storage, 1GB/day downloads
- **Setup:** Need Google/Firebase account
- **Cost:** Free (within limits)

## Troubleshooting

### Error: "Access Denied"
- Verify your API credentials are correct
- Make sure the token has "Object Read & Write" permissions
- Check that the bucket name matches

### Error: "Bucket not found"
- Verify the bucket exists in your account
- Check the bucket name in `.env.local`
- Make sure you're using the correct Account ID

### Files not accessible
- Ensure public access is enabled for the bucket
- Verify the R2_PUBLIC_URL is correct
- Check CORS settings if accessing from browser

### Large upload times
- R2 upload speeds depend on your internet connection
- For 684MB, expect 5-15 minutes on typical connections
- Consider uploading in batches if needed

## Support

- **Cloudflare R2 Docs:** https://developers.cloudflare.com/r2/
- **AWS SDK Docs:** https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/
- **Wrangler CLI:** https://developers.cloudflare.com/workers/wrangler/

---

**Questions?** Open an issue or check the Cloudflare R2 documentation.

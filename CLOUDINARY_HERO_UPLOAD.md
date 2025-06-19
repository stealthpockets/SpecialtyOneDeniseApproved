# Cloudinary Upload Instructions

## Upload Hero Images to Cloudinary

You have two options to upload the hero images to Cloudinary:

### Option 1: Manual Upload via Cloudinary Dashboard (Recommended)

1. Go to your [Cloudinary Console](https://console.cloudinary.com/)
2. Navigate to **Media Library** > **Upload**
3. Upload the following images with these exact public IDs:

**RV Parks Hero Image:**
- File: `public/assets/property-types/outdoor-hospitality-rv-park.webp`
- Public ID: `specialty-one/property-types/outdoor-hospitality-rv-park`

**Manufactured Housing Hero Image:**
- File: `public/assets/property-types/mobile-home-park-specialty-one.webp`
- Public ID: `specialty-one/property-types/mobile-home-park-specialty-one`

### Option 2: Automated Upload via Script

1. First, ensure you have your Cloudinary API credentials set up:

Create a `.env.local` file (if it doesn't exist) with:
```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

2. Run the upload script:
```bash
node upload-hero-images.js
```

## After Upload

Once the images are uploaded to Cloudinary, the hero images will automatically be served from Cloudinary with optimization (automatic format selection, quality optimization, etc.) instead of serving local files.

The mappings have already been updated in `src/lib/cloudinary.ts` to point to the new Cloudinary public IDs.

## Benefits of Using Cloudinary

- **Automatic optimization**: WebP/AVIF format selection based on browser support
- **Responsive images**: Automatic resizing for different screen sizes
- **CDN delivery**: Faster load times globally
- **Quality optimization**: Automatic quality adjustments
- **Bandwidth savings**: Reduced file sizes without quality loss


// Auto-generated upload script for missing Cloudinary images
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary (make sure your environment variables are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesToUpload = [
  "Leadership/andrew-headshot-image.webp",
  "Leadership/denise-nunez-self-storage.webp",
  "logo/logo-horizontal-blackbackground.svg",
  "logo/logo-horizontal-lightbackground.svg",
  "property-types/mobile-home-park-specialty-one.webp",
  "property-types/outdoor-hospitality-rv-park.webp",
  "property-types/self-storage-investment-arizona.webp"
];

async function uploadMissingImages() {
  console.log('🚀 Uploading missing images to Cloudinary...');
  
  for (const imagePath of imagesToUpload) {
    try {
      const localPath = path.join('./public/assets', imagePath);
      const publicId = `specialty-one/${imagePath.replace(/\.(webp|jpg|jpeg|png|svg)$/i, '')}`;
      
      console.log(`📤 Uploading: ${imagePath} → ${publicId}`);
      
      const result = await cloudinary.uploader.upload(localPath, {
        public_id: publicId,
        overwrite: true,
        resource_type: 'auto'
      });
      
      console.log(`✅ Uploaded: ${result.public_id}`);
      
    } catch (error) {
      console.error(`❌ Failed to upload ${imagePath}:`, error.message);
    }
  }
}

if (require.main === module) {
  uploadMissingImages();
}

module.exports = { uploadMissingImages };

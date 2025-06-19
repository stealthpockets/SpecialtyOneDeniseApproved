const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dzhgv6mj9',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Images that need to be uploaded to Cloudinary
const imagesToUpload = [
  {
    localPath: 'Leadership/andrew-headshot-image.webp',
    cloudinaryPath: 'specialty-one/leadership/andrew-headshot-image',
    folder: 'leadership'
  },
  {
    localPath: 'Leadership/denise-nunez-self-storage.webp',
    cloudinaryPath: 'specialty-one/leadership/denise-nunez-self-storage',
    folder: 'leadership'
  },
  {
    localPath: 'logo/logo-horizontal-blackbackground.svg',
    cloudinaryPath: 'specialty-one/logo/logo-horizontal-blackbackground',
    folder: 'logo'
  },
  {
    localPath: 'logo/logo-horizontal-lightbackground.svg',
    cloudinaryPath: 'specialty-one/logo/logo-horizontal-lightbackground',
    folder: 'logo'
  },
  {
    localPath: 'property-types/mobile-home-park-specialty-one.webp',
    cloudinaryPath: 'specialty-one/property-types/mobile-home-park-specialty-one',
    folder: 'propertyTypes'
  },
  {
    localPath: 'property-types/outdoor-hospitality-rv-park.webp',
    cloudinaryPath: 'specialty-one/property-types/outdoor-hospitality-rv-park',
    folder: 'propertyTypes'
  },
  {
    localPath: 'property-types/self-storage-investment-arizona.webp',
    cloudinaryPath: 'specialty-one/property-types/self-storage-investment-arizona',
    folder: 'propertyTypes'
  }
];

async function uploadImageToCloudinary(imageInfo) {
  const { localPath, cloudinaryPath, folder } = imageInfo;
  
  // Check if local file exists
  const actualPath = path.join(__dirname, 'public', 'assets', localPath);
  
  if (!fs.existsSync(actualPath)) {
    console.log(`❌ Local file not found: ${actualPath}`);
    return null;
  }
    if (!fs.existsSync(actualPath)) {
    console.log(`❌ Local file not found: ${actualPath}`);
    return null;
  }
  
  try {
    console.log(`📤 Uploading ${localPath} to Cloudinary...`);
    
    const result = await cloudinary.uploader.upload(actualPath, {
      public_id: cloudinaryPath,
      folder: 'specialty-one',
      resource_type: 'auto',
      overwrite: true,
      quality: 'auto',
      fetch_format: 'auto'
    });
    
    console.log(`✅ Successfully uploaded: ${localPath}`);
    console.log(`   Cloudinary URL: ${result.secure_url}`);
    console.log(`   Public ID: ${result.public_id}`);
    
    return {
      localPath,
      cloudinaryPath: result.public_id,
      url: result.secure_url,
      folder
    };
    
  } catch (error) {
    console.error(`❌ Failed to upload ${localPath}:`, error.message);
    return null;
  }
}

async function uploadAllMissingImages() {
  console.log('🚀 Starting upload of missing images to Cloudinary...\n');
  
  const results = [];
  
  for (const imageInfo of imagesToUpload) {
    const result = await uploadImageToCloudinary(imageInfo);
    if (result) {
      results.push(result);
    }
    console.log(''); // Add spacing between uploads
  }
  
  console.log('📊 UPLOAD SUMMARY:');
  console.log(`✅ Successfully uploaded: ${results.length}`);
  console.log(`❌ Failed uploads: ${imagesToUpload.length - results.length}`);
  
  if (results.length > 0) {
    console.log('\n📝 NEXT STEPS:');
    console.log('Update your Cloudinary mappings with these new uploads:');
    console.log('\nAdd to your cloudinaryMappings object:');
    
    results.forEach(result => {
      const key = result.localPath.replace(/\.(webp|svg|jpg|png)$/, '');
      console.log(`  '${key}': '${result.cloudinaryPath}',`);
    });
  }
  
  return results;
}

// Check if running directly
if (require.main === module) {
  uploadAllMissingImages()
    .then(results => {
      console.log('\n🎉 Upload process completed!');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Upload process failed:', error);
      process.exit(1);
    });
}

module.exports = { uploadAllMissingImages, imagesToUpload };

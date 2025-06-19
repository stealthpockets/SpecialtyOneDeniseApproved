const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadHeroImages() {
  try {
    console.log('Uploading hero images to Cloudinary...');
    
    // Upload RV Parks hero image
    const rvParkResult = await cloudinary.uploader.upload(
      path.join(__dirname, 'public/assets/property-types/outdoor-hospitality-rv-park.webp'),
      {
        public_id: 'specialty-one/property-types/outdoor-hospitality-rv-park',
        resource_type: 'image',
        overwrite: true,
        folder: 'specialty-one/property-types'
      }
    );
    console.log('✅ RV Parks hero image uploaded:', rvParkResult.secure_url);

    // Upload Manufactured Housing hero image
    const mhResult = await cloudinary.uploader.upload(
      path.join(__dirname, 'public/assets/property-types/mobile-home-park-specialty-one.webp'),
      {
        public_id: 'specialty-one/property-types/mobile-home-park-specialty-one',
        resource_type: 'image',
        overwrite: true,
        folder: 'specialty-one/property-types'
      }
    );
    console.log('✅ Manufactured Housing hero image uploaded:', mhResult.secure_url);

    console.log('\n🎉 All hero images uploaded successfully!');
    console.log('\nCloudinary URLs:');
    console.log('RV Parks:', rvParkResult.secure_url);
    console.log('Manufactured Housing:', mhResult.secure_url);

  } catch (error) {
    console.error('❌ Error uploading images:', error);
  }
}

uploadHeroImages();

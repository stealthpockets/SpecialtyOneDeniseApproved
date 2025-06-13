/**
 * Quick upload script for missing property type images
 */

const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

const uploadImage = async (localPath, publicId) => {
  try {
    console.log(`📤 Uploading: ${localPath} -> ${publicId}`);
    
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      resource_type: 'auto',
      overwrite: true,
      quality: 'auto',
    });
    
    console.log(`✅ Success: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
    return null;
  }
};

const uploadMissingImages = async () => {
  console.log('🚀 Uploading missing property type images...\n');
  
  const imagesToUpload = [
    // Property types that were missing
    {
      path: './public/assets/property-types/manufactured-housing-community-investment.webp',
      publicId: 'specialty-one/property-types/manufactured-housing-community-investment'
    },
    {
      path: './public/assets/property-types/rv-park-investment-opportunity.webp', 
      publicId: 'specialty-one/property-types/rv-park-investment-opportunity'
    },
    {
      path: './public/assets/property-types/self-storage-facility-investment.webp',
      publicId: 'specialty-one/property-types/self-storage-facility-investment'
    },
    {
      path: './public/assets/property-types/self-storage-investment-arizona.webp',
      publicId: 'specialty-one/property-types/self-storage-investment-arizona'
    },
    // Additional property types that may be missing
    {
      path: './public/assets/property-types/parkmodel_rv_park_apache_junction_arizona.webp',
      publicId: 'specialty-one/property-types/parkmodel_rv_park_apache_junction_arizona'
    },
    {
      path: './public/assets/property-types/rv_park_mhp_resort_apache_junction.webp',
      publicId: 'specialty-one/property-types/rv_park_mhp_resort_apache_junction'
    },
    {
      path: './public/assets/property-types/rv_park_resort_arizona.webp',
      publicId: 'specialty-one/property-types/rv_park_resort_arizona'
    },
    {
      path: './public/assets/property-types/mh_park_apache_junction_arizona.webp',
      publicId: 'specialty-one/property-types/mh_park_apache_junction_arizona'
    },
    // Logo assets
    {
      path: './public/assets/logo/logo-horizontal-lightbackground.svg',
      publicId: 'specialty-one/logo/logo-horizontal-lightbackground'
    },
    {
      path: './public/assets/logo/logo-horizontal-blackbackground.svg',
      publicId: 'specialty-one/logo/logo-horizontal-blackbackground'
    },
    // Success stories that were missing
    {
      path: './public/assets/success-stories/caravan-oasis.webp',
      publicId: 'specialty-one/success-stories/caravan-oasis'
    },
    {
      path: './public/assets/success-stories/desert-trails.webp', 
      publicId: 'specialty-one/success-stories/desert-trails'
    },
    {
      path: './public/assets/success-stories/the-palms.webp',
      publicId: 'specialty-one/success-stories/the-palms'
    },
    {
      path: './public/assets/success-stories/confidential-rv-resort.webp',
      publicId: 'specialty-one/success-stories/confidential-rv-resort'
    },
    {
      path: './public/assets/success-stories/desert-retreat.webp',
      publicId: 'specialty-one/success-stories/desert-retreat'
    },
    {
      path: './public/assets/success-stories/mogollon-rv.webp',
      publicId: 'specialty-one/success-stories/mogollon-rv'
    }
  ];
  
  let uploadCount = 0;
  for (const image of imagesToUpload) {
    const result = await uploadImage(image.path, image.publicId);
    if (result) uploadCount++;
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n📊 Uploaded ${uploadCount}/${imagesToUpload.length} images`);
  console.log('🎉 Check your site now - images should load from Cloudinary!');
};

uploadMissingImages().catch(console.error);

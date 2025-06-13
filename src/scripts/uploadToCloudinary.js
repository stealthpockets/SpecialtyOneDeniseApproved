/**
 * Cloudinary Asset Upload Script
 * 
 * This script uploads all existing assets from the Public/assets directory
 * to Cloudinary using the folder structure defined in CLOUDINARY_MAPPINGS.
 * 
 * Prerequisites:
 * - npm install cloudinary (if not using with Node.js admin SDK)
 * - Set environment variables in .env file
 * 
 * Usage:
 * node src/scripts/uploadToCloudinary.js
 */

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

// Asset mapping - matches CLOUDINARY_MAPPINGS from cloudinary.ts
const ASSET_MAPPINGS = {
  // Leadership photos
  'Leadership/andrew-headshot-image.webp': 'specialty-one/leadership/andrew-headshot-image',
  'Leadership/denise-nunez-self-storage.webp': 'specialty-one/leadership/denise-nunez-self-storage',
  
  // Property types
  'property-types/manufactured-housing-community-investment.webp': 'specialty-one/property-types/manufactured-housing-community-investment',
  'property-types/manufactured-housing-community-investment.jpg': 'specialty-one/property-types/manufactured-housing-community-investment',
  'property-types/rv-park-investment.webp': 'specialty-one/property-types/rv-park-investment',
  'property-types/rv-park-investment-opportunity.webp': 'specialty-one/property-types/rv-park-investment-opportunity',
  'property-types/rv-park-investment-opportunity.jpg': 'specialty-one/property-types/rv-park-investment-opportunity',
  'property-types/self-storage-facility-investment.webp': 'specialty-one/property-types/self-storage-facility-investment',
  'property-types/self-storage-facility-investment.jpg': 'specialty-one/property-types/self-storage-facility-investment',
  'property-types/storage_facility_modern_arizona.webp': 'specialty-one/property-types/storage_facility_modern_arizona',
  'property-types/rv_resort_investment_arizona.webp': 'specialty-one/property-types/rv_resort_investment_arizona',
  'property-types/rv_resort_arizona_investment.jpg': 'specialty-one/property-types/rv_resort_arizona_investment',
  'property-types/parkmodel_rv_park_apache_junction_arizona.webp': 'specialty-one/property-types/parkmodel_rv_park_apache_junction_arizona',
  'property-types/confidential-200+site-MHC-Sun_Valley.webp': 'specialty-one/property-types/confidential-200-site-MHC-Sun_Valley',
  'property-types/self-storage-investment-arizona.webp': 'specialty-one/property-types/self-storage-investment-arizona',
  'property-types/self-storage-investment-arizona.jpg': 'specialty-one/property-types/self-storage-investment-arizona',
  'property-types/rv_park_mhp_resort_apache_junction.webp': 'specialty-one/property-types/rv_park_mhp_resort_apache_junction',
  'property-types/rv_park_mhp_resort_apache_junction.jpg': 'specialty-one/property-types/rv_park_mhp_resort_apache_junction',
  'property-types/mh_park_apache_junction_arizona.webp': 'specialty-one/property-types/mh_park_apache_junction_arizona',
  'property-types/mhp_arizona_pueblo_mobile_manor.webp': 'specialty-one/property-types/mhp_arizona_pueblo_mobile_manor',
  'property-types/rv_resort_arizona.webp': 'specialty-one/property-types/rv_resort_arizona',
  
  // Success stories
  'success-stories/american-ss-mail.webp': 'specialty-one/success-stories/american-ss-mail',
  'success-stories/american-ss-mail.jpg': 'specialty-one/success-stories/american-ss-mail',
  'success-stories/caravan-oasis.webp': 'specialty-one/success-stories/caravan-oasis',
  'success-stories/caravan-oasis.jpg': 'specialty-one/success-stories/caravan-oasis',
  'success-stories/confidential-mhc-buyer.webp': 'specialty-one/success-stories/confidential-mhc-buyer',
  'success-stories/confidential-mhc-buyer.jpg': 'specialty-one/success-stories/confidential-mhc-buyer',
  'success-stories/confidential-rv-resort.webp': 'specialty-one/success-stories/confidential-rv-resort',
  'success-stories/confidential-rv-resort.jpg': 'specialty-one/success-stories/confidential-rv-resort',
  'success-stories/desert-retreat.webp': 'specialty-one/success-stories/desert-retreat',
  'success-stories/desert-retreat.jpg': 'specialty-one/success-stories/desert-retreat',
  'success-stories/desert-trails.webp': 'specialty-one/success-stories/desert-trails',
  'success-stories/desert-trails.jpg': 'specialty-one/success-stories/desert-trails',
  'success-stories/mogollon-rv.webp': 'specialty-one/success-stories/mogollon-rv',
  'success-stories/mogollon-rv.jpg': 'specialty-one/success-stories/mogollon-rv',
  'success-stories/the-palms.webp': 'specialty-one/success-stories/the-palms',
  'success-stories/the-palms.jpg': 'specialty-one/success-stories/the-palms',
  
  // Logo assets
  'logo/logo-horizontal-blackbackground.svg': 'specialty-one/logo/logo-horizontal-blackbackground',
  'logo/logo-horizontal-lightbackground.svg': 'specialty-one/logo/logo-horizontal-lightbackground',
  'logo/Logo-icon-blackbackground.svg': 'specialty-one/logo/Logo-icon-blackbackground',
  'logo/logo-icon-lightbackground.svg': 'specialty-one/logo/logo-icon-lightbackground',
  'logo/logo-vertical-blackbackground.svg': 'specialty-one/logo/logo-vertical-blackbackground',
  'logo/logo-vertical-lightbackgroung.svg': 'specialty-one/logo/logo-vertical-lightbackground',
};

/**
 * Upload a single file to Cloudinary
 */
const uploadFile = async (localPath, publicId) => {
  try {
    console.log(`📤 Uploading: ${localPath} -> ${publicId}`);
    
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      resource_type: 'auto', // Automatically detect file type
      overwrite: true, // Replace if exists
      quality: 'auto', // Optimize quality
      format: 'auto', // Auto-select best format
    });
    
    console.log(`✅ Success: ${result.secure_url}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to upload ${localPath}:`, error.message);
    return null;
  }
};

/**
 * Main upload function
 */
const uploadAssets = async () => {
  console.log('🚀 Starting Cloudinary asset upload...\n');
  
  // Get project root directory
  const projectRoot = path.resolve(__dirname, '../../..');
  const publicAssetsDir = path.join(projectRoot, 'Public', 'assets');
  
  console.log(`📁 Assets directory: ${publicAssetsDir}\n`);
  
  let uploadCount = 0;
  let errorCount = 0;
  
  // Process each asset mapping
  for (const [relativePath, publicId] of Object.entries(ASSET_MAPPINGS)) {
    const fullPath = path.join(publicAssetsDir, relativePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${relativePath}`);
      continue;
    }
    
    const result = await uploadFile(fullPath, publicId);
    if (result) {
      uploadCount++;
    } else {
      errorCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n📊 Upload Summary:');
  console.log(`✅ Successful uploads: ${uploadCount}`);
  console.log(`❌ Failed uploads: ${errorCount}`);
  console.log(`📋 Total processed: ${uploadCount + errorCount}`);
  
  if (uploadCount > 0) {
    console.log('\n🎉 Upload complete! Your images are now available on Cloudinary.');
    console.log('📝 You can view them in your Cloudinary dashboard:');
    console.log(`   https://cloudinary.com/console/media_library/folders/specialty-one`);
  }
};

/**
 * Verify Cloudinary configuration
 */
const verifyConfig = () => {
  const { cloud_name, api_key, api_secret } = cloudinary.config();
  
  if (!cloud_name || !api_key || !api_secret) {
    console.error('❌ Cloudinary configuration missing!');
    console.error('Please ensure your .env file contains:');
    console.error('- VITE_CLOUDINARY_CLOUD_NAME');
    console.error('- VITE_CLOUDINARY_API_KEY');
    console.error('- VITE_CLOUDINARY_API_SECRET');
    process.exit(1);
  }
  
  console.log(`✅ Cloudinary configured for: ${cloud_name}`);
};

// Run the upload
if (import.meta.url === `file://${process.argv[1]}`) {
  verifyConfig();
  uploadAssets().catch(console.error);
}

export { uploadAssets, uploadFile };

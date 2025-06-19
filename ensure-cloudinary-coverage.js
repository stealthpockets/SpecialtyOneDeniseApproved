/**
 * Ensure Cloudinary Coverage Script
 * This script identifies images being used locally and ensures they are uploaded to Cloudinary
 * NEVER removes images that are actively being used in the codebase
 */

const fs = require('fs');
const path = require('path');

// Import the analysis from the existing script
const { analyzeCloudinaryUsage } = require('./analyze-cloudinary-usage.cjs');

function generateCloudinaryUploadScript() {
  console.log('🔍 Analyzing current Cloudinary coverage...\n');
  
  const analysis = analyzeCloudinaryUsage();
  
  console.log('\n📋 ENSURING ALL ACTIVE IMAGES ARE COVERED:\n');
  
  if (analysis.usedButNotMapped.length > 0) {
    console.log('🚨 CRITICAL: These images are being used but NOT in Cloudinary:');
    console.log('These MUST be uploaded to Cloudinary to avoid broken images!\n');
    
    const uploadCommands = [];
    const mappingUpdates = [];
    
    analysis.usedButNotMapped.forEach(imagePath => {
      console.log(`  📸 ${imagePath}`);
      
      // Generate Cloudinary public_id based on the path
      const publicId = `specialty-one/${imagePath.replace(/\.(webp|jpg|jpeg|png|svg)$/i, '')}`;
      
      // Generate upload command
      const fullPath = `./public/assets/${imagePath}`;
      uploadCommands.push(`cloudinary uploader upload "${fullPath}" public_id="${publicId}"`);
      
      // Generate mapping for cloudinary.ts
      const category = determineCategoryFromPath(imagePath);
      mappingUpdates.push({
        path: imagePath,
        publicId: publicId,
        category: category
      });
    });
    
    console.log('\n🔧 REQUIRED ACTIONS:\n');
    
    console.log('1. Upload these images to Cloudinary:');
    uploadCommands.forEach(cmd => {
      console.log(`   ${cmd}`);
    });
    
    console.log('\n2. Add these mappings to src/lib/cloudinary.ts:');
    const mappingsByCategory = {};
    mappingUpdates.forEach(mapping => {
      if (!mappingsByCategory[mapping.category]) {
        mappingsByCategory[mapping.category] = [];
      }
      mappingsByCategory[mapping.category].push(mapping);
    });
    
    Object.entries(mappingsByCategory).forEach(([category, mappings]) => {
      console.log(`\n   // Add to ${category} category:`);
      mappings.forEach(mapping => {
        console.log(`   '${mapping.path}': '${mapping.publicId}',`);
      });
    });
    
    // Generate upload script
    generateNodeUploadScript(analysis.usedButNotMapped);
    
  } else {
    console.log('✅ All actively used images are already covered by Cloudinary!');
  }
  
  // Handle potentially unused images (be very careful here)
  if (analysis.unusedImages.length > 0) {
    console.log('\n⚠️ POTENTIALLY UNUSED IMAGES (Review before removing):');
    console.log('These images are not referenced in code, but review carefully:');
    
    const safeToRemove = [];
    const requiresReview = [];
    
    analysis.unusedImages.forEach(imagePath => {
      // Favicon files should never be removed
      if (imagePath.includes('favicon/')) {
        requiresReview.push({ path: imagePath, reason: 'Favicon - keep' });
      }
      // Logo files should be kept unless confirmed unused
      else if (imagePath.includes('logo/')) {
        requiresReview.push({ path: imagePath, reason: 'Logo - review usage' });
      }
      // Duplicate format files (jpg versions of webp files)
      else if (imagePath.endsWith('.jpg') && 
               analysis.unusedImages.includes(imagePath.replace('.jpg', '.webp'))) {
        safeToRemove.push({ path: imagePath, reason: 'Duplicate format (webp exists)' });
      }
      else {
        requiresReview.push({ path: imagePath, reason: 'Manual review needed' });
      }
    });
    
    if (safeToRemove.length > 0) {
      console.log('\n🗑️ Likely safe to remove (duplicate formats):');
      safeToRemove.forEach(item => {
        console.log(`   ${item.path} - ${item.reason}`);
      });
    }
    
    console.log('\n📋 Requires manual review:');
    requiresReview.forEach(item => {
      console.log(`   ${item.path} - ${item.reason}`);
    });
  }
  
  return analysis;
}

function determineCategoryFromPath(imagePath) {
  const pathLower = imagePath.toLowerCase();
  
  if (pathLower.includes('leadership/')) return 'leadership';
  if (pathLower.includes('logo/')) return 'branding';
  if (pathLower.includes('property-types/')) return 'propertyTypes';
  if (pathLower.includes('success-stories/')) return 'successStories';
  if (pathLower.includes('insights/')) return 'insights';
  if (pathLower.includes('favicon/')) return 'branding';
  
  return 'misc';
}

function generateNodeUploadScript(imagesToUpload) {
  console.log('\n📝 Generating automated upload script...');
  
  const script = `
// Auto-generated upload script for missing Cloudinary images
const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configure Cloudinary (make sure your environment variables are set)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagesToUpload = ${JSON.stringify(imagesToUpload, null, 2)};

async function uploadMissingImages() {
  console.log('🚀 Uploading missing images to Cloudinary...');
  
  for (const imagePath of imagesToUpload) {
    try {
      const localPath = path.join('./public/assets', imagePath);
      const publicId = \`specialty-one/\${imagePath.replace(/\\.(webp|jpg|jpeg|png|svg)$/i, '')}\`;
      
      console.log(\`📤 Uploading: \${imagePath} → \${publicId}\`);
      
      const result = await cloudinary.uploader.upload(localPath, {
        public_id: publicId,
        overwrite: true,
        resource_type: 'auto'
      });
      
      console.log(\`✅ Uploaded: \${result.public_id}\`);
      
    } catch (error) {
      console.error(\`❌ Failed to upload \${imagePath}:\`, error.message);
    }
  }
}

if (require.main === module) {
  uploadMissingImages();
}

module.exports = { uploadMissingImages };
`;
  
  fs.writeFileSync('./upload-missing-images.js', script);
  console.log('📁 Created upload-missing-images.js');
}

// Run the analysis
if (require.main === module) {
  try {
    generateCloudinaryUploadScript();
  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
  }
}

module.exports = { generateCloudinaryUploadScript };

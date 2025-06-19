/**
 * Cloudinary Usage Analyzer
 * Analyzes which images are being used through Cloudinary vs local assets
 * and identifies potentially unused images
 */

const fs = require('fs');
const path = require('path');

// Import the mappings from the cloudinary config
const cloudinaryMappingsPath = './src/lib/cloudinary.ts';

// Get all image files in public/assets
function getAllImageFiles() {
  const assetsDir = './public/assets';
  const imageFiles = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (/\.(webp|jpg|jpeg|png|svg)$/i.test(item)) {
        // Convert to relative path from public/assets
        const relativePath = path.relative(assetsDir, fullPath).replace(/\\/g, '/');
        imageFiles.push(relativePath);
      }
    });
  }
  
  scanDirectory(assetsDir);
  return imageFiles;
}

// Extract Cloudinary mappings from the TypeScript file
function getCloudinaryMappings() {
  const cloudinaryContent = fs.readFileSync(cloudinaryMappingsPath, 'utf8');
  
  // Extract the mappings from the CLOUDINARY_MAPPINGS object
  const mappingsMatch = cloudinaryContent.match(/export const CLOUDINARY_MAPPINGS = \{([\s\S]*?)\};/);
  if (!mappingsMatch) {
    console.error('Could not find CLOUDINARY_MAPPINGS in cloudinary.ts');
    return {};
  }
  
  const mappingsContent = mappingsMatch[1];
  const allMappings = {};
  
  // Parse each category and its mappings
  const categoryRegex = /(\w+):\s*\{([^}]+)\}/g;
  let categoryMatch;
  
  while ((categoryMatch = categoryRegex.exec(mappingsContent)) !== null) {
    const categoryName = categoryMatch[1];
    const categoryContent = categoryMatch[2];
    
    // Extract key-value pairs from each category
    const mappingRegex = ['\'([^\']+)\':\\s*\'([^\']+)\''].join('|');
    const mappingPattern = new RegExp(mappingRegex, 'g');
    let mappingMatch;
    
    while ((mappingMatch = mappingPattern.exec(categoryContent)) !== null) {
      const localPath = mappingMatch[1];
      const cloudinaryId = mappingMatch[2];
      
      allMappings[localPath] = {
        cloudinaryId,
        category: categoryName
      };
    }
  }
  
  return allMappings;
}

// Analyze code usage of images
function getUsedImages() {
  const usedImages = new Set();
  
  // Scan for CloudinaryImage, PropertyImage, ProfileImage usage
  function scanFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Look for localPath props
    const localPathRegex = /localPath=['"](.*?)['"]|src=['"](.*?)['"]|fallbackSrc=['"](.*?)['"]/g;
    let match;
    
    while ((match = localPathRegex.exec(content)) !== null) {
      const imagePath = match[1] || match[2] || match[3];
      if (imagePath && imagePath.includes('assets/')) {
        // Normalize the path
        let normalizedPath = imagePath.replace('/assets/', '').replace('assets/', '');
        if (normalizedPath.startsWith('/')) {
          normalizedPath = normalizedPath.substring(1);
        }
        usedImages.add(normalizedPath);
      }
    }
    
    // Look for direct img src usage
    const imgRegex = /<img[^>]+src=['"](.*?)['"][^>]*>/g;
    while ((match = imgRegex.exec(content)) !== null) {
      const imagePath = match[1];
      if (imagePath && imagePath.includes('assets/')) {
        let normalizedPath = imagePath.replace('/assets/', '').replace('assets/', '');
        if (normalizedPath.startsWith('/')) {
          normalizedPath = normalizedPath.substring(1);
        }
        usedImages.add(normalizedPath);
      }
    }
  }
  
  // Scan all TypeScript/JSX files
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
        scanDirectory(fullPath);
      } else if (/\.(tsx?|jsx?)$/.test(item)) {
        scanFile(fullPath);
      }
    });
  }
  
  scanDirectory('./src');
  return usedImages;
}

// Main analysis function
function analyzeCloudinaryUsage() {
  console.log('🔍 Analyzing Cloudinary usage...\n');
  
  const allImageFiles = getAllImageFiles();
  const cloudinaryMappings = getCloudinaryMappings();
  const usedImages = getUsedImages();
  
  console.log(`📁 Total image files found: ${allImageFiles.length}`);
  console.log(`🔗 Cloudinary mappings defined: ${Object.keys(cloudinaryMappings).length}`);
  console.log(`💻 Images referenced in code: ${usedImages.size}\n`);
  
  // Categorize images
  const mappedToCloudinary = [];
  const usedButNotMapped = [];
  const mappedButNotUsed = [];
  const unusedImages = [];
  
  // Check which images are mapped to Cloudinary
  allImageFiles.forEach(imagePath => {
    const isMapped = cloudinaryMappings[imagePath];
    const isUsed = usedImages.has(imagePath);
    
    if (isMapped && isUsed) {
      mappedToCloudinary.push({
        path: imagePath,
        cloudinaryId: isMapped.cloudinaryId,
        category: isMapped.category
      });
    } else if (isMapped && !isUsed) {
      mappedButNotUsed.push({
        path: imagePath,
        cloudinaryId: isMapped.cloudinaryId,
        category: isMapped.category
      });
    } else if (!isMapped && isUsed) {
      usedButNotMapped.push(imagePath);
    } else if (!isMapped && !isUsed) {
      unusedImages.push(imagePath);
    }
  });
  
  // Print results
  console.log('✅ IMAGES USING CLOUDINARY:');
  console.log(`${mappedToCloudinary.length} images are mapped and being used through Cloudinary`);
  mappedToCloudinary.forEach(img => {
    console.log(`  📸 ${img.path} → ${img.cloudinaryId} (${img.category})`);
  });
  
  console.log('\n⚠️ IMAGES MAPPED BUT NOT USED:');
  console.log(`${mappedButNotUsed.length} images are mapped to Cloudinary but not referenced in code`);
  mappedButNotUsed.forEach(img => {
    console.log(`  🔗 ${img.path} → ${img.cloudinaryId} (${img.category})`);
  });
  
  console.log('\n❌ IMAGES USED BUT NOT MAPPED:');
  console.log(`${usedButNotMapped.length} images are used in code but not mapped to Cloudinary`);
  usedButNotMapped.forEach(imagePath => {
    console.log(`  📱 ${imagePath}`);
  });
  
  console.log('\n🗑️ POTENTIALLY UNUSED IMAGES:');
  console.log(`${unusedImages.length} images are not mapped and not referenced in code`);
  unusedImages.forEach(imagePath => {
    console.log(`  🚮 ${imagePath}`);
  });
  
  // Summary
  console.log('\n📊 SUMMARY:');
  console.log(`✅ Cloudinary optimized: ${mappedToCloudinary.length}`);
  console.log(`⚠️ Mapped but unused: ${mappedButNotUsed.length}`);
  console.log(`❌ Used but not optimized: ${usedButNotMapped.length}`);
  console.log(`🗑️ Potentially unused: ${unusedImages.length}`);
  
  const optimizationRate = Math.round((mappedToCloudinary.length / (mappedToCloudinary.length + usedButNotMapped.length)) * 100);
  console.log(`📈 Cloudinary optimization rate: ${optimizationRate}%`);
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  if (mappedButNotUsed.length > 0) {
    console.log(`• Consider removing ${mappedButNotUsed.length} unused Cloudinary mappings to reduce complexity`);
  }
  if (usedButNotMapped.length > 0) {
    console.log(`• Map ${usedButNotMapped.length} images to Cloudinary for better performance`);
  }
  if (unusedImages.length > 0) {
    console.log(`• Review and potentially delete ${unusedImages.length} unused image files to reduce bundle size`);
  }
  
  return {
    mappedToCloudinary,
    mappedButNotUsed,
    usedButNotMapped,
    unusedImages,
    optimizationRate
  };
}

// Run the analysis
if (require.main === module) {
  try {
    analyzeCloudinaryUsage();
  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

module.exports = { analyzeCloudinaryUsage };

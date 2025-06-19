/**
 * Detailed Image Usage Analysis for Cloudinary
 * This script provides a comprehensive analysis of image usage
 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Read the Cloudinary mappings from cloudinary.ts
function getCloudinaryMappings() {
  try {
    const content = fs.readFileSync('./src/lib/cloudinary.ts', 'utf8');
    
    // Extract all mappings from CLOUDINARY_MAPPINGS
    const mappings = {};
    
    // Parse leadership mappings
    const leadershipMatch = content.match(/leadership:\s*\{([^}]+)\}/);
    if (leadershipMatch) {
      const leadershipContent = leadershipMatch[1];
      const matches = leadershipContent.matchAll(/'([^']+)':\s*'([^']+)'/g);
      for (const match of matches) {
        mappings[`Leadership/${match[1]}`] = match[2];
      }
    }
    
    // Parse property types mappings
    const propertyMatch = content.match(/propertyTypes:\s*\{([^}]+)\}/);
    if (propertyMatch) {
      const propertyContent = propertyMatch[1];
      const matches = propertyContent.matchAll(/'([^']+)':\s*'([^']+)'/g);
      for (const match of matches) {
        mappings[`property-types/${match[1]}`] = match[2];
      }
    }
    
    // Parse success stories mappings
    const successMatch = content.match(/successStories:\s*\{([^}]+)\}/);
    if (successMatch) {
      const successContent = successMatch[1];
      const matches = successContent.matchAll(/'([^']+)':\s*'([^']+)'/g);
      for (const match of matches) {
        mappings[`success-stories/${match[1]}`] = match[2];
      }
    }
    
    // Parse logo mappings
    const logoMatch = content.match(/logo:\s*\{([^}]+)\}/);
    if (logoMatch) {
      const logoContent = logoMatch[1];
      const matches = logoContent.matchAll(/'([^']+)':\s*'([^']+)'/g);
      for (const match of matches) {
        mappings[`logo/${match[1]}`] = match[2];
      }
    }
    
    return mappings;
  } catch (error) {
    console.error('Error reading cloudinary mappings:', error.message);
    return {};
  }
}

// Find all image references in code
function findImageReferences() {
  const references = new Set();
  
  function scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Look for various patterns of image usage
      const patterns = [
        /localPath=["`']([^"`']+)["`']/g,
        /src=["`']([^"`']+)["`']/g,
        /fallbackSrc=["`']([^"`']+)["`']/g,
        /backgroundImage:\s*["`']url\(([^)]+)\)["`']/g,
        /<img[^>]+src=["`']([^"`']+)["`']/g,
        /import\s+.*from\s+["`']([^"`']*assets[^"`']*)["`']/g
      ];
      
      patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          let imagePath = match[1];
          
          // Clean up the path
          imagePath = imagePath.replace(/^\/+/, ''); // Remove leading slashes
          imagePath = imagePath.replace(/^assets\//, ''); // Remove assets prefix
          imagePath = imagePath.replace(/^\/dist\/assets\//, ''); // Remove /dist/assets prefix
          imagePath = imagePath.replace(/^dist\/assets\//, ''); // Remove dist/assets prefix
          
          if (imagePath.includes('assets/')) {
            imagePath = imagePath.split('assets/')[1];
          }
          
          // Only include image files
          if (/\.(webp|jpg|jpeg|png|svg)$/i.test(imagePath)) {
            references.add(imagePath);
          }
        }
      });
    } catch (error) {
      // Ignore files that can't be read
    }
  }
  
  function scanDirectory(dir) {
    try {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && 
            !item.includes('node_modules') && 
            !item.includes('.git') &&
            !item.includes('dist')) {
          scanDirectory(fullPath);
        } else if (/\.(tsx?|jsx?|css|scss)$/.test(item)) {
          scanFile(fullPath);
        }
      });
    } catch (error) {
      // Ignore directories that can't be read
    }
  }
  
  scanDirectory('./src');
  scanDirectory('./public'); // Check for references in HTML files
  
  return references;
}

// Get all image files in public/assets
function getAllImageFiles() {
  const imageFiles = [];
  
  function scanAssets(dir, basePath = '') {
    try {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanAssets(fullPath, basePath ? `${basePath}/${item}` : item);
        } else if (/\.(webp|jpg|jpeg|png|svg)$/i.test(item)) {
          const relativePath = basePath ? `${basePath}/${item}` : item;
          imageFiles.push(relativePath);
        }
      });
    } catch (error) {
      console.error(`Error scanning ${dir}:`, error.message);
    }
  }
  
  scanAssets('./public/assets');
  return imageFiles;
}

// Check which Cloudinary images actually exist
async function checkCloudinaryImages(mappings) {
  const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'du4bjp4am';
  const existing = {};
  
  console.log('🔍 Checking which images exist in Cloudinary...');
  
  for (const [localPath, cloudinaryId] of Object.entries(mappings)) {
    try {
      const url = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${cloudinaryId}`;
      
      // Use a simple fetch to check if image exists
      const response = await fetch(url, { method: 'HEAD' });
      existing[localPath] = response.ok;
      
      if (response.ok) {
        console.log(`✅ ${localPath} → ${cloudinaryId}`);
      } else {
        console.log(`❌ ${localPath} → ${cloudinaryId} (404)`);
      }
    } catch (error) {
      existing[localPath] = false;
      console.log(`❌ ${localPath} → Error checking: ${error.message}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  return existing;
}

// Main analysis function
async function analyzeImageUsage() {
  console.log('🔍 Starting comprehensive image analysis...\n');
  
  const cloudinaryMappings = getCloudinaryMappings();
  const codeReferences = findImageReferences();
  const allFiles = getAllImageFiles();
  
  console.log(`📁 Total image files: ${allFiles.length}`);
  console.log(`🔗 Cloudinary mappings: ${Object.keys(cloudinaryMappings).length}`);
  console.log(`💻 Code references found: ${codeReferences.size}\n`);
  
  // Check Cloudinary availability
  console.log('Checking Cloudinary image availability...');
  const cloudinaryExists = await checkCloudinaryImages(cloudinaryMappings);
  console.log('');
  
  // Categorize images
  const analysis = {
    usingCloudinary: [],
    mappedNotUsed: [],
    usedNotMapped: [],
    unusedFiles: [],
    mappedBut404: [],
    duplicateFormats: []
  };
  
  // Check each file
  allFiles.forEach(filePath => {
    const isMapped = cloudinaryMappings[filePath];
    const isReferenced = codeReferences.has(filePath);
    const existsInCloudinary = cloudinaryExists[filePath];
    
    if (isMapped && isReferenced && existsInCloudinary) {
      analysis.usingCloudinary.push(filePath);
    } else if (isMapped && !isReferenced) {
      analysis.mappedNotUsed.push(filePath);
    } else if (!isMapped && isReferenced) {
      analysis.usedNotMapped.push(filePath);
    } else if (!isMapped && !isReferenced) {
      analysis.unusedFiles.push(filePath);
    } else if (isMapped && existsInCloudinary === false) {
      analysis.mappedBut404.push(filePath);
    }
  });
  
  // Find duplicate formats
  const baseNames = new Map();
  allFiles.forEach(filePath => {
    const baseName = filePath.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    if (!baseNames.has(baseName)) {
      baseNames.set(baseName, []);
    }
    baseNames.get(baseName).push(filePath);
  });
  
  baseNames.forEach((files, baseName) => {
    if (files.length > 1) {
      analysis.duplicateFormats.push({ baseName, files });
    }
  });
  
  // Print detailed results
  console.log('✅ IMAGES SUCCESSFULLY USING CLOUDINARY:');
  analysis.usingCloudinary.forEach(file => {
    console.log(`  📸 ${file} → ${cloudinaryMappings[file]}`);
  });
  
  console.log('\n❌ IMAGES MAPPED BUT MISSING IN CLOUDINARY:');
  analysis.mappedBut404.forEach(file => {
    console.log(`  🔴 ${file} → ${cloudinaryMappings[file]} (404)`);
  });
  
  console.log('\n⚠️ IMAGES MAPPED BUT NOT USED IN CODE:');
  analysis.mappedNotUsed.forEach(file => {
    console.log(`  🔗 ${file} → ${cloudinaryMappings[file]}`);
  });
  
  console.log('\n🔧 IMAGES USED BUT NOT MAPPED:');
  analysis.usedNotMapped.forEach(file => {
    console.log(`  📱 ${file}`);
  });
  
  console.log('\n🗑️ POTENTIALLY UNUSED IMAGES:');
  analysis.unusedFiles.forEach(file => {
    console.log(`  🚮 ${file}`);
  });
  
  console.log('\n📋 DUPLICATE FORMATS:');
  analysis.duplicateFormats.forEach(({ baseName, files }) => {
    console.log(`  🔄 ${baseName}: ${files.join(', ')}`);
  });
  
  // Summary and recommendations
  console.log('\n📊 SUMMARY:');
  console.log(`✅ Using Cloudinary: ${analysis.usingCloudinary.length}`);
  console.log(`❌ Mapped but 404: ${analysis.mappedBut404.length}`);
  console.log(`⚠️ Mapped but unused: ${analysis.mappedNotUsed.length}`);
  console.log(`🔧 Used but not mapped: ${analysis.usedNotMapped.length}`);
  console.log(`🗑️ Unused files: ${analysis.unusedFiles.length}`);
  console.log(`🔄 Duplicate formats: ${analysis.duplicateFormats.length}`);
  
  const totalUsed = analysis.usingCloudinary.length + analysis.usedNotMapped.length;
  const optimizedPercentage = totalUsed > 0 ? Math.round((analysis.usingCloudinary.length / totalUsed) * 100) : 0;
  console.log(`📈 Cloudinary optimization rate: ${optimizedPercentage}%`);
  
  console.log('\n💡 RECOMMENDATIONS:');
  if (analysis.mappedBut404.length > 0) {
    console.log(`🚨 URGENT: Upload ${analysis.mappedBut404.length} missing images to Cloudinary`);
  }
  if (analysis.usedNotMapped.length > 0) {
    console.log(`⚡ HIGH: Map ${analysis.usedNotMapped.length} used images to Cloudinary for performance`);
  }
  if (analysis.mappedNotUsed.length > 0) {
    console.log(`🧹 MEDIUM: Review ${analysis.mappedNotUsed.length} mapped but unused images`);
  }
  if (analysis.unusedFiles.length > 0) {
    console.log(`📦 LOW: Consider removing ${analysis.unusedFiles.length} unused files to reduce bundle size`);
  }
  if (analysis.duplicateFormats.length > 0) {
    console.log(`🎯 OPTIMIZATION: ${analysis.duplicateFormats.length} images have multiple formats - keep only WebP versions`);
  }
  
  return analysis;
}

// Run the analysis
if (require.main === module) {
  analyzeImageUsage().catch(console.error);
}

module.exports = { analyzeImageUsage };

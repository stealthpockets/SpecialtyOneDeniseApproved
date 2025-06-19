/**
 * Simple Image Usage Analysis for Cloudinary
 * Analyzes which images are mapped, used, and potentially unused
 */

const fs = require('fs');
const path = require('path');

// Read the Cloudinary mappings from cloudinary.ts
function getCloudinaryMappings() {
  try {
    const content = fs.readFileSync('./src/lib/cloudinary.ts', 'utf8');
    const mappings = {};
    
    // Extract mappings using regex
    const allMatches = content.match(/export const CLOUDINARY_MAPPINGS = \{([\s\S]*?)\};/);
    if (allMatches) {
      const mappingsContent = allMatches[1];
      
      // Find all quoted string pairs
      const pairRegex = /['"`]([^'"`]+)['"`]:\s*['"`]([^'"`]+)['"`]/g;
      let match;
      
      while ((match = pairRegex.exec(mappingsContent)) !== null) {
        const localFile = match[1];
        const cloudinaryId = match[2];
        
        // Try to determine the category from the cloudinary path
        let category = 'unknown';
        if (cloudinaryId.includes('/leadership/')) category = 'leadership';
        else if (cloudinaryId.includes('/property-types/')) category = 'property-types';
        else if (cloudinaryId.includes('/success-stories/')) category = 'success-stories';
        else if (cloudinaryId.includes('/logo/')) category = 'logo';
        else if (cloudinaryId.includes('/favicon/')) category = 'favicon';
        
        // Construct the expected local path
        const localPath = category !== 'unknown' ? `${category}/${localFile}` : localFile;
        mappings[localPath] = cloudinaryId;
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
        /<img[^>]+src=["`']([^"`']+)["`']/g,
      ];
      
      patterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          let imagePath = match[1];
          
          // Clean up the path to match our file structure
          if (imagePath.includes('/assets/')) {
            imagePath = imagePath.split('/assets/')[1];
          } else if (imagePath.includes('assets/')) {
            imagePath = imagePath.split('assets/')[1];
          }
          
          // Remove leading slashes and dist prefixes
          imagePath = imagePath.replace(/^\/+/, '');
          imagePath = imagePath.replace(/^dist\//, '');
          
          // Only include actual image files
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

// Calculate file sizes
function getFileSizes(files) {
  const sizes = {};
  files.forEach(file => {
    try {
      const fullPath = path.join('./public/assets', file);
      const stats = fs.statSync(fullPath);
      sizes[file] = stats.size;
    } catch (error) {
      sizes[file] = 0;
    }
  });
  return sizes;
}

// Format file size
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Main analysis function
function analyzeImageUsage() {
  console.log('🔍 Analyzing image usage and Cloudinary optimization...\n');
  
  const cloudinaryMappings = getCloudinaryMappings();
  const codeReferences = findImageReferences();
  const allFiles = getAllImageFiles();
  const fileSizes = getFileSizes(allFiles);
  
  console.log(`📁 Total image files: ${allFiles.length}`);
  console.log(`🔗 Cloudinary mappings: ${Object.keys(cloudinaryMappings).length}`);
  console.log(`💻 Code references found: ${codeReferences.size}\n`);
  
  // Categorize images
  const analysis = {
    mappedAndUsed: [],
    mappedNotUsed: [],
    usedNotMapped: [],
    unusedFiles: [],
    duplicateFormats: []
  };
  
  // Check each file
  allFiles.forEach(filePath => {
    const isMapped = cloudinaryMappings[filePath];
    const isReferenced = codeReferences.has(filePath);
    
    if (isMapped && isReferenced) {
      analysis.mappedAndUsed.push({
        file: filePath,
        cloudinaryId: isMapped,
        size: fileSizes[filePath]
      });
    } else if (isMapped && !isReferenced) {
      analysis.mappedNotUsed.push({
        file: filePath,
        cloudinaryId: isMapped,
        size: fileSizes[filePath]
      });
    } else if (!isMapped && isReferenced) {
      analysis.usedNotMapped.push({
        file: filePath,
        size: fileSizes[filePath]
      });
    } else if (!isMapped && !isReferenced) {
      analysis.unusedFiles.push({
        file: filePath,
        size: fileSizes[filePath]
      });
    }
  });
  
  // Find duplicate formats
  const baseNames = new Map();
  allFiles.forEach(filePath => {
    const baseName = filePath.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    if (!baseNames.has(baseName)) {
      baseNames.set(baseName, []);
    }
    baseNames.get(baseName).push({
      file: filePath,
      size: fileSizes[filePath]
    });
  });
  
  baseNames.forEach((files, baseName) => {
    if (files.length > 1) {
      analysis.duplicateFormats.push({ baseName, files });
    }
  });
  
  // Print results
  console.log('✅ IMAGES OPTIMIZED WITH CLOUDINARY:');
  if (analysis.mappedAndUsed.length === 0) {
    console.log('  None found - this indicates a potential issue with the analysis or configuration');
  } else {
    analysis.mappedAndUsed.forEach(item => {
      console.log(`  📸 ${item.file} → ${item.cloudinaryId} (${formatSize(item.size)})`);
    });
  }
  
  console.log('\n⚠️ IMAGES MAPPED BUT NOT USED IN CODE:');
  analysis.mappedNotUsed.forEach(item => {
    console.log(`  🔗 ${item.file} → ${item.cloudinaryId} (${formatSize(item.size)})`);
  });
  
  console.log('\n🔧 IMAGES USED BUT NOT MAPPED TO CLOUDINARY:');
  analysis.usedNotMapped.forEach(item => {
    console.log(`  📱 ${item.file} (${formatSize(item.size)})`);
  });
  
  console.log('\n📋 DUPLICATE FORMATS (Optimization Opportunity):');
  analysis.duplicateFormats.forEach(({ baseName, files }) => {
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    console.log(`  🔄 ${baseName}: ${files.map(f => `${f.file} (${formatSize(f.size)})`).join(', ')} - Total: ${formatSize(totalSize)}`);
  });
  
  console.log('\n🗑️ POTENTIALLY UNUSED IMAGES:');
  let unusedSize = 0;
  analysis.unusedFiles.forEach(item => {
    console.log(`  🚮 ${item.file} (${formatSize(item.size)})`);
    unusedSize += item.size;
  });
  
  // Summary with sizes
  console.log('\n📊 SUMMARY:');
  console.log(`✅ Optimized with Cloudinary: ${analysis.mappedAndUsed.length}`);
  console.log(`⚠️ Mapped but unused: ${analysis.mappedNotUsed.length}`);
  console.log(`🔧 Used but not mapped: ${analysis.usedNotMapped.length}`);
  console.log(`🗑️ Unused files: ${analysis.unusedFiles.length} (${formatSize(unusedSize)})`);
  console.log(`🔄 Duplicate formats: ${analysis.duplicateFormats.length}`);
  
  const totalUsed = analysis.mappedAndUsed.length + analysis.usedNotMapped.length;
  const optimizedPercentage = totalUsed > 0 ? Math.round((analysis.mappedAndUsed.length / totalUsed) * 100) : 0;
  console.log(`📈 Cloudinary optimization rate: ${optimizedPercentage}%`);
  
  // Recommendations
  console.log('\n💡 PRIORITY RECOMMENDATIONS:');
  
  if (analysis.mappedAndUsed.length === 0 && analysis.usedNotMapped.length > 0) {
    console.log('🚨 CRITICAL: No images are being served through Cloudinary despite mappings existing!');
    console.log('   This suggests a configuration issue or the components are not using Cloudinary properly.');
  }
  
  if (analysis.usedNotMapped.length > 0) {
    console.log(`⚡ HIGH PRIORITY: Map ${analysis.usedNotMapped.length} actively used images to Cloudinary`);
    console.log('   These images would benefit most from Cloudinary optimization');
  }
  
  if (analysis.duplicateFormats.length > 0) {
    const duplicateSize = analysis.duplicateFormats.reduce((sum, dup) => 
      sum + dup.files.reduce((s, f) => s + f.size, 0), 0);
    console.log(`🎯 MEDIUM: Optimize ${analysis.duplicateFormats.length} duplicate formats - potential ${formatSize(duplicateSize)} savings`);
  }
  
  if (analysis.mappedNotUsed.length > 0) {
    console.log(`🧹 MEDIUM: Review ${analysis.mappedNotUsed.length} mapped but unused images`);
    console.log('   Consider removing mappings for unused assets');
  }
  
  if (analysis.unusedFiles.length > 0) {
    console.log(`📦 LOW: Remove ${analysis.unusedFiles.length} unused files to save ${formatSize(unusedSize)}`);
  }
  
  return analysis;
}

// Run the analysis
if (require.main === module) {
  try {
    analyzeImageUsage();
  } catch (error) {
    console.error('❌ Error during analysis:', error.message);
  }
}

module.exports = { analyzeImageUsage };

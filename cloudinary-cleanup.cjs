/**
 * Cloudinary Asset Cleanup Script
 * 
 * This script helps clean up unused images and optimize your asset structure:
 * 1. Removes duplicate JPG files (keeping WebP versions)
 * 2. Lists unused assets for manual review
 * 3. Identifies mapping issues
 * 
 * Run with: node cloudinary-cleanup.cjs
 */

const fs = require('fs');
const path = require('path');

// Files to definitely keep (critical for functionality)
const CRITICAL_FILES = [
  'favicon/favicon.ico',
  'favicon/favicon.svg',
  'favicon/apple-touch-icon.png',
  'favicon/android-chrome-192x192.png',
  'favicon/android-chrome-512x512.png',
  'favicon/favicon-16x16.png',
  'favicon/favicon-32x32.png'
];

// Get all image files
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
          imageFiles.push({
            relativePath,
            fullPath,
            size: stat.size,
            extension: path.extname(item).toLowerCase()
          });
        }
      });
    } catch (error) {
      console.error(`Error scanning ${dir}:`, error.message);
    }
  }
  
  scanAssets('./public/assets');
  return imageFiles;
}

// Find duplicate formats
function findDuplicateFormats(files) {
  const baseNames = new Map();
  
  files.forEach(file => {
    const baseName = file.relativePath.replace(/\.(webp|jpg|jpeg|png)$/i, '');
    if (!baseNames.has(baseName)) {
      baseNames.set(baseName, []);
    }
    baseNames.get(baseName).push(file);
  });
  
  const duplicates = [];
  baseNames.forEach((fileList, baseName) => {
    if (fileList.length > 1) {
      duplicates.push({
        baseName,
        files: fileList,
        totalSize: fileList.reduce((sum, f) => sum + f.size, 0)
      });
    }
  });
  
  return duplicates;
}

// Format file size
function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Clean up duplicate JPG files
function cleanupDuplicateJPGs(duplicates, dryRun = true) {
  const toDelete = [];
  let totalSavings = 0;
  
  duplicates.forEach(({ baseName, files }) => {
    // Find WebP and JPG versions
    const webpFile = files.find(f => f.extension === '.webp');
    const jpgFiles = files.filter(f => f.extension === '.jpg' || f.extension === '.jpeg');
    
    // If we have both WebP and JPG, remove JPG files
    if (webpFile && jpgFiles.length > 0) {
      jpgFiles.forEach(jpgFile => {
        toDelete.push(jpgFile);
        totalSavings += jpgFile.size;
      });
    }
  });
  
  console.log(`\n🧹 DUPLICATE JPG CLEANUP ${dryRun ? '(DRY RUN)' : ''}:`);
  console.log(`Found ${toDelete.length} JPG files to remove (${formatSize(totalSavings)} savings)`);
  
  toDelete.forEach(file => {
    console.log(`  ${dryRun ? '🔍' : '🗑️'} ${file.relativePath} (${formatSize(file.size)})`);
    
    if (!dryRun) {
      try {
        fs.unlinkSync(file.fullPath);
        console.log(`    ✅ Deleted`);
      } catch (error) {
        console.log(`    ❌ Error: ${error.message}`);
      }
    }
  });
  
  return { toDelete, totalSavings };
}

// Identify truly unused files (excluding critical files)
function identifyUnusedFiles(files) {
  // Files that appear to be truly unused based on the analysis
  const likelyUnused = [
    // Insights images (may be used in blog/content system)
    'insights/1031-exchange-tax-strategies-2025.webp',
    'insights/2025-manufactured-housing-regulatory-outlook.webp',
    'insights/bullhead-city-rv-mh-market-report-2025.webp',
    'insights/institutional-capital-manufactured-housing-2025.webp',
    'insights/mh-lot-rents-2025-update.webp',
    'insights/wickenburg-mobile-home-park-market-report-2025.webp',
    
    // Property type variants not used in current code
    'property-types/rv_resort_arizona_investment.jpg',
    
    // Logo variants not used
    'logo/Logo-icon-blackbackground.svg',
    'logo/logo-icon-lightbackground.svg',
    'logo/logo-vertical-blackbackground.svg',
    'logo/logo-vertical-lightbackgroung.svg'
  ];
  
  const unusedFiles = files.filter(file => 
    likelyUnused.includes(file.relativePath) &&
    !CRITICAL_FILES.includes(file.relativePath)
  );
  
  return unusedFiles;
}

// Main cleanup function
function performCleanup(options = {}) {
  const { 
    removeDuplicateJPGs = false, 
    removeUnusedFiles = false,
    dryRun = true 
  } = options;
  
  console.log('🔍 Starting Cloudinary asset cleanup analysis...\n');
  
  const allFiles = getAllImageFiles();
  const duplicates = findDuplicateFormats(allFiles);
  const unusedFiles = identifyUnusedFiles(allFiles);
  
  console.log(`📁 Total image files: ${allFiles.length}`);
  console.log(`🔄 Duplicate format sets: ${duplicates.length}`);
  console.log(`🗑️ Potentially unused files: ${unusedFiles.length}\n`);
  
  // Show duplicate formats
  if (duplicates.length > 0) {
    console.log('🔄 DUPLICATE FORMATS FOUND:');
    duplicates.forEach(({ baseName, files, totalSize }) => {
      console.log(`  📋 ${baseName}:`);
      files.forEach(file => {
        console.log(`    • ${file.relativePath} (${formatSize(file.size)})`);
      });
      console.log(`    Total: ${formatSize(totalSize)}\n`);
    });
  }
  
  // Clean up duplicate JPGs
  if (removeDuplicateJPGs) {
    const jpgCleanup = cleanupDuplicateJPGs(duplicates, dryRun);
  }
  
  // Show unused files
  if (unusedFiles.length > 0) {
    const unusedSize = unusedFiles.reduce((sum, f) => sum + f.size, 0);
    console.log(`\n🗑️ POTENTIALLY UNUSED FILES (${formatSize(unusedSize)}):`);
    
    unusedFiles.forEach(file => {
      console.log(`  ${removeUnusedFiles && !dryRun ? '🗑️' : '🔍'} ${file.relativePath} (${formatSize(file.size)})`);
      
      if (removeUnusedFiles && !dryRun) {
        try {
          fs.unlinkSync(file.fullPath);
          console.log(`    ✅ Deleted`);
        } catch (error) {
          console.log(`    ❌ Error: ${error.message}`);
        }
      }
    });
  }
  
  // Summary
  const totalDuplicateSize = duplicates.reduce((sum, d) => sum + d.totalSize, 0);
  const unusedSize = unusedFiles.reduce((sum, f) => sum + f.size, 0);
  
  console.log('\n📊 CLEANUP SUMMARY:');
  console.log(`🔄 Duplicate formats: ${duplicates.length} sets (${formatSize(totalDuplicateSize)})`);
  console.log(`🗑️ Unused files: ${unusedFiles.length} files (${formatSize(unusedSize)})`);
  console.log(`💾 Total potential savings: ${formatSize(totalDuplicateSize + unusedSize)}`);
  
  if (dryRun) {
    console.log('\n💡 To perform actual cleanup, run with specific options:');
    console.log('   node cloudinary-cleanup.cjs --remove-jpgs');
    console.log('   node cloudinary-cleanup.cjs --remove-unused');
    console.log('   node cloudinary-cleanup.cjs --remove-jpgs --remove-unused');
  }
  
  return {
    duplicates,
    unusedFiles,
    totalSavings: totalDuplicateSize + unusedSize
  };
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    removeDuplicateJPGs: args.includes('--remove-jpgs'),
    removeUnusedFiles: args.includes('--remove-unused'),
    dryRun: !args.includes('--execute')
  };
}

// Run the cleanup
if (require.main === module) {
  try {
    const options = parseArgs();
    
    if (options.removeDuplicateJPGs || options.removeUnusedFiles) {
      console.log('⚠️  CLEANUP MODE ACTIVE');
      if (options.dryRun) {
        console.log('🔍 DRY RUN - No files will be deleted');
        console.log('💡 Add --execute flag to perform actual deletion\n');
      } else {
        console.log('🚨 LIVE MODE - Files will be permanently deleted\n');
      }
    }
    
    performCleanup(options);
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

module.exports = { performCleanup };

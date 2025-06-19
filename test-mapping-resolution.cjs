// Simple test to verify mapping resolution
const fs = require('fs');

// Read the cloudinary.ts file content
const cloudinaryFile = fs.readFileSync('./src/lib/cloudinary.ts', 'utf8');

// Just work with the full file content since mappings are complex nested structure
console.log('Found cloudinary.ts file, checking mappings...');

// Test paths that should be resolved
const testPaths = [
  'Leadership/andrew-headshot-image.webp',
  'Leadership/denise-nunez-self-storage.webp',
  'logo/logo-horizontal-blackbackground.svg',
  'logo/logo-horizontal-lightbackground.svg',
  'property-types/mobile-home-park-specialty-one.webp',
  'property-types/outdoor-hospitality-rv-park.webp',
  'property-types/self-storage-investment-arizona.webp'
];

console.log('🔍 Testing mapping resolution...\n');

// Simple function to extract filename without extension
function getFilenameWithoutExt(path) {
  const filename = path.split('/').pop();
  return filename.replace(/\.(webp|svg|jpg|png)$/, '');
}

// Check if each test path can be resolved
testPaths.forEach(path => {
  const key = getFilenameWithoutExt(path);
  const hasMapping = cloudinaryFile.includes(`'${key}'`) || cloudinaryFile.includes(`"${key}"`);
  
  console.log(`${hasMapping ? '✅' : '❌'} ${path}`);
  console.log(`   Looking for key: "${key}"`);
  console.log(`   Found in mappings: ${hasMapping}`);
  console.log('');
});

console.log('📋 Current mappings found in file:');
const keyMatches = cloudinaryFile.match(/'[^']+'\s*:/g) || [];
keyMatches.forEach(match => {
  const key = match.replace(/['":]/g, '');
  console.log(`   • ${key}`);
});

const https = require('https');

// Test if our uploaded images are accessible from Cloudinary
const uploadedImages = [
  'specialty-one/specialty-one/leadership/andrew-headshot-image',
  'specialty-one/specialty-one/leadership/denise-nunez-self-storage',
  'specialty-one/specialty-one/logo/logo-horizontal-blackbackground',
  'specialty-one/specialty-one/logo/logo-horizontal-lightbackground',
  'specialty-one/specialty-one/property-types/mobile-home-park-specialty-one',
  'specialty-one/specialty-one/property-types/outdoor-hospitality-rv-park',
  'specialty-one/specialty-one/property-types/self-storage-investment-arizona'
];

async function testCloudinaryImage(publicId) {
  return new Promise((resolve) => {
    const url = `https://res.cloudinary.com/du4bjp4am/image/upload/${publicId}`;
    
    https.get(url, (res) => {
      console.log(`${res.statusCode === 200 ? '✅' : '❌'} ${publicId} → ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', () => {
      console.log(`❌ ${publicId} → ERROR`);
      resolve(false);
    });
  });
}

async function testAllImages() {
  console.log('🔍 Testing Cloudinary image accessibility...\n');
  
  for (const publicId of uploadedImages) {
    await testCloudinaryImage(publicId);
  }
  
  console.log('\n✅ Test completed!');
}

testAllImages();

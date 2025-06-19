// Quick test to verify Cloudinary mappings are working
import { getCloudinaryPublicId } from './src/lib/cloudinary.js';

const testPaths = [
  '/assets/Leadership/andrew-headshot-image.webp',
  '/assets/Leadership/denise-nunez-self-storage.webp',
  '/assets/logo/logo-horizontal-blackbackground.svg',
  '/assets/logo/logo-horizontal-lightbackground.svg',
  '/assets/property-types/mobile-home-park-specialty-one.webp',
  '/assets/property-types/outdoor-hospitality-rv-park.webp',
  '/assets/property-types/self-storage-investment-arizona.webp'
];

console.log('🧪 Testing Cloudinary mappings...\n');

testPaths.forEach(path => {
  const publicId = getCloudinaryPublicId(path);
  if (publicId) {
    console.log(`✅ ${path} → ${publicId}`);
  } else {
    console.log(`❌ ${path} → NOT FOUND`);
  }
});

// Test image resolution from the application's perspective
const path = require('path');

// Simulated getCloudinaryPublicId function based on the mappings
const CLOUDINARY_MAPPINGS = {
  leadership: {
    'andrew-headshot-image.webp': 'specialty-one/specialty-one/leadership/andrew-headshot-image',
    'denise-nunez-self-storage.webp': 'specialty-one/specialty-one/leadership/denise-nunez-self-storage',
  },
  propertyTypes: {
    'parkmodel_rv_park_apache_junction_arizona.webp': 'specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona',
    'self-storage-investment-arizona.webp': 'specialty-one/specialty-one/property-types/self-storage-investment-arizona',
  },
  successStories: {
    'american-ss-mail.webp': 'specialty-one/success-stories/american-ss-mail',
    'success-stories/american-ss-mail.webp': 'specialty-one/success-stories/american-ss-mail',
  },
  insights: {
    '1031-exchange-tax-strategies-2025.webp': 'specialty-one/insights/1031-exchange-tax-strategies-2025',
  }
};

function getCloudinaryPublicId(localPath) {
  if (!localPath) return null;

  // Extract the filename from the path
  const filename = localPath.split(/[\\/]/).pop();
  if (!filename) return null;

  // Check all categories for a direct match with the filename
  for (const category of Object.values(CLOUDINARY_MAPPINGS)) {
    for (const [key, value] of Object.entries(category)) {
      // The key in our mapping might be a full path, so we extract its filename too
      const keyFilename = key.split(/[\\/]/).pop();
      if (keyFilename === filename) {
        return value;
      }
    }
  }
  
  console.warn(`Cloudinary public ID not found for local path: ${localPath}`);
  return null;
}

async function testImageResolution() {
  console.log('🔍 Testing image resolution from application perspective...\n');

  // Test cases from the console errors
  const testCases = [
    {
      description: 'American Storage & Mail case study',
      localPath: '/assets/success-stories/american-ss-mail.webp',
      expectedCloudinary: 'specialty-one/success-stories/american-ss-mail'
    },
    {
      description: 'Parkmodel RV Park (default testimonial)',
      localPath: '/dist/assets/property-types/parkmodel_rv_park_apache_junction_arizona.webp',
      expectedCloudinary: 'specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona'
    },
    {
      description: '1031 Exchange article image',
      localPath: '/assets/insights/1031-exchange-tax-strategies-2025.webp',
      expectedCloudinary: 'specialty-one/insights/1031-exchange-tax-strategies-2025'
    }
  ];

  for (const testCase of testCases) {
    console.log(`📋 Testing: ${testCase.description}`);
    console.log(`   Local path: ${testCase.localPath}`);
    
    const resolvedId = getCloudinaryPublicId(testCase.localPath);
    console.log(`   Resolved ID: ${resolvedId || 'null'}`);
    
    if (resolvedId) {
      // Test Cloudinary URL accessibility
      const cloudinaryUrl = `https://res.cloudinary.com/du4bjp4am/image/upload/f_auto,q_auto/${resolvedId}`;
      console.log(`   Cloudinary URL: ${cloudinaryUrl}`);
      
      try {
        const response = await fetch(cloudinaryUrl);
        if (response.ok) {
          console.log(`   ✅ Status: ${response.status}`);
        } else {
          console.log(`   ❌ Status: ${response.status}`);
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
    } else {
      console.log(`   ❌ No Cloudinary mapping found`);
    }
    
    console.log('');
  }

  console.log('✅ Image resolution test completed!');
}

testImageResolution().catch(console.error);

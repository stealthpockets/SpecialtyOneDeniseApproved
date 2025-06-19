const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'du4bjp4am',
  api_key: '233167234617134',
  api_secret: 'lZF7P_FDqHeXbQL-Frv0k4n240g'
});

async function uploadMissingImages() {
  console.log('🔄 Uploading missing images to Cloudinary...\n');
  // List of missing images to upload
  const imagesToUpload = [
    {
      localPath: 'public/assets/success-stories/american-ss-mail.webp',
      cloudinaryPath: 'specialty-one/success-stories/american-ss-mail',
      description: 'American Storage & Mail case study image'
    },
    {
      localPath: 'public/assets/property-types/parkmodel_rv_park_apache_junction_arizona.webp',
      cloudinaryPath: 'specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona',
      description: 'RV Park Apache Junction property image'
    },
    {
      localPath: 'public/assets/insights/1031-exchange-tax-strategies-2025.webp',
      cloudinaryPath: 'specialty-one/insights/1031-exchange-tax-strategies-2025',
      description: '1031 Exchange Tax Strategies article image'
    }
  ];

  for (const image of imagesToUpload) {
    try {
      const fullPath = path.join(__dirname, image.localPath);
      
      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        console.log(`❌ File not found: ${image.localPath}`);
        continue;
      }

      console.log(`📤 Uploading ${image.description}...`);
      
      const result = await cloudinary.uploader.upload(fullPath, {
        public_id: image.cloudinaryPath,
        folder: '',
        resource_type: 'image',
        format: 'webp',
        quality: 'auto',
        fetch_format: 'auto'
      });

      console.log(`✅ Successfully uploaded: ${image.cloudinaryPath}`);
      console.log(`   URL: ${result.secure_url}`);
      
    } catch (error) {
      console.error(`❌ Failed to upload ${image.description}:`, error.message);
    }
  }

  // Test accessibility of uploaded images
  console.log('\n🔍 Testing uploaded images accessibility...\n');
    const testImages = [
    'specialty-one/success-stories/american-ss-mail',
    'specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona',
    'specialty-one/insights/1031-exchange-tax-strategies-2025'
  ];

  for (const imagePath of testImages) {
    try {
      const url = `https://res.cloudinary.com/du4bjp4am/image/upload/f_auto,q_auto/${imagePath}`;
      const response = await fetch(url);
      
      if (response.ok) {
        console.log(`✅ ${imagePath} → ${response.status}`);
      } else {
        console.log(`❌ ${imagePath} → ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${imagePath} → Error: ${error.message}`);
    }
  }

  console.log('\n✅ Upload process completed!');
}

uploadMissingImages().catch(console.error);

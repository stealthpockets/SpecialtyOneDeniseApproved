async function testNewUploads() {
  console.log('🔍 Testing newly uploaded images...\n');
  
  const newImages = [
    'specialty-one/success-stories/american-ss-mail',
    'specialty-one/property-types/parkmodel-rv-park-apache-junction-arizona',
    'specialty-one/insights/1031-exchange-tax-strategies-2025'
  ];

  for (const imagePath of newImages) {
    try {
      const url = `https://res.cloudinary.com/du4bjp4am/image/upload/f_auto,q_auto/${imagePath}`;
      const response = await fetch(url);
      
      if (response.ok) {
        console.log(`✅ ${imagePath} → ${response.status}`);
        console.log(`   URL: ${url}`);
      } else {
        console.log(`❌ ${imagePath} → ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${imagePath} → Error: ${error.message}`);
    }
  }

  console.log('\n✅ Test completed!');
}

testNewUploads().catch(console.error);

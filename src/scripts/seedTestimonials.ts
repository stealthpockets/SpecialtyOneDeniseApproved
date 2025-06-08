import { supabase } from '../lib/supabase';

// Sample testimonials for homepage carousel
const carouselTestimonials = [
  {
    person: 'Former Owner',
    property_name: 'American Self Storage & Mail',
    property_type: 'Self-Storage',
    testimonial_text: 'Denise knew exactly how to position our facility to attract serious buyers. She didn\'t just find a buyer—she found the right one. Her market knowledge and connections made all the difference in getting us top dollar.',
    placement_type: 'Homepage - Carousel',
    is_strongest: true,
    can_be_displayed_if_other_from_same_person: true,
    is_active: true,
    image_url: null
  },
  {
    person: 'Investment Partners',
    property_name: 'Desert Retreat RV Resort', 
    property_type: 'RV Parks',
    testimonial_text: 'When COVID hit, we thought our deal was dead. Andrew and his team pivoted quickly, found new financing options, and kept everything on track. Their expertise in RV parks was exactly what we needed.',
    placement_type: 'Homepage - Carousel',
    is_strongest: false,
    can_be_displayed_if_other_from_same_person: true,
    is_active: true,
    image_url: null
  },
  {
    person: 'Family Trust',
    property_name: 'Sunset Acres Mobile Home Community',
    property_type: 'Manufactured Housing',
    testimonial_text: 'We had been trying to sell for two years with no success. Within 90 days of listing with Specialty One, we had multiple offers above asking price. Their understanding of the manufactured housing market is unmatched.',
    placement_type: 'Homepage - Carousel',
    is_strongest: false,
    can_be_displayed_if_other_from_same_person: true,
    is_active: true,
    image_url: null
  },
  {
    person: 'Private Equity Group',
    property_name: 'SecureStore Portfolio',
    property_type: 'Self-Storage',
    testimonial_text: 'Managing a multi-facility exit strategy requires precision and expertise. Specialty One delivered both, coordinating the sale of 12 properties across 4 states simultaneously. Flawless execution.',
    placement_type: 'Homepage - Carousel',
    is_strongest: false,
    can_be_displayed_if_other_from_same_person: true,
    is_active: true,
    image_url: null
  }
];

async function seedTestimonials() {
  console.log('🌱 Seeding testimonials...');
  
  try {
    // Check if testimonials already exist
    const { data: existingTestimonials, error: checkError } = await supabase
      .from('testimonials')
      .select('id')
      .eq('placement_type', 'Homepage - Carousel');

    if (checkError) {
      console.error('❌ Error checking existing testimonials:', checkError);
      return;
    }

    if (existingTestimonials && existingTestimonials.length > 0) {
      console.log('✅ Homepage carousel testimonials already exist, skipping...');
      return;
    }

    // Insert new testimonials
    const { data, error } = await supabase
      .from('testimonials')
      .insert(carouselTestimonials)
      .select();

    if (error) {
      console.error('❌ Error inserting testimonials:', error);
      return;
    }

    console.log('✅ Successfully seeded testimonials:', data?.length);
    console.log('🎉 Testimonials seeding complete!');
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seedTestimonials().then(() => process.exit(0));
}

export { seedTestimonials };

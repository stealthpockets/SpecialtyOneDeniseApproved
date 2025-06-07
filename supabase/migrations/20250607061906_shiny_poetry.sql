/*
  # Add Three New Case Studies

  1. New Case Studies
    - The Palms (Manufactured Housing, Apache Junction, AZ)
    - Desert Trails RV Park (RV Park, Tucson, AZ) 
    - American Self Storage & Mail (Self-Storage, Chandler, AZ)

  2. Content Structure
    - Each follows the standardized format matching Caravan Oasis
    - Consistent word counts and narrative structure
    - Complete testimonials and detailed sections
    - Proper metadata and tags

  3. Data Integrity
    - Uses gen_random_uuid() for unique IDs
    - Proper JSON formatting for testimonials and results
    - All required fields populated
    - Published status for immediate visibility
*/

-- Insert for The Palms
INSERT INTO case_studies (
  id, slug, title, subtitle, location, property_type, status, site_count, square_footage, sale_price, cap_rate, time_to_sale, challenge, solution, results, hero_image, additional_images, introduction, detailed_challenge, approach, outcome, testimonial, agent, agent_image, meta_description, tags, created_at, updated_at, published_at
) VALUES (
  gen_random_uuid(), 
  'the-palms', 
  'The Palms', 
  'Achieving a Sub-3% Cap Rate through Strategic Synergy', 
  'Apache Junction, AZ', 
  'Manufactured Housing', 
  'completed', 
  88, 
  NULL, 
  NULL, 
  '2.7%', 
  '60 Days', 
  'Demonstrating the value of operational synergy with adjacent Whitesands park and ensuring impeccable property condition.', 
  'Performed in-depth market analysis, prepared a detailed Broker Opinion of Value, and employed confidential, targeted marketing.', 
  '["Over 80 offers generated", "Closed at a sub-3% cap rate", "Buyer realized operational efficiencies", "Record-setting valuation achieved"]', 
  '/dist/assets/success-stories/the-palms.webp', 
  NULL, 
  'The Palms, an 88-site senior manufactured housing park in Apache Junction, Arizona, was a high-quality asset with untapped potential. Its adjacency to Whitesands presented a unique opportunity for operational synergy, but required expert positioning to achieve maximum value.', 
  'The brokers faced the task of conducting thorough due diligence, including a comprehensive rent study and property inspection, to preemptively address any potential issues. Moreover, they needed to effectively market the synergy with Whitesands to justify a premium valuation, demonstrating how combined operations could halve management costs and boost NOI.', 
  'Utilizing their expertise, the brokers performed an in-depth market analysis and prepared a detailed Broker Opinion of Value. They then employed a confidential, targeted marketing approach, leveraging a proprietary database of qualified buyers to generate competitive offers without public listing.', 
  'The strategy resulted in over 80 offers, ultimately closing at a sub-3% cap rate, a record-setting valuation. The buyer quickly realized operational efficiencies from combined management with Whitesands, enhancing the property''s value post-sale and validating the strategic positioning.', 
  '{"quote": "Thanks for helping sell The Palms. We realized more than expected and are grateful. I wish my parents could see their legacy''s value. Great work!", "author": "James & Phillip Weech"}', 
  'Andrew Warner', 
  NULL, 
  'How Specialty One leveraged synergy with an adjacent park to achieve a record-setting sale for The Palms Manufactured Housing Park.', 
  '["Manufactured Housing", "Synergy", "Premium Sale", "Record Valuation"]', 
  now(), 
  now(), 
  now()
);

-- Insert for Desert Trails RV Park
INSERT INTO case_studies (
  id, slug, title, subtitle, location, property_type, status, site_count, square_footage, sale_price, cap_rate, time_to_sale, challenge, solution, results, hero_image, additional_images, introduction, detailed_challenge, approach, outcome, testimonial, agent, agent_image, meta_description, tags, created_at, updated_at, published_at
) VALUES (
  gen_random_uuid(), 
  'desert-trails-rv-park', 
  'Desert Trails RV Park', 
  'Navigating Zoning and Pandemic Challenges to Full-Price Sale', 
  'Tucson, AZ', 
  'RV Park', 
  'completed', 
  242, 
  NULL, 
  '$4,500,000', 
  NULL, 
  '30 Days', 
  'Overcoming zoning non-compliance, financial disorganization, and COVID-19 market uncertainty.', 
  'Restructured financials, initiated zoning discussions, conducted market study, and employed targeted marketing.', 
  '["Sold for $4.5 million at full asking price", "Closed during COVID-19 pandemic", "Buyer resolved zoning issues", "Zero price adjustments or retrades"]', 
  '/dist/assets/success-stories/desert-trails.webp', 
  NULL, 
  'Desert Trails RV Park, a 242-site resort in Tucson, Arizona, faced significant hurdles including zoning non-compliance, disorganized financials, and the uncertainty of the COVID-19 pandemic. Despite these challenges, it achieved a full-price sale of $4.5 million.', 
  'The park had 242 sites but was only permitted for 212, posing a compliance risk. Financial records were incomplete, and the pandemic created market uncertainty with financing barriers and operational struggles like low summer occupancy, making buyers hesitant about the investment.', 
  'The broker restructured the financials, initiated zoning discussions, and developed a compliance plan. They also conducted a market study to demonstrate the park''s resilience during COVID-19 and employed targeted marketing to attract qualified buyers despite economic challenges.', 
  'The park sold for $4.5 million, the full asking price, despite the pandemic. The buyer later resolved zoning issues and enhanced the park''s value, proving the broker''s strategic positioning turned obstacles into opportunities for a high-value exit.', 
  '{"quote": "Andrew tackled zoning, financials, and COVID doubts head-on. His hard work secured our full price pre-pandemic. I''ve worked with many agents over the years, but Andrew stands out—he goes above and beyond anything I''ve experienced with any other broker!", "author": "Pericles Wyatt"}', 
  'Andrew Warner', 
  NULL, 
  'How Specialty One overcame zoning issues and pandemic challenges to sell Desert Trails RV Park at full price.', 
  '["RV Park", "Zoning", "COVID-19", "Full-Price Sale"]', 
  now(), 
  now(), 
  now()
);

-- Insert for American Self Storage & Mail
INSERT INTO case_studies (
  id, slug, title, subtitle, location, property_type, status, site_count, square_footage, sale_price, cap_rate, time_to_sale, challenge, solution, results, hero_image, additional_images, introduction, detailed_challenge, approach, outcome, testimonial, agent, agent_image, meta_description, tags, created_at, updated_at, published_at
) VALUES (
  gen_random_uuid(), 
  'american-self-storage', 
  'American Self Storage & Mail', 
  'Unlocking Value in a High-Growth Corridor', 
  'Chandler, AZ', 
  'Self-Storage', 
  'completed', 
  652, 
  59239, 
  '$8,350,000', 
  '5%', 
  'Minimal', 
  'Addressing below-market rents, operational inefficiencies, and underutilized expansion potential.', 
  'Conducted competitive analysis, adjusted pricing strategies, recommended operational enhancements, and guided lease restructuring.', 
  '["Sold for $8.35 million at 5% cap rate", "Buyer executed expansion plans", "Increased occupancy and income", "Converted parking to covered storage"]', 
  '/dist/assets/success-stories/american-ss-mail.webp', 
  NULL, 
  'American Self Storage & Mail, a 652-unit facility in Chandler, AZ, was under-optimized despite its strategic location in a high-growth corridor. Below-market rents, operational inefficiencies, and underutilized expansion potential posed challenges to realizing its full value.', 
  'The facility had outdated cooling systems, limited visibility, and operational shortcomings like lack of digital marketing that hurt occupancy. Additionally, four concrete pads intended for expansion remained unused, representing missed revenue opportunities while below-market rents needed addressing.', 
  'The broker conducted a competitive analysis, adjusted pricing strategies, and highlighted the value-add potential to attract buyers with a vision for improvements. They also recommended operational enhancements and guided the owner on lease restructuring to maximize appeal.', 
  'The property sold for $8,350,000 at a 5% cap rate. The buyer executed expansion plans, converting parking to covered storage and adding climate-controlled units, increasing occupancy and income—validating the broker''s strategy in a high-growth market.', 
  '{"quote": "Denise positioned our facility perfectly, finding a buyer who saw its potential. Her market expertise made the difference.", "author": "Anonymous Seller"}', 
  'Denise Nuñez', 
  NULL, 
  'How Specialty One unlocked value in American Self Storage & Mail through strategic positioning and operational advisory.', 
  '["Self-Storage", "Value-Add", "Expansion", "High-Growth Market"]', 
  now(), 
  now(), 
  now()
);
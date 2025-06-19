import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fttgppbopdxjbzexntlc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0dGdwcGJvcGR4amJ6ZXhudGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNzEwMDQsImV4cCI6MjA2NDg0NzAwNH0.8O5hW57eeMS0voHFZADCgzIvkeFZB2xGCzZ5BF3tlnQ';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log('Testing Supabase connection...');
  
  try {    // Test insights table
    console.log('\n=== INSIGHTS TABLE ===');
    const { data: insights, error: insightsError } = await supabase
      .from('insights')
      .select('id, slug, title, status')
      .limit(5);
    
    if (insightsError) {
      console.error('Insights error:', insightsError);
    } else {
      console.log('Insights count:', insights?.length || 0);
      insights?.forEach(insight => {
        console.log(`- ${insight.title} (${insight.slug}) - Status: ${insight.status}`);
      });
    }

    // Test published insights specifically
    console.log('\n=== PUBLISHED INSIGHTS ===');
    const { data: publishedInsights, error: publishedError } = await supabase
      .from('insights')
      .select('id, slug, title, published_at, status')
      .eq('status', 'published')
      .is('deleted_at', null)
      .limit(5);
    
    if (publishedError) {
      console.error('Published insights error:', publishedError);
    } else {
      console.log('Published insights count:', publishedInsights?.length || 0);
      publishedInsights?.forEach(insight => {
        console.log(`- ${insight.title} (${insight.slug}) - Published: ${insight.published_at}`);
      });
    }

    // Test authors table
    console.log('\n=== AUTHORS TABLE ===');
    const { data: authors, error: authorsError } = await supabase
      .from('authors')
      .select('id, name')
      .limit(5);
    
    if (authorsError) {
      console.error('Authors error:', authorsError);
    } else {
      console.log('Authors count:', authors?.length || 0);
      authors?.forEach(author => {
        console.log(`- ${author.name} (ID: ${author.id})`);
      });
    }

    // Test property_types table
    console.log('\n=== PROPERTY TYPES TABLE ===');
    const { data: propertyTypes, error: propertyTypesError } = await supabase
      .from('property_types')
      .select('id, name')
      .limit(5);
    
    if (propertyTypesError) {
      console.error('Property types error:', propertyTypesError);
    } else {
      console.log('Property types count:', propertyTypes?.length || 0);
      propertyTypes?.forEach(type => {
        console.log(`- ${type.name} (ID: ${type.id})`);
      });
    }

    // Test categories table
    console.log('\n=== CATEGORIES TABLE ===');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name')
      .limit(5);
    
    if (categoriesError) {
      console.error('Categories error:', categoriesError);
    } else {
      console.log('Categories count:', categories?.length || 0);
      categories?.forEach(category => {
        console.log(`- ${category.name} (ID: ${category.id})`);
      });
    }

  } catch (error) {
    console.error('Database test failed:', error);
  }
}

testDatabase();

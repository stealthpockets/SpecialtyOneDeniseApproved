import { supabase } from './src/lib/supabase.ts';

async function testQueries() {
  console.log('🔍 Testing Supabase queries...');
  
  // Query 1: All case studies
  console.log('\n1. ALL case studies:');
  const { data: allData, error: allError } = await supabase
    .from('case_studies')
    .select('id, title, status, is_confidential')
    .order('published_at', { ascending: false });
  
  if (allError) {
    console.error('Error:', allError);
  } else {
    console.log(`Found ${allData.length} total case studies:`);
    allData.forEach(cs => console.log(`- ${cs.title} (${cs.status}, confidential: ${cs.is_confidential})`));
  }
  
  // Query 2: Only completed, non-confidential (current default)
  console.log('\n2. Completed, non-confidential (current default):');
  const { data: defaultData, error: defaultError } = await supabase
    .from('case_studies')
    .select('id, title, status, is_confidential')
    .eq('status', 'completed')
    .eq('is_confidential', false)
    .order('published_at', { ascending: false });
    
  if (defaultError) {
    console.error('Error:', defaultError);
  } else {
    console.log(`Found ${defaultData.length} default case studies:`);
    defaultData.forEach(cs => console.log(`- ${cs.title}`));
  }
  
  // Query 3: Only completed (including confidential)
  console.log('\n3. All completed (including confidential):');
  const { data: completedData, error: completedError } = await supabase
    .from('case_studies')
    .select('id, title, status, is_confidential')
    .eq('status', 'completed')
    .order('published_at', { ascending: false });
    
  if (completedError) {
    console.error('Error:', completedError);
  } else {
    console.log(`Found ${completedData.length} completed case studies:`);
    completedData.forEach(cs => console.log(`- ${cs.title} (confidential: ${cs.is_confidential})`));
  }
}

testQueries().then(() => {
  console.log('\n✅ Test completed');
  process.exit(0);
}).catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});

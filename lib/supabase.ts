import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your project URL and API key
// Replace these with your actual Supabase project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-project-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-project-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Example usage in your React components:
// 
// import { supabase } from '@/lib/supabase';
// 
// // Fetch data from a table
// const { data, error } = await supabase
//   .from('your_table_name')
//   .select('*');
// 
// // Insert data into a table
// const { data, error } = await supabase
//   .from('your_table_name')
//   .insert([{ column1: 'value1', column2: 'value2' }]);
// 
// // Update data in a table
// const { data, error } = await supabase
//   .from('your_table_name')
//   .update({ column1: 'new_value' })
//   .eq('id', 1);
// 
// // Delete data from a table
// const { data, error } = await supabase
//   .from('your_table_name')
//   .delete()
//   .eq('id', 1);


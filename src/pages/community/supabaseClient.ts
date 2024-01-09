import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ahhyzbgcyoyfrzmvrgce.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoaHl6YmdjeW95ZnJ6bXZyZ2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3ODAzMTEsImV4cCI6MjAyMDM1NjMxMX0.uhJ9eLm_LLoN2t8mdnRYs5O4ox8VcGBwJWs0czu85fs';
export const supabase = createClient(supabaseUrl, supabaseKey);

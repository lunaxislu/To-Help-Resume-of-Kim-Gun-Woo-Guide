import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL_TEST as string,
  process.env.REACT_APP_SUPABASE_API_KEY_TEST as string
);

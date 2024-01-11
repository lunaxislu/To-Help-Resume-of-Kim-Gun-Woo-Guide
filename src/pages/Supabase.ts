import { createClient } from '@supabase/supabase-js';
import { Database, UsedItem } from './usedtypes';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

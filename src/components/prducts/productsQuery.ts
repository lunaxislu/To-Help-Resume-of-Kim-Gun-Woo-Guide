import { supabase } from "../../api/supabase/supabaseClient";

export const getProductsPosts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
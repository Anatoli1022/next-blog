import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_COMMENTS || "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY_COMMENTS || "";

export const createClientComments = () => createClient(supabaseUrl, supabaseKey);

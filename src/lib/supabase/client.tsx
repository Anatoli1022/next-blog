//can be used instead of createBrowserClient
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_COMMENTS || '';
// const supabaseKey = process.env.SUPABASE_SERVICE_KEY_COMMENTS || '';

// const supabaseComments = createClient(supabaseUrl, supabaseKey);

// export { supabaseComments };

// import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL_COMMENTS || "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY_COMMENTS || "";

export const createClientComments = () => createClient (supabaseUrl, supabaseKey);

// const supabaseUrlUser = process.env.NEXT_PUBLIC_SUPABASE_URL_USERS || '';
// const supabaseKeyUser = process.env.SUPABASE_SERVICE_KEY_USERS || '';

// export const createClientUser = () =>
//   createBrowserClient(supabaseUrlUser, supabaseKeyUser);

import { createClient } from "@supabase/supabase-js";

// We use the Service Role Key here so the backend AI functions can read/write freely.
// Do NOT use this client directly in browser components.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

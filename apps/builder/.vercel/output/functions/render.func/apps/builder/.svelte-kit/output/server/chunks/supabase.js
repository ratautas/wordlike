import { createClient } from "@supabase/auth-helpers-sveltekit";
const PUBLIC_SUPABASE_URL = "https://cyogxqmbvjuaordoqncy.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5b2d4cW1idmp1YW9yZG9xbmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMxNTgwNDQsImV4cCI6MTk4ODczNDA0NH0.sMaD75y8vo6TFfBUdbcjp2M_sknnu9BqwKbMlEnioto";
const OPTIONS = {
  realtime: {
    params: {
      eventsPerSecond: 1
    }
  }
};
const supabaseClient = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
  OPTIONS
);
export {
  supabaseClient as s
};

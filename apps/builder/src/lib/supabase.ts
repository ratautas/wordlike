import { createClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const OPTIONS = {
  realtime: {
    params: {
      eventsPerSecond: 1,
    }
  }
};

export const supabaseClient = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
  OPTIONS
);
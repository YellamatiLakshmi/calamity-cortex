// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lfelthbmmnlhrsktdjni.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmZWx0aGJtbW5saHJza3Rkam5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDMxMjksImV4cCI6MjA1ODU3OTEyOX0.wXV4k3NROsPk_YTeEvlTtE4bsml1Rr9EzIh5EODVnaE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
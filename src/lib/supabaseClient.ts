import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY, SUPABASE_URL } from "./@const/dynamic.env";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const BASE_URL = "http://localhost:3001";

/**
 * This file stores any environment variables that depends on production / development contexts.
 */

import {
	PUBLIC_DEV_API_HOST,
	PUBLIC_PROD_API_HOST,
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL
} from "$env/static/public";

export const API_HOST = import.meta.env.DEV ? PUBLIC_DEV_API_HOST : PUBLIC_PROD_API_HOST;
export const SUPABASE_URL = PUBLIC_SUPABASE_URL;
export const SUPABASE_KEY = PUBLIC_SUPABASE_ANON_KEY;

export const MOBILE_VIEWPORT_WIDTH = 621;
export const TABLET_VIEWPORT_WIDTH = 1100;

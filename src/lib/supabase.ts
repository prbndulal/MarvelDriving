
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
        // Return dummy client or handle missing config gracefully during build
        console.warn("Supabase credentials missing during build or runtime.");
    }
    
    return createBrowserClient(
        supabaseUrl || '',
        supabaseKey || ''
    )
}

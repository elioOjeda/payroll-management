import { createClient } from '@supabase/supabase-js'
import { QueryClient } from '@tanstack/react-query'
import { ANON_KEY, API_URL } from '../utils/env'
import { Database } from './types'

export const queryClient = new QueryClient()

const supabase = createClient<Database>(API_URL, ANON_KEY)

export const getUserSession = async () => {
  return await supabase.auth.getSession()
}

export default supabase
const {
  REACT_APP_SUPABASE_DEV_API_URL,
  REACT_APP_SUPABASE_DEV_ANON_KEY,
  REACT_APP_SUPABASE_LOCAL_API_URL,
  REACT_APP_SUPABASE_LOCAL_ANON_KEY,
} = process.env;

if (
  !REACT_APP_SUPABASE_DEV_API_URL ||
  !REACT_APP_SUPABASE_DEV_ANON_KEY ||
  !REACT_APP_SUPABASE_LOCAL_API_URL ||
  !REACT_APP_SUPABASE_LOCAL_ANON_KEY
)
  throw new Error(`Missing configuration on .env file`);

type Stage = "dev" | "local";
const stage: Stage = "dev";

const config = {
  dev: {
    apiUrl: REACT_APP_SUPABASE_DEV_API_URL,
    anonKey: REACT_APP_SUPABASE_DEV_ANON_KEY,
  },
  local: {
    apiUrl: REACT_APP_SUPABASE_LOCAL_API_URL,
    anonKey: REACT_APP_SUPABASE_LOCAL_ANON_KEY,
  },
};

export const API_URL = config[stage]?.apiUrl || "http://localhost:54321";
export const ANON_KEY = config[stage]?.anonKey || "";

import { supabase } from '@/lib/supabaseClient';

class ApiService {
  public static getExercices() {
    return supabase.from('dates').select(`
        *,
        exercises (
        *
        )
    `);
  }
}
export default ApiService;

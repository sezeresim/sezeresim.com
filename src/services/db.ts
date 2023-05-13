import { supabase } from '@/lib/supabaseClient';
import { ExercisesItemType } from './db.types';

class ApiService {
  public static getExercices() {
    return supabase.from('dates').select(`*,exercises (*)`).order('id', {
      ascending: false,
    });
  }

  public static addExercices() {
    return supabase.from('dates').insert([{}]);
  }

  public static addRecord({
    dates_id,
    name,
    rep,
    set,
    weight,
  }: Pick<ExercisesItemType, 'dates_id' | 'name' | 'rep' | 'set' | 'weight'>) {
    return supabase.from('exercises').insert([
      {
        dates_id: dates_id,
        name: name,
        rep: rep,
        set: set,
        weight: weight,
      },
    ]);
  }
}
export default ApiService;

export type ExercisesItemType = {
  created_at: string;
  dates_id: number;
  id: number;
  name: string;
  rep: number;
  set: number;
  weight: number;
};

export type GetExercisesItemType = {
  created_at: string;
  exercises: ExercisesItemType[];
  id: number;
};

export {};

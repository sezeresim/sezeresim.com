import { z } from 'zod';

export const exerciseSchema = z.object({
  dates_id: z.number(),
  name: z.string().min(1),
  rep: z
    .number({
      required_error: 'Rep is required',
      invalid_type_error: 'Rep must be a number',
    })
    .positive(),
  set: z
    .number({
      required_error: 'Set is required',
      invalid_type_error: 'Set must be a number',
    })
    .positive(),
  weight: z
    .number({
      required_error: 'Weight is required',
      invalid_type_error: 'Weight must be a number',
    })
    .positive(),
});

export type ExerciseSchema = z.infer<typeof exerciseSchema>;

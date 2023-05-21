import { exerciseSchema } from '@/models/ExerciseSchema.schema';
import ApiService from '@/services/db';

import type { NextApiRequest, NextApiResponse } from 'next';

import { z } from 'zod';

export const deleteRequestSchema = z.object({
  id: z.number(),
});

export type DeleteRequestSchema = z.infer<typeof exerciseSchema>;

type ResponseData = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    try {
      const validation = deleteRequestSchema.safeParse(req.body);
      if (!validation.success) {
        throw Error;
      }
      const response = await ApiService.deleteExercise(req.body.id);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: 'UnexpectedError',
      });
    }
  } else {
    res.status(500).json({
      message: 'Use post method',
    });
  }
}

import { exerciseSchema } from '@/models/ExerciseSchema.schema';
import ApiService from '@/services/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    try {
      const validation = exerciseSchema.safeParse(req.body);
      if (!validation.success) {
        throw Error;
      }
      const response = await ApiService.addRecord(req.body);
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

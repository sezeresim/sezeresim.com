import ApiService from '@/services/db';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const response = await ApiService.addExercices();
    res.status(200).json({
      message: response.statusText,
    });
  } catch (error) {
    res.status(500).json({
      message: 'UnexpectedError',
    });
  }
}

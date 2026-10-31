import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const getInterSemiBoldFont = () =>
  readFile(join(process.cwd(), 'src/assets/Inter-SemiBold.ttf'));

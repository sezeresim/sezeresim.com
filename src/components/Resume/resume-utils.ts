import { differenceInMonths, parse } from 'date-fns';

import type { ResumeEntry } from '@/constants/resume';

export const parseMonth = (value: string) =>
  value === 'Present' ? new Date() : parse(value, 'MMM yyyy', new Date());

/** Whole years of full-time experience, derived from the entries themselves. */
export const yearsOfExperience = (entries: ResumeEntry[]) => {
  const fullTime = entries.filter((e) => !e.minor);
  const earliest = fullTime.reduce<Date | null>((acc, e) => {
    const d = parseMonth(e.start);
    return acc === null || d < acc ? d : acc;
  }, null);
  if (!earliest) return 0;
  return Math.floor(differenceInMonths(new Date(), earliest) / 12);
};

/** "2 yr 3 mo" style duration of an entry (inclusive of the end month). */
export const durationLabel = (entry: ResumeEntry) => {
  const months =
    differenceInMonths(parseMonth(entry.end), parseMonth(entry.start)) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y > 0 ? `${y} yr` : null, m > 0 ? `${m} mo` : null]
    .filter(Boolean)
    .join(' ');
};

/** Only letters, digits, spaces and a few separators; max 40 chars. */
export const sanitizeRecipient = (raw: string | null) => {
  if (!raw) return null;
  const cleaned = raw
    .replace(/[^\p{L}\p{N} .&'-]/gu, '')
    .trim()
    .slice(0, 40);
  return cleaned.length >= 2 ? cleaned : null;
};

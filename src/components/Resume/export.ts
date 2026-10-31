import { SITE } from '@/constants';
import { RESUME, type ResumeEntry } from '@/constants/resume';

const entryLine = (e: ResumeEntry) =>
  `${e.title} — ${e.org}${e.location ? ` · ${e.location}` : ''} · ${e.start} – ${e.end}`;

/** Plain-text resume, 80 columns, for ATS fields and `curl`. */
export const toPlainText = () => {
  const r = RESUME;
  const rule = '-'.repeat(72);
  const lines: string[] = [
    r.name.toUpperCase(),
    r.role,
    `${r.location} · ${r.email}`,
    r.links.map((l) => l.label).join(' · '),
    rule,
    'SUMMARY',
    r.summary,
    '',
    'EXPERIENCE',
  ];
  for (const e of r.experience) {
    lines.push('', entryLine(e));
    if (e.note) lines.push(`  ${e.note}`);
    for (const b of e.bullets ?? []) lines.push(`  - ${b}`);
  }
  lines.push('', 'EDUCATION');
  for (const e of r.education) lines.push(entryLine(e));
  lines.push('', 'SKILLS');
  for (const g of r.skills) lines.push(`${g.group}: ${g.items.join(', ')}`);
  lines.push('', 'LANGUAGES');
  for (const l of r.languages) lines.push(`${l.name} — ${l.level}`);
  lines.push('', `INTERESTS: ${r.interests.join(', ')}`);
  return lines.join('\n');
};

export const toMarkdown = () => {
  const r = RESUME;
  const lines: string[] = [
    `# ${r.name}`,
    `**${r.role}** · ${r.location} · ${r.email}`,
    r.links.map((l) => `[${l.label}](${l.url})`).join(' · '),
    '',
    '## Summary',
    r.summary,
    '',
    '## Experience',
  ];
  for (const e of r.experience) {
    lines.push('', `### ${e.title} — ${e.org}`);
    lines.push(
      `*${e.start} – ${e.end}${e.location ? ` · ${e.location}` : ''}${e.note ? ` · ${e.note}` : ''}*`,
    );
    for (const b of e.bullets ?? []) lines.push(`- ${b}`);
  }
  lines.push('', '## Education');
  for (const e of r.education)
    lines.push(`- **${e.title}** — ${e.org} · ${e.start} – ${e.end}`);
  lines.push('', '## Skills');
  for (const g of r.skills)
    lines.push(`- **${g.group}:** ${g.items.join(', ')}`);
  lines.push('', '## Languages');
  for (const l of r.languages) lines.push(`- ${l.name} — ${l.level}`);
  return lines.join('\n');
};

/** vCard 3.0. Deliberately excludes the secret CV URL. */
export const toVCard = () => {
  const r = RESUME;
  const [first, ...rest] = r.name.split(' ');
  const current = r.experience[0];
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${rest.join(' ')};${first};;;`,
    `FN:${r.name}`,
    `TITLE:${r.role}`,
    current ? `ORG:${current.org}` : null,
    `EMAIL;TYPE=INTERNET:${r.email}`,
    ...r.links.map((l) => `URL:${l.url}`),
    `ADR;TYPE=HOME:;;;;;;${r.location}`,
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\r\n');
};

/** JSON Resume (https://jsonresume.org/schema) derived from the same data. */
export const toJsonResume = () => {
  const r = RESUME;
  const profile = (label: string) =>
    r.links.find((l) => l.label.includes(label));
  return {
    $schema:
      'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: r.name,
      label: r.role,
      email: r.email,
      url: SITE.url,
      summary: r.summary,
      location: { countryCode: 'TR', region: r.location },
      profiles: [
        { network: 'LinkedIn', url: profile('linkedin')?.url },
        { network: 'GitHub', url: profile('github')?.url },
      ].filter((p) => p.url),
    },
    work: r.experience.map((e) => ({
      name: e.org,
      position: e.title,
      location: e.location,
      startDate: e.start,
      endDate: e.end === 'Present' ? undefined : e.end,
      summary: e.note,
      highlights: e.bullets,
    })),
    education: r.education.map((e) => ({
      institution: e.org,
      area: e.title,
      startDate: e.start,
      endDate: e.end,
    })),
    skills: r.skills.map((g) => ({ name: g.group, keywords: g.items })),
    languages: r.languages.map((l) => ({
      language: l.name,
      fluency: l.level,
    })),
    interests: r.interests.map((name) => ({ name })),
  };
};

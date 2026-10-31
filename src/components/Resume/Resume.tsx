'use client';
import { useCallback, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { format } from 'date-fns';
import { ChevronDown, Mail, MapPin } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import UnstyledLink from '@/components/Links/UnstyledLink';
import { Stagger, StaggerItem } from '@/components/Motion/Stagger';
import ThemeSwitch from '@/components/ThemeSwitch';
import { RESUME, type ResumeEntry } from '@/constants/resume';
import { cn } from '@/lib/utils';

import CopyButton from './CopyButton';
import CoverSlip from './CoverSlip';
import DeskLamp from './DeskLamp';
import ExportMenu from './ExportMenu';
import GitLog from './GitLog';
import KeysHelp from './KeysHelp';
import PaperFeed from './PaperFeed';
import PrintButton from './PrintButton';
import { durationLabel, yearsOfExperience } from './resume-utils';
import Shortcuts from './Shortcuts';
import SoundToggle from './SoundToggle';
import StampSlam from './StampSlam';
import TenureStrip from './TenureStrip';
import TimelineLine from './TimelineLine';
import TypedName from './TypedName';
import { useKeySequence } from './useKeySequence';
import { useTypewriterSound } from './useTypewriterSound';

type Props = {
  /** Build date (yyyy-MM-dd), passed from the server so the page never looks stale. */
  updated: string;
};

/** Three.js is only downloaded when someone actually launches the plane. */
const PlaneFlight = dynamic(() => import('./PlaneFlight'), { ssr: false });

const NAME_SPEED_MS = 95;
const NAME_DELAY_MS = 600;

const SectionTitle = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <h2
    id={id}
    className='mb-5 flex scroll-mt-24 items-center gap-3 text-[13px] font-bold tracking-[0.22em] text-ink uppercase'
  >
    <span className='text-ribbon'>##</span>
    <a href={`#${id}`} className='hover:text-ribbon'>
      {children}
    </a>
    <span
      aria-hidden
      className='h-px flex-1 border-t border-dashed border-ink/25'
    />
  </h2>
);

const Entry = ({
  entry,
  last,
  dimmed,
}: {
  entry: ResumeEntry;
  last?: boolean;
  dimmed: boolean;
}) => (
  <article
    className={cn(
      'relative pl-7 transition-opacity duration-300 sm:grid sm:grid-cols-[9.5rem_1fr] sm:gap-6 sm:pl-0',
      dimmed && 'opacity-30',
    )}
  >
    {/* timeline marker: hover/focus reveals the duration */}
    <span
      tabIndex={0}
      aria-label={`Duration: ${durationLabel(entry)}`}
      className='marker group/marker absolute top-1 left-0 z-10 h-3.5 w-3.5 cursor-default rounded-full border-2 border-ribbon bg-paper transition-transform duration-150 outline-none hover:scale-125 focus-visible:scale-125 sm:left-[calc(10.25rem-7px)] print:hidden'
    >
      <span
        aria-hidden
        className='pointer-events-none absolute top-1/2 left-5 translate-x-[-4px] -translate-y-1/2 rounded border border-ribbon/50 bg-paper px-1.5 py-0.5 text-[10px] whitespace-nowrap text-ribbon opacity-0 transition-all duration-150 group-hover/marker:translate-x-0 group-hover/marker:opacity-100 group-focus-visible/marker:translate-x-0 group-focus-visible/marker:opacity-100'
      >
        {durationLabel(entry)}
      </span>
    </span>
    <span
      aria-hidden
      className='absolute top-1.5 left-0.5 hidden h-2.5 w-2.5 rounded-full border-2 border-ribbon bg-paper sm:left-[calc(10.25rem-5px)] print:block'
    />
    {!last ? (
      <TimelineLine className='absolute top-5 bottom-[-1.75rem] left-[6px] border-l border-dashed border-ink/25 sm:left-[calc(10.25rem-0.5px)] print:hidden' />
    ) : null}
    <p className='text-xs text-ink/60 tabular-nums sm:pt-0.5 sm:text-right'>
      {entry.start} – {entry.end}
    </p>
    <div className='mt-1 sm:mt-0'>
      <h3 className='overstrike text-ink'>
        {entry.title}
        <span className='font-normal text-ink/60 [text-shadow:none]'>
          {' '}
          @ {entry.org}
        </span>
      </h3>
      {entry.location || entry.note ? (
        <p className='text-xs text-ink/60'>
          {[entry.location, entry.note].filter(Boolean).join(' · ')}
        </p>
      ) : null}
      {entry.bullets ? (
        <ul className='mt-2 space-y-1.5 text-[13.5px] leading-relaxed text-ink/85'>
          {entry.bullets.map((b) => (
            <li key={b} className='flex gap-2'>
              <span aria-hidden className='text-ribbon select-none'>
                ·
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  </article>
);

const Resume = ({ updated }: Props) => {
  const r = RESUME;
  const reduceMotion = useReducedMotion();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showEarlier, setShowEarlier] = useState(false);
  const [logView, setLogView] = useState(false);
  const [nameKey, setNameKey] = useState(0);
  const sound = useTypewriterSound();

  const [flying, setFlying] = useState(false);
  const [foldOrigin, setFoldOrigin] = useState('50% 50%');
  const sheetRef = useRef<HTMLDivElement>(null);

  /** Fold the sheet into a paper plane: it collapses toward the viewport centre. */
  const fly = useCallback(() => {
    if (flying || reduceMotion) return;
    const rect = sheetRef.current?.getBoundingClientRect();
    if (rect) {
      setFoldOrigin(
        `${window.innerWidth / 2 - rect.left}px ${window.innerHeight / 2 - rect.top}px`,
      );
    }
    sound.tick(0, 0.2);
    setFlying(true);
  }, [flying, reduceMotion, sound]);
  const land = useCallback(() => {
    setFlying(false);
    sound.ding(0.1);
  }, [sound]);

  const toggleLog = useCallback(() => setLogView((v) => !v), []);
  const closeLog = useCallback(() => setLogView(false), []);
  useKeySequence(
    'git log',
    useCallback(() => setLogView(true), []),
  );

  /** Enabling sound re-types the name with clicks and a bell at the end. */
  const toggleSound = useCallback(() => {
    const on = sound.toggle();
    if (!on || reduceMotion) return;
    setNameKey((k) => k + 1);
    for (let i = 0; i < r.name.length; i++) {
      if (r.name[i] !== ' ') {
        sound.tick((NAME_DELAY_MS + i * NAME_SPEED_MS) / 1000);
      }
    }
    sound.ding((NAME_DELAY_MS + r.name.length * NAME_SPEED_MS) / 1000 + 0.1);
  }, [sound, reduceMotion, r.name]);

  const main = r.experience.filter((e) => !e.minor);
  const earlier = r.experience.filter((e) => e.minor);
  const years = yearsOfExperience(r.experience);
  const current = main[0];
  const isDimmed = (e: ResumeEntry) =>
    hoveredSkill !== null && !(e.tags ?? []).includes(hoveredSkill);
  const otherSkills = r.skills
    .map((g) => ({
      group: g.group,
      items: g.items.filter((i) => !r.coreSkills.includes(i)),
    }))
    .filter((g) => g.items.length > 0);
  const visibleExperience = showEarlier ? r.experience : main;

  return (
    <div className='cv relative overflow-x-clip font-mono'>
      <a
        href='#summary'
        className='sr-only z-50 rounded bg-paper px-3 py-2 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4'
      >
        Skip to content
      </a>
      <Shortcuts
        onToggleLog={toggleLog}
        onEscape={closeLog}
        onToggleSound={toggleSound}
        onFly={fly}
      />
      <AnimatePresence>
        {flying ? (
          <PlaneFlight
            key='flight'
            targets={r.coreSkills}
            onExit={land}
            onCollect={() => sound.tick(0, 0.2)}
          />
        ) : null}
      </AnimatePresence>
      <DeskLamp />

      {/* floating toolbar */}
      <div className='fixed top-4 right-4 z-40 flex items-center gap-2 print:hidden'>
        <ExportMenu />
        <PrintButton />
        <SoundToggle enabled={sound.enabled} onToggle={toggleSound} />
        <ThemeSwitch />
        <KeysHelp />
      </div>

      <PaperFeed
        className={cn(
          'paper-stack mx-auto mt-16 mb-8 max-w-6xl sm:my-12',
          flying && 'is-flying',
        )}
      >
        <CoverSlip updated={updated} />

        <motion.div
          ref={sheetRef}
          className='paper px-6 py-10 text-ink sm:px-16 sm:py-16'
          style={{ transformOrigin: foldOrigin }}
          animate={
            flying
              ? { scale: 0.02, rotate: -25, opacity: 0 }
              : { scale: 1, rotate: 0, opacity: 1 }
          }
          transition={
            flying
              ? { duration: 0.45, ease: [0.4, 0, 1, 1] }
              : { delay: 0.05, type: 'spring', stiffness: 120, damping: 16 }
          }
        >
          <header className='border-b border-dashed border-ink/25 pb-8 sm:grid sm:grid-cols-[1fr_auto] sm:gap-10 print:grid print:break-inside-avoid print:grid-cols-[1fr_auto] print:gap-6'>
            <div>
              <h1 className='font-display text-[2.6rem] leading-none font-bold tracking-tight sm:text-6xl'>
                <TypedName key={nameKey} text={r.name} />
              </h1>
              <p className='mt-3 font-display text-lg tracking-[0.04em] text-ink/70 sm:text-xl'>
                {r.role}
              </p>
              <ul className='mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-ink/70'>
                <li className='inline-flex items-center gap-1.5'>
                  <MapPin className='h-3.5 w-3.5' aria-hidden />
                  {r.location}
                </li>
                <li className='inline-flex items-center gap-1.5'>
                  <Mail className='h-3.5 w-3.5' aria-hidden />
                  <a
                    href={`mailto:${r.email}`}
                    className='underline decoration-dotted underline-offset-4 hover:text-ribbon'
                  >
                    {r.email}
                  </a>
                  <CopyButton value={r.email} label='Copy email address' />
                </li>
                {r.links.map((l) => (
                  <li key={l.url}>
                    <UnstyledLink
                      href={l.url}
                      className='underline decoration-dotted underline-offset-4 hover:text-ribbon'
                    >
                      {l.label}
                    </UnstyledLink>
                  </li>
                ))}
                <li className='text-ink/60'>
                  {r.languages.map((l) => l.name).join(' · ')}
                </li>
              </ul>
            </div>

            {/* fact card, taped to the sheet */}
            <aside
              aria-label='At a glance'
              className='index-card mt-6 sm:mt-0 sm:w-60 sm:self-start print:mt-0 print:w-56'
            >
              <span aria-hidden className='tape' />
              <dl className='space-y-0 text-[12px] leading-5'>
                <div>
                  <dt className='text-[10px] tracking-wider text-ink/50 uppercase'>
                    Experience
                  </dt>
                  <dd className='overstrike'>{years}+ years full-time</dd>
                </div>
                {current ? (
                  <div>
                    <dt className='text-[10px] tracking-wider text-ink/50 uppercase'>
                      Currently
                    </dt>
                    <dd className='overstrike'>
                      {current.title} @ {current.org}
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className='text-[10px] tracking-wider text-ink/50 uppercase'>
                    Core
                  </dt>
                  <dd>{r.coreSkills.slice(0, 4).join(' · ')}</dd>
                </div>
              </dl>
            </aside>
          </header>

          <Stagger
            gap={0.12}
            className='mt-10 grid gap-12 md:grid-cols-[1fr_17rem] md:gap-16 print:mt-6 print:grid-cols-[1fr_13rem] print:gap-8'
          >
            <div className='max-w-[64ch] space-y-12 print:space-y-5'>
              <StaggerItem>
                <section aria-labelledby='summary'>
                  <SectionTitle id='summary'>Summary</SectionTitle>
                  <p className='text-[13.5px] leading-relaxed text-ink/85'>
                    {r.summary}
                  </p>
                </section>
              </StaggerItem>

              <StaggerItem>
                <section aria-labelledby='experience'>
                  <SectionTitle id='experience'>Experience</SectionTitle>
                  <TenureStrip work={r.experience} education={r.education} />

                  {/* git log view (screen only) */}
                  <AnimatePresence mode='wait' initial={false}>
                    {logView ? (
                      <motion.div
                        key='log'
                        className='print:hidden'
                        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <GitLog entries={r.experience} />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div
                    className={cn(
                      'space-y-7 print:block print:space-y-4',
                      logView && 'hidden',
                    )}
                  >
                    {visibleExperience.map((e, i) => (
                      <Entry
                        key={`${e.org}-${e.start}`}
                        entry={e}
                        last={i === visibleExperience.length - 1}
                        dimmed={isDimmed(e)}
                      />
                    ))}

                    {earlier.length > 0 && !showEarlier ? (
                      <>
                        <button
                          type='button'
                          onClick={() => setShowEarlier(true)}
                          className='ml-7 inline-flex items-center gap-1.5 text-left text-xs text-ink/60 underline decoration-dotted underline-offset-4 hover:text-ribbon sm:ml-[11rem] print:hidden'
                        >
                          <ChevronDown className='h-3.5 w-3.5' aria-hidden />
                          Earlier: {earlier.length} internships (
                          {earlier.map((e) => e.org).join(', ')})
                        </button>
                        {/* print always shows them */}
                        <div className='hidden space-y-4 print:block'>
                          {earlier.map((e, i) => (
                            <Entry
                              key={`print-${e.org}-${e.start}`}
                              entry={e}
                              last={i === earlier.length - 1}
                              dimmed={false}
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                  </div>
                </section>
              </StaggerItem>

              <StaggerItem>
                <section aria-labelledby='education'>
                  <SectionTitle id='education'>Education</SectionTitle>
                  <div className='space-y-6 print:space-y-3'>
                    {r.education.map((e, i) => (
                      <Entry
                        key={`${e.org}-${e.start}`}
                        entry={e}
                        last={i === r.education.length - 1}
                        dimmed={false}
                      />
                    ))}
                  </div>
                </section>
              </StaggerItem>
            </div>

            <aside className='space-y-10 print:space-y-5'>
              <StaggerItem>
                <section aria-labelledby='skills'>
                  <SectionTitle id='skills'>Skills</SectionTitle>
                  <p className='mb-2 text-xs font-semibold tracking-wider text-ink/60 uppercase'>
                    Core
                  </p>
                  <ul
                    className='flex flex-wrap gap-2'
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {r.coreSkills.map((item) => (
                      <li key={item}>
                        <button
                          type='button'
                          className='keycap'
                          aria-pressed={hoveredSkill === item}
                          onMouseEnter={() => {
                            setHoveredSkill(item);
                            sound.tick(0, 0.12);
                          }}
                          onFocus={() => setHoveredSkill(item)}
                          onBlur={() => setHoveredSkill(null)}
                          onClick={() =>
                            setHoveredSkill((s) => (s === item ? null : item))
                          }
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className='mt-2 hidden text-[11px] text-ink/50 sm:block print:hidden'>
                    Hover a key to see where it was used.
                  </p>
                  <dl className='mt-5 space-y-2.5 text-[12.5px]'>
                    {otherSkills.map((g) => (
                      <div key={g.group}>
                        <dt className='text-[11px] font-semibold tracking-wider text-ink/60 uppercase'>
                          {g.group}
                        </dt>
                        <dd className='text-ink/85'>{g.items.join(', ')}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </StaggerItem>

              <StaggerItem>
                <section aria-labelledby='languages'>
                  <SectionTitle id='languages'>Languages</SectionTitle>
                  <ul className='space-y-1.5 text-[13px]'>
                    {r.languages.map((l) => (
                      <li key={l.name}>
                        <span className='overstrike'>{l.name}</span>
                        <span className='text-ink/60'> — {l.level}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </StaggerItem>

              <StaggerItem>
                <section aria-labelledby='interests'>
                  <SectionTitle id='interests'>Interests</SectionTitle>
                  <p className='text-[13px] leading-relaxed text-ink/85'>
                    {r.interests.join(' / ')}
                  </p>
                </section>
              </StaggerItem>
            </aside>
          </Stagger>

          <footer className='mt-14 flex justify-end print:mt-6'>
            <StampSlam>CV · {format(new Date(updated), 'yyyy')}</StampSlam>
          </footer>

          {/* dog-ear: fold the sheet into a paper plane */}
          {!reduceMotion ? (
            <button
              type='button'
              onClick={fly}
              aria-label='Fold the sheet into a paper plane'
              title='Fold into a paper plane (F)'
              className='dog-ear print:hidden'
            />
          ) : null}
        </motion.div>
      </PaperFeed>
    </div>
  );
};

export default Resume;

import { ExercisesItemType } from '@/services/db.types';
import { useInView } from 'framer-motion';
import React, { useRef } from 'react';
import dayjs from 'dayjs';

type Props = {
  date: string;
  exercices: ExercisesItemType[];
};

const GymLogCard = (props: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className='border-2 dark:border-gray-500 border-gray-800 mb-4 px-4 py-6 bg-gray-200 dark:bg-gray-800 rounded-md'
      style={{
        transform: isInView ? 'none' : 'translateX(-200px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
      }}
      ref={ref}
    >
      <time className='text-xl font-bold'>
        {dayjs(props.date).format('MMMM D, YYYY')}
      </time>
      <ul className='mt-4'>
        {props.exercices.map((el, elKey) => {
          return (
            <li key={elKey} className='not-last:mb-5'>
              <span className='font-medium '> {el.name} </span> {' : '}
              <span className='font-semibold italic text-orange-500'>{el.set}</span>
              {' x '}
              <span className='font-semibold italic text-orange-500'>{el.rep}</span>
              {' x '}
              <span className='font-semibold italic text-orange-500'>{el.weight}</span>
              {' kg'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GymLogCard;

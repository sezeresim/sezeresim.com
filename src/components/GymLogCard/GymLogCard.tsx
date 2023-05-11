import { format, parseISO } from 'date-fns';
import { useInView } from 'framer-motion';
import React, { useRef } from 'react';

type Props = {
  date: string;
  exercices: {
    name: string;
    setCount: number;
    reps: number;
    weight: number;
  }[];
};

const GymLogCard = (props: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      className='border mb-4 px-4 py-6'
      style={{
        transform: isInView ? 'none' : 'translateX(-200px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
      }}
      ref={ref}
    >
      <time
        dateTime={format(parseISO(props.date as string), 'MMMM dd, yyyy')}
        className='text-xl font-bold'
      >
        {format(parseISO(props.date as string), 'MMMM dd, yyyy')}
      </time>

      <ul className='mt-4'>
        {props.exercices.map((el, elKey) => {
          return (
            <li key={elKey} className='not-last:mb-5'>
              <span className='font-medium '> {el.name} </span> {' : '}
              <span className='font-semibold italic text-orange-500'>{el.setCount}</span>
              {' x '}
              <span className='font-semibold italic text-orange-500'>{el.reps}</span>
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

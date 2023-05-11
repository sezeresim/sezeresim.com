import GymLogCard from '@/components/GymLogCard/GymLogCard';
import Seo from '@/components/Seo';
import Transition from '@/components/Transition/Transition';
import React from 'react';

const gymLogData = {
  date: '2023-05-12',
  exercices: [
    { name: 'Leg Press', setCount: 3, reps: 12, weight: 35 },
    { name: 'Leg Press', setCount: 3, reps: 12, weight: 35 },
    { name: 'Leg Press', setCount: 3, reps: 12, weight: 35 },
    { name: 'Leg Press', setCount: 3, reps: 12, weight: 35 },
    { name: 'Leg Press', setCount: 3, reps: 12, weight: 35 },
    { name: 'Leg Press', setCount: 3, reps: 12, weight: 35 },
    { name: 'Leg Press', setCount: 3, reps: 12, weight: 35 },
    { name: 'Leg Press', setCount: 3, reps: 12, weight: 35 },
  ],
};

const GymLogs = () => {
  return (
    <Transition>
      <Seo templateTitle='Projects' />
      <div className='min-h-main'>
        <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
          <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
            Gym Logs
          </h1>
        </div>
        {new Array(50).fill(gymLogData).map((gymLog, key) => (
          <GymLogCard key={key} date={gymLog.date} exercices={gymLog.exercices} />
        ))}
      </div>
    </Transition>
  );
};

export default GymLogs;

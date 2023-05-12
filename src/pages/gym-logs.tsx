import GymLogCard from '@/components/GymLogCard/GymLogCard';
import Seo from '@/components/Seo';
import Transition from '@/components/Transition/Transition';
import ApiService from '@/services/db';
import { GetExercisesItemType } from '@/services/db.types';
import React from 'react';

type IProps = {
  dates: GetExercisesItemType[];
};

const GymLogs = ({ dates }: IProps) => {
  return (
    <Transition>
      <Seo templateTitle='Projects' />
      <div className='min-h-main'>
        <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
          <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
            Gym Logs
          </h1>
        </div>
        {dates?.map((gymLog) => (
          <GymLogCard
            key={gymLog.id}
            date={gymLog.created_at}
            exercices={gymLog.exercises}
          />
        ))}
      </div>
    </Transition>
  );
};

export async function getServerSideProps() {
  const { data } = await ApiService.getExercices();

  return {
    props: {
      dates: data,
    },
  };
}

export default GymLogs;

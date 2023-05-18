import Button from '@/components/Button/Button';
import GymLogCard from '@/components/GymLogCard/GymLogCard';

import Seo from '@/components/Seo';
import Transition from '@/components/Transition/Transition';
import ApiService from '@/services/db';
import { GetExercisesItemType } from '@/services/db.types';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

type IProps = {
  dates: GetExercisesItemType[];
};

const GymLogs = ({ dates }: IProps) => {
  const router = useRouter();

  const addRecordHandler = async () => {
    try {
      const res = await axios.post('/api/exercises');
      console.log(res.data);
      router.replace(router.asPath);
    } catch (error) {
      console.log(error);
      router.replace(router.asPath);
    }
  };
  return (
    <Transition>
      <Seo templateTitle='Projects' />
      <div className='min-h-main'>
        <div className='pb-8 pt-6 space-y-2 md:space-y-5'>
          <h1 className='font-extrabold leading-9 text-3xl text-gray-900 tracking-tight sm:leading-10 sm:text-4xl md:leading-14 md:text-6xl dark:text-gray-100'>
            Gym Logs
          </h1>
        </div>
        <div className='flex justify-end mb-4'>
          <Button variant='green' onClick={addRecordHandler}>
            New Day
          </Button>
        </div>
        {dates?.map((gymLog) => (
          <GymLogCard
            key={gymLog.id}
            id={gymLog.id}
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

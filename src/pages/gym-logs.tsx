import Button from '@/components/Button/Button';
import GymLogCard from '@/components/GymLogCard/GymLogCard';

import Seo from '@/components/Seo';
import Transition from '@/components/Transition/Transition';
import ApiService from '@/services/db';
import { GetExercisesItemType } from '@/services/db.types';
import axios from 'axios';

import React, { useState } from 'react';

type IProps = {
  dates: GetExercisesItemType[];
};

const GymLogs = ({ dates }: IProps) => {
  const [data, setData] = useState(dates);

  const addRecordHandler = async () => {
    try {
      const res = await axios.post('/api/exercises');
      setData((e) => [...res.data.data, ...e]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecordHandler = async (id: number) => {
    try {
      const isOk = window.confirm('Are you sure?');
      if (isOk) {
        const res = await axios.post('/api/delete', { id: id });
        setData((e) => e.filter(({ id }) => id != res.data.data[0].id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addExerciseHandler = async (formData: {
    name: string;
    dates_id: number;
    rep: number;
    set: number;
    weight: number;
  }) => {
    try {
      const res = await axios.post('/api/addrecord', formData);
      setData((e) =>
        e.map((el) =>
          el.id == formData.dates_id
            ? {
                ...el,
                exercises: [...res.data.data, ...el.exercises],
              }
            : el
        )
      );
    } catch (error) {
      console.log(error);
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
        {data?.map((gymLog) => (
          <GymLogCard
            key={gymLog.id}
            id={gymLog.id}
            date={gymLog.created_at}
            exercices={gymLog.exercises}
            onDelete={deleteRecordHandler}
            onAdd={addExerciseHandler}
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

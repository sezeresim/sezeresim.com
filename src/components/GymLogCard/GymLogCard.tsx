import { ExercisesItemType } from '@/services/db.types';
import { useInView } from 'framer-motion';
import React, { useRef } from 'react';
import dayjs from 'dayjs';
import Button from '../Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Textfield from '../Textfield/Textfield';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ExerciseSchema, exerciseSchema } from '@/models/ExerciseSchema.schema';

type Props = {
  date: string;
  id: number;
  exercices: ExercisesItemType[];
};

const GymLogCard = (props: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExerciseSchema>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      dates_id: props.id,
    },
  });

  const onSubmit: SubmitHandler<ExerciseSchema> = async (formData) => {
    try {
      console.log(formData);
      const res = await axios.post('/api/addrecord', formData);
      router.replace(router.asPath);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className='bg-gray-200 border-2 border-gray-800 mb-4 px-4 py-6 rounded-md dark:bg-gray-800 dark:border-gray-500'
      style={{
        transform: isInView ? 'none' : 'translateX(-200px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
      }}
      ref={ref}
    >
      <time className='font-bold text-xl'>
        {props.id} | {dayjs(props.date).format('MMMM D, YYYY')}
      </time>
      <ul className='mt-4'>
        {props.exercices.map((el, elKey) => {
          return (
            <li key={elKey} className='not-last:mb-5'>
              <span className='font-medium'> {el.name} </span> {' : '}
              <span className='font-semibold italic text-orange-500'>
                {el.set}
              </span>
              {' x '}
              <span className='font-semibold italic text-orange-500'>
                {el.rep}
              </span>
              {' x '}
              <span className='font-semibold italic text-orange-500'>
                {el.weight}
              </span>
              {' kg'}
            </li>
          );
        })}
      </ul>
      <form className='mb-4 mt-4 pb-8' onSubmit={handleSubmit(onSubmit)}>
        <input hidden {...register('dates_id')} />
        <Textfield
          label='Name'
          {...register('name')}
          error={errors.name?.message}
        />
        <Textfield
          label='Rep'
          {...register('rep', {
            setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
          })}
          error={errors.rep?.message}
        />
        <Textfield
          label='Set'
          {...register('set', {
            setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
          })}
          error={errors.set?.message}
        />
        <Textfield
          label='Weight'
          {...register('weight', {
            setValueAs: (v) => (v === '' ? undefined : parseInt(v, 10)),
          })}
          error={errors.weight?.message}
        />
        <div className='mb-6 text-center'>
          <Button type='submit'>Add Exercises</Button>
        </div>
      </form>
    </div>
  );
};

export default GymLogCard;

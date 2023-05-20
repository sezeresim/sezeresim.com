import { ExercisesItemType } from '@/services/db.types';
import { useInView } from 'framer-motion';
import React, { useRef, useState } from 'react';
import dayjs from 'dayjs';
import Button from '../Button/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Textfield from '../Textfield/Textfield';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ExerciseSchema, exerciseSchema } from '@/models/ExerciseSchema.schema';
import Modal from '../Modal/Modal';
import Select from '../Select/Select';
import { exercisesData } from '@/constants/exercises.data';
import AntDesignDeleteTwotone from '../Icons/AntDesignDeleteTwotone';
import AntDesignPlusOutlined from '../Icons/AntDesignPlusOutlined';

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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ExerciseSchema> = async (formData) => {
    try {
      console.log(formData);
      const res = await axios.post('/api/addrecord', formData);
      router.replace(router.asPath);
      console.log(res.data);
      setIsOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExerciseHandler = async () => {
    try {
      const isOk = window.confirm('Are you sure?');
      if (isOk) {
        const res = await axios.post('/api/delete', { id: props.id });
        router.replace(router.asPath);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className='bg-white border border-gray-200 mb-4 p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
        style={{
          transform: isInView ? 'none' : 'translateX(-200px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
        }}
        ref={ref}
      >
        <header className='flex items-end justify-between'>
          <time className='font-bold text-xl'>
            {dayjs(props.date).format('MMMM D, YYYY')}
          </time>
          <div className='flex gap-2'>
            <Button variant='blue' onClick={() => setIsOpenModal(true)}>
              <AntDesignPlusOutlined />
            </Button>
            <Button variant='red' onClick={deleteExerciseHandler}>
              <AntDesignDeleteTwotone />
            </Button>
          </div>
        </header>
        <main className='mt-4'>
          {props.exercices.length == 0 && <div>No Data</div>}
          {props.exercices.length > 0 && (
            <ul>
              {props.exercices.map((el, elKey) => (
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
              ))}
            </ul>
          )}
        </main>
      </div>
      <Modal
        title='New Record'
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input hidden {...register('dates_id')} />
          <Select
            label='Name'
            {...register('name')}
            error={errors.name?.message}
            data={exercisesData.map((e) => ({ ...e, value: e.name }))}
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
          <div className='flex justify-center'>
            <Button variant='green' type='submit'>
              Add Exercises
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default GymLogCard;

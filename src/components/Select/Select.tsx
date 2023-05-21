import clsxm from '@/lib/clsxm';
import React, { useId } from 'react';

export type SelectProps = {
  error?: string;
  label?: string;
  data: { name: string; value: string }[];
} & React.ComponentPropsWithRef<'select'>;

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const {
      error,
      id,
      data = [],
      label,
      className,
      placeholder = 'Select value',
      ...rest
    } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const generetedId = id ? id : useId();

    return (
      <div className='gap-y-2 mb-4'>
        <div className='mb-4 md:mb-0 md:mr-2'>
          <label
            className={clsxm('block font-bold mb-2 text-gray-500 text-sm', [
              error && ['text-red-700 dark:text-red-500'],
            ])}
            htmlFor={generetedId}
          >
            {label}
          </label>
          <select
            className={clsxm(
              'bg-gray-50 block border border-gray-300 p-2.5 rounded-lg text-gray-900 text-sm w-full dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white focus:border-blue-500 focus:ring-blue-500',
              [
                error && [
                  'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500',
                ],
              ],
              className
            )}
            id={generetedId}
            ref={ref}
            {...rest}
          >
            <option value=''>{placeholder}</option>
            {data?.map((e, key) => (
              <option value={e.value} key={key}>
                {e.name}
              </option>
            ))}
          </select>
          {error && (
            <p className='mt-2 text-red-600 text-sm dark:text-red-500'>
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Select;

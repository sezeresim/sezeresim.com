import React, { useId } from 'react';

export type TextfieldProps = {
  error?: string;
  label?: string;
} & React.ComponentPropsWithRef<'input'>;

const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  (props, ref) => {
    const { error, id, label, ...rest } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const generetedId = id ? id : useId();

    return (
      <div className='gap-y-2 mb-4'>
        <div className='mb-4 md:mb-0 md:mr-2'>
          <label
            className='block font-bold mb-2 text-gray-500 text-sm'
            htmlFor={generetedId}
          >
            {label}
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              error && 'border-red-500'
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id={generetedId}
            type='text'
            placeholder='Name'
            ref={ref}
            {...rest}
          />
          {error && <p className='italic mt-2 text-red-500 text-xs'>{error}</p>}
        </div>
      </div>
    );
  }
);

export default Textfield;

import { motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

function Modal(props: Props) {
  const { isOpen, onClose, children, title } = props;

  const onCloseHandler = () => {
    onClose();
  };

  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  if (typeof window === 'object') {
    return (
      <>
        {isOpen &&
          createPortal(
            <motion.div
              variants={dropIn}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='bg-opacity-90 bg-zinc-950 fixed flex h-[calc(100%)] items-center justify-center max-h-full overflow-x-hidden overflow-y-auto p-4 right-0 top-0 w-full z-50 md:inset-0'
            >
              <div className='max-h-full max-w-2xl relative w-full'>
                <div className='bg-white relative rounded-md dark:bg-gray-700'>
                  <div className='border-b flex items-start justify-between p-4 rounded-t dark:border-gray-600'>
                    <h3 className='font-semibold text-gray-900 text-xl dark:text-white'>
                      {title}
                    </h3>
                    <button
                      type='button'
                      onClick={onCloseHandler}
                      className='bg-transparent inline-flex items-center ml-auto p-1.5 rounded-lg text-gray-400 text-sm dark:hover:bg-gray-600 dark:hover:text-white hover:bg-gray-200 hover:text-gray-900'
                    >
                      <svg
                        className='h-5 w-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      <span className='sr-only'>Close modal</span>
                    </button>
                  </div>
                  <div className='p-8 space-y-6'>{children}</div>
                </div>
              </div>
            </motion.div>,
            document.getElementById('portal') as any
          )}
      </>
    );
  }
  return null;
}
export default Modal;

import { FC } from 'react'

import { ITimeLine, ITimeLineItem } from './TimeLine.interface'

const TimeLineItem: FC<ITimeLineItem> = (props) => {
  const { dateFrom, dateTo, title, position } = props
  return (
    <li className='mb-10 ml-4'>
      <div className='-left-1.5 absolute bg-gray-200 border border-white h-3 mt-1.5 rounded-full w-3 dark:bg-gray-700 dark:border-gray-900'></div>
      <time className='font-normal leading-none mb-1 text-gray-400 text-sm dark:text-gray-500'>
        {dateFrom} / {dateTo ?? 'present'}
      </time>
      <h3 className='font-semibold text-gray-900 text-lg dark:text-white'>
        {title}
      </h3>
      <p className='font-normal mb-4 text-base text-gray-500 dark:text-gray-400'>
        {position}
      </p>
    </li>
  )
}

const TimeLine: FC<ITimeLine> = (props) => {
  const { list } = props
  return (
    <ol className='border-gray-200 border-l relative dark:border-gray-700'>
      {list.map((el: ITimeLineItem, key: number) => (
        <TimeLineItem key={key} {...el} />
      ))}
    </ol>
  )
}

export default TimeLine

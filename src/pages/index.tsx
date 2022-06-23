import Seo from '@/components/Seo'
import TimeLine from '@/components/Timeline/Timeline'

export default function HomePage() {
  return (
    <>
      <Seo templateTitle='Home' />
      <div className='flex flex-col justify-center min-h-main md:flex-row md:h-96 md:items-center md:justify-between'>
        <div className='order-1 w-full md:mr-28'>
          <div className='mb-8'>
            <h1 className='font-medium mt-8 text-3xl text-justify text-primary md:leading-snug md:text-5xl dark:text-gray-100'>
              <span className='text-blue-500 underline'>Sezer Esim</span>
              <br />
              Software Engineer
            </h1>
          </div>
          <p className='mb-9 text-justify text-primary dark:text-gray-400'>
            An engineer who continues to learn and improve.
          </p>
        </div>
      </div>
      <div>
        {/* timeline */}
        <div className='py-4'>
          <h2 className='text-gray-900 dark:text-gray-100'>Experience</h2>
        </div>
        <TimeLine
          list={[
            {
              dateFrom: '20-06-2022',
              title: 'Hepsiburada',
              position: 'Software Engineer',
            },
            {
              dateFrom: '20-07-2020',
              dateTo: '17-06-2022',
              title: 'Ideall Technology',
              position: 'Software Engineer',
            },
          ]}
        />
      </div>
    </>
  )
}

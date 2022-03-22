import Image from 'next/image'
import { FC } from 'react'

import PrimaryLink from '@/components/links/PrimaryLink'
import UnstyledLink from '@/components/links/UnstyledLink'

interface IProjectCard {
  link: string
  image: string
  name: string
  description: string
}

const ProjectCard: FC<IProjectCard> = ({ link, image, name, description }) => {
  return (
    <div className='bg-gray md md:w-1/2'>
      <div className='bg-white overflow-hidden rounded-md shadow-md'>
        <UnstyledLink href={link}>
          <div className='h-36 relative w-full md:h-48'>
            <Image alt='title' src={image} layout='fill' objectFit='cover' />
          </div>
        </UnstyledLink>
        <div className='px-6 py-6'>
          <div className='font-bold mb-2 text-xl'>{name}</div>
          <div className='text-base text-gray-900'>{description}</div>
          <div className='border-gray-200 border-t-2 flex gap-2 mt-2 pt-2'>
            <PrimaryLink href={link}>Github</PrimaryLink>
            <PrimaryLink href={link}>Play Store</PrimaryLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

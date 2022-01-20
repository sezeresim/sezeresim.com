import React from 'react'

interface IBlogCard {
  title: string
  description: string
  date: string
}

const BlogCard: React.FC<IBlogCard> = ({ title, date, description }) => {
  return (
    <div className='bg-white flex flex-col h-72 p-6 rounded'>
      <div>
        <h4>{title}</h4>
      </div>
      <div>
        <span>{date}</span>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default BlogCard

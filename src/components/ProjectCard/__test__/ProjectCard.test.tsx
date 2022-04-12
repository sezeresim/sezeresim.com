import { render } from '@testing-library/react'

import ProjectCard from '..'

const cartData = {
  name: 'Domates',
  description: `This is a android application for managing your daily tasks.Also it is a pomodoro timer.`,
  image: '/images/pomodoro.webp',
  link: 'https://play.google.com/store/apps/details?id=com.pomodorotracking',
  githubLink: 'https://github.com/sezeresim/domates-rn',
}

describe('ProjectCard', () => {
  test('should be render', () => {
    const { container } = render(
      <ProjectCard
        link={cartData.link}
        description={cartData.description}
        githubLink={cartData.githubLink}
        image={cartData.image}
        name={cartData.name}
      />
    )
    expect(container).toBeInTheDocument()
  })
  test('should be render name with sezer', () => {
    const { getByText } = render(
      <ProjectCard
        link={cartData.link}
        description={cartData.description}
        githubLink={cartData.githubLink}
        image={cartData.image}
        name='sezer'
      />
    )
    expect(getByText('sezer')).toBeInTheDocument()
  })
})

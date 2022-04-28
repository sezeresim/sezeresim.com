import { useEffect, useState } from 'react'

import useDarkMode from '@/hooks/useDarkMode'

import { Moon, Sun } from '../icons'

const ThemeSwitch = () => {
  const { isDarkMode, darkModeToogle } = useDarkMode()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <button
      onClick={darkModeToogle}
      className='duration-200 text-2xl transition-all dark:text-gray-100 hover:dark:text-blue-500 hover:text-blue-500'
    >
      {isDarkMode && mounted ? <Sun /> : <Moon />}
    </button>
  )
}

export default ThemeSwitch

import { useEffect, useState } from 'react'

interface UseDarkModeOutput {
  theme: 'dark' | 'light'
  isDarkMode: boolean
  darkModeToogle: () => void
}

function useDarkMode(): UseDarkModeOutput {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    typeof window !== 'undefined' ? localStorage.theme : 'dark'
  )

  useEffect(() => {
    const root = window.document.documentElement
    const colorTheme = theme === 'dark' ? 'light' : 'dark'
    root.classList.remove(colorTheme)
    root.classList.add(theme)

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return {
    theme,
    isDarkMode: theme === 'dark',
    darkModeToogle: () => setTheme(theme == 'dark' ? 'light' : 'dark'),
  }
}

export default useDarkMode

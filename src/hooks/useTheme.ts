import { useLayoutEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme = isDarkTheme ? 'dark' : 'light'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem('app-theme') as Theme) || defaultTheme)

  useLayoutEffect(() => {
    localStorage.setItem('app-theme', theme)
  }, [theme])

  return { theme, setTheme }
}

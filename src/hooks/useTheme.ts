// import { useLayoutEffect, useState } from 'react'
import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch '
import { setTheme } from 'store/themeSlice'

export const useTheme = () => {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(store => store)

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }
  return { theme, toggleTheme }
}

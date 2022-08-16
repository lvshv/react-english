import React from 'react'
import Header from 'components/Header'
// import { useTheme } from 'hooks/useTheme'
import { Box, BoxProps, createTheme, ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { useAppSelector } from 'hooks/useAppSelector'
import { useAppDispatch } from 'hooks/useAppDispatch '
import { setTheme, ThemeType } from 'store/themeSlice'

const MainBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: '100vh',
}))

export const Layout = () => {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(store => store)

  const dispatchSetTheme = (value: ThemeType) => {
    dispatch(setTheme(value))
  }

  return (
    <>
      <Header setTheme={dispatchSetTheme} theme={theme} />
      <MainBox bgcolor={'background.default'} color={'text.primary'}>
        <Outlet />
      </MainBox>
    </>
  )
}

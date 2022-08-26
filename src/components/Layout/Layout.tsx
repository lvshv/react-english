import React from 'react'
import Header from 'components/Header'
import { Box, BoxProps } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles'

const MainBox = styled(Box)<BoxProps>(({ theme }) => ({
  minHeight: '100vh',
}))

export const Layout = () => {
  console.log('layout rerender')
  return (
    <>
      <Header />
      <MainBox bgcolor={'background.default'} color={'text.primary'}>
        <Outlet />
      </MainBox>
    </>
  )
}

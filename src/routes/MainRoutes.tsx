import React, { lazy } from 'react'
import { CircularProgress, Container } from '@mui/material'
import Layout from 'components/Layout'
import { Navigate } from 'react-router-dom'

const ExercisePage = lazy(() => import('pages/ExercisePage'))
const HomePage = lazy(() => import('pages/HomePage'))
const AdminPage = lazy(() => import('pages/Admin'))

const PageLoader = () => {
  return (
    <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress color='secondary' sx={{ mx: 'auto', my: 6 }} />
    </Container>
  )
}

export const MainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: (
        <React.Suspense fallback={<PageLoader />}>
          <HomePage />
        </React.Suspense>
      ),
    },

    {
      path: '/exercise',
      element: (
        <React.Suspense fallback={<PageLoader />}>
          <ExercisePage />
        </React.Suspense>
        // <Navigate to='/' />
      ),
      children: [
        {
          path: ':exerciseId',
          element: (
            <React.Suspense fallback={<PageLoader />}>
              <ExercisePage />
            </React.Suspense>
          ),
        },
      ],
    },
    {
      path: '/user',
      element: (
        <React.Suspense fallback={<PageLoader />}>
          <AdminPage />
        </React.Suspense>
      ),
    },
  ],
}

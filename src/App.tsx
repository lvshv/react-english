import React from 'react'
import { Box, BoxProps, createTheme, ThemeProvider } from '@mui/material'
import { useTheme } from 'hooks/useTheme'
import Routes from 'routes'
import { useAppSelector } from 'hooks/useAppSelector'
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
  }
}

function App() {
  const { theme } = useAppSelector(store => store)

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      neutral: {
        main: '#D1D5DE',
        contrastText: '#fff',
      },
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App

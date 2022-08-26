import React from 'react'
import { Box, BoxProps, createTheme, ThemeProvider } from '@mui/material'
import { useTheme } from 'hooks/useTheme'
import Routes from 'routes'
import { useAppSelector } from 'hooks/useAppSelector'
import { RootState } from 'store'
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
  }
}

const themeSelector = (store: RootState) => store.theme

function App() {
  const theme = useAppSelector(themeSelector)

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      neutral: {
        main: '#D1D5DE',
        contrastText: '#fff',
      },
    },
  })
  console.log('app RERENDER')

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App

import {
  ModeNight,
  LightMode,
  Home as HomeIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
} from '@mui/icons-material'
import { AppBar, Toolbar, IconButton, Container } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import type { Theme } from 'hooks/useTheme'
import { Link } from 'react-router-dom'
import { ThemeType } from 'store/themeSlice'

interface HeaderProps {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    neutral: true
  }
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const handleThemeClick = (e: React.MouseEvent<HTMLElement>) => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <AppBar position='static' color='neutral'>
      <Toolbar>
        <Container maxWidth='xl' sx={{ display: 'flex' }}>
          <IconButton component={Link} to='/'>
            <HomeIcon />
          </IconButton>
          <IconButton component={Link} to='/user'>
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <IconButton
            color='primary'
            aria-label='change theme'
            component='label'
            onClick={handleThemeClick}
            sx={{ ml: 'auto' }}
          >
            {theme === 'light' ? <LightMode /> : <ModeNight />}
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

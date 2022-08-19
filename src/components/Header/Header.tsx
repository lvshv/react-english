import {
  ModeNight,
  LightMode,
  Home as HomeIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
} from '@mui/icons-material'
import { AppBar, Toolbar, IconButton, Container } from '@mui/material'
import React from 'react'
import { useTheme } from 'hooks/useTheme'
import { NavLink } from 'react-router-dom'

interface HeaderProps {}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    neutral: true
  }
}

export const Header: React.FC<HeaderProps> = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <AppBar position='static' color='neutral'>
      <Toolbar>
        <Container maxWidth='xl' sx={{ display: 'flex' }}>
          <IconButton component={NavLink} to='/'>
            <HomeIcon />
          </IconButton>
          <IconButton component={NavLink} to='/user'>
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <IconButton
            color='primary'
            aria-label='change theme'
            component='label'
            onClick={toggleTheme}
            sx={{ ml: 'auto' }}
          >
            {theme === 'light' ? <LightMode /> : <ModeNight />}
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

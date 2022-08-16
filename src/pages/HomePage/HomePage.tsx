import React from 'react'
import { exerciseData } from 'data/exercises.js'
import { Link, LinkProps } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'
import { Box, Container } from '@mui/material'
import { styled } from '@mui/material/styles'

interface Props {}

const StyledLink = styled(Link)<LinkProps>(({ theme }) => {
  return {
    display: 'flex',
    padding: '20px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    borderRadius: '20px',
    color: 'white',
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.secondary.light : theme.palette.secondary.dark,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#f3e5f5',
      transform: 'translateY(-8px)',
    },
    textDecoration: 'none',
  }
})

export const HomePage: React.FC<Props> = () => {
  return (
    <Box flex={4} p={{ xs: 1, md: 2 }} pt={{ md: 5, xs: 5 }}>
      <Container maxWidth='md'>
        <Grid container spacing={2}>
          {exerciseData.map((exercise, idx) => {
            return (
              <Grid xs={12} sm={6} lg={4} key={idx}>
                <StyledLink to={`/exercise/${idx}`} key={`exercise-${idx}`}>
                  <div>Exercise {idx + 1}</div>
                </StyledLink>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

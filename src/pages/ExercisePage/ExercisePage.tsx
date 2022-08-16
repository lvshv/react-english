import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Container, Typography, Button } from '@mui/material'
import { exerciseData } from 'data/exercises.js'

interface Sentence {
  rus: string
  eng: string
  showEng?: boolean
}

export const ExercisePage = () => {
  let params = useParams()
  const navigate = useNavigate()

  const [exercises, setExercises] = useState(exerciseData)
  // const [translateMode, setTranslateMode] = useState(false)
  // const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (!params.exerciseId) {
      navigate('/')
    }
  }, [params, navigate])

  if (!params.exerciseId) {
    return <></>
  }

  const exerciseId: string = params.exerciseId

  const handlerShowRus = ({ exerciseIdx, idx }: { exerciseIdx: any; idx: any }) => {
    return () => {
      const newState = JSON.parse(JSON.stringify(exercises))
      let sentence = newState[exerciseIdx][idx]
      if (sentence.showEng) {
        sentence.showEng = false
      } else {
        sentence.showEng = true
      }
      setExercises(newState)
    }
  }

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }} pt={{ xs: 5, md: 5 }}>
      <Container maxWidth='sm'>
        <Button component={Link} to='/' sx={{ mb: 4 }}>
          Назад
        </Button>

        <div className=''>
          <Typography variant='h6' gutterBottom component='div'>
            Exercise {+exerciseId + 1}
          </Typography>

          <div>
            {exercises[+exerciseId].map((el: Sentence, idx) => {
              return (
                <div key={`s-${idx}`} className=''>
                  <Typography
                    variant='body1'
                    sx={{ cursor: 'pointer' }}
                    gutterBottom
                    onClick={handlerShowRus({ exerciseIdx: exerciseId, idx })}
                  >
                    {idx + 1}. {el['rus']}
                  </Typography>

                  {el.showEng && (
                    <Typography variant='body1' sx={{ cursor: 'pointer' }} gutterBottom>
                      {el['eng']}
                    </Typography>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {exercises[+exerciseId + 1] && (
          <Button component={Link} to={`/exercise/${+exerciseId + 1}`} sx={{ mt: 4 }}>
            Следующее
          </Button>
        )}
      </Container>
    </Box>
  )
}

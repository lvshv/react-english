import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Box, Container, Typography, Button, styled, Tooltip, ClickAwayListener } from '@mui/material'
import { exerciseData } from 'data/exercises.js'
import { useTranslateWordQuery } from 'store'

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
                <Box key={`s-${idx}`} sx={{ mb: 2 }}>
                  <Typography
                    variant='body1'
                    sx={{ cursor: 'pointer', display: 'flex' }}
                    gutterBottom
                    // onClick={handlerShowRus({ exerciseIdx: exerciseId, idx })}
                  >
                    {/* <span>{idx + 1}. </span> */}
                    {el['rus'].split(' ').map((word, idx) => {
                      return <Word word={word} key={`${word}-${idx}`} />
                    })}
                    {/* {el['rus']} */}
                  </Typography>

                  {el.showEng && (
                    <Typography variant='body1' sx={{ cursor: 'pointer' }} gutterBottom>
                      {el['eng']}
                    </Typography>
                  )}
                </Box>
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

const StyledWord = styled('span')({
  transition: 'all .3s',
  padding: '2px 2px',
  borderRadius: '4px',
  '&:hover': { backgroundColor: '#90caf9' },
})

const Word: React.FC<{ word: string }> = ({ word }) => {
  const [open, setOpen] = React.useState(false)

  const { data } = useTranslateWordQuery(
    { word },
    {
      skip: !open,
    }
  )

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const onClickWord = (word: string) => async () => {
    setOpen(true)
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: false,
        }}
        onClose={handleTooltipClose}
        open={open && !!data}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          data ? (
            <div>
              {word} -{' '}
              {data.dict[0].entry.map((el: any) => {
                console.log('🚀 ~ {data.dict.map ~ data.dict', data.dict)
                return (
                  <span key={el.word}>
                    {el.word}
                    {', '}
                  </span>
                )
              })}
            </div>
          ) : (
            <div></div>
          )
        }
      >
        <StyledWord onClick={onClickWord(word)} style={{ marginRight: '4px' }}>
          {word}
        </StyledWord>
      </Tooltip>
    </ClickAwayListener>
  )
}

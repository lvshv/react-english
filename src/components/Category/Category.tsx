import { Button, IconButton, Modal, styled, TextField, Tooltip, Typography, Alert, Snackbar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useCreateCategoryMutation } from 'store'

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

interface FormInput {
  title: string
}

type Props = {
  mode: 'edit' | 'create'
  isOpened: boolean
  setIsOpened: (value: boolean) => void
  title?: string
}

export const Category: React.FC<Props> = ({ mode, isOpened, setIsOpened, title = '' }) => {
  // const [isOpened, setIsOpened] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
    setValue,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
    },
  })

  useEffect(() => {
    if (mode === 'edit' && title) {
      setValue('title', title)
    }
  }, [mode, title])

  const [createCategory, { isLoading, isSuccess, reset, isError }] = useCreateCategoryMutation()

  const onSubmit: SubmitHandler<FormInput> = async data => {
    const res = await createCategory({ title: data.title })
    resetForm({ title: '' })
    setIsOpened(false)
  }

  return (
    <>
      <Snackbar
        open={isSuccess || isError}
        autoHideDuration={6000}
        onClose={reset}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={reset} severity={isSuccess ? 'success' : 'error'} sx={{ width: '100%' }}>
          {isSuccess && 'Категория успешно добавлена'}
          {isError && 'Произошла ошибка при добавлении категории'}
        </Alert>
      </Snackbar>

      <StyledModal
        open={isOpened}
        onClose={e => setIsOpened(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box width={400} bgcolor={'background.default'} color={'text.primary'} p={3} borderRadius={5}>
          <Typography variant='h6' color='gray' textAlign='center' sx={{ mb: 2 }}>
            Добавление категории
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='title'
              control={control}
              rules={{
                required: { value: true, message: 'Обязательное поле' },
                minLength: { value: 3, message: 'Минимум 3 мимвола' },
              }}
              render={({ field }) => (
                <TextField
                  sx={{ width: '100%' }}
                  id='standard-multiline-static'
                  multiline
                  error={Boolean(errors.title)}
                  rows={2}
                  helperText={errors.title?.message}
                  placeholder='Название категории'
                  variant='standard'
                  disabled={isLoading}
                  {...field}
                />
              )}
            />
          </form>

          <Button sx={{ mt: 5 }} onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            Создать
          </Button>
        </Box>
      </StyledModal>
    </>
  )
}

import { Button, IconButton, Modal, styled, TextField, Tooltip, Typography, Alert } from '@mui/material'
import React, { useState } from 'react'
import { Add as AddIcon } from '@mui/icons-material'
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

export const Category = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
    },
  })

  const [createCategory, { isLoading, isSuccess, reset, isError }] = useCreateCategoryMutation()

  const onSubmit: SubmitHandler<FormInput> = async data => {
    const res = await createCategory({ title: data.title })
    // if (isSuccess) {
    //   console.log('🚀 ~ Category ~ isSuccess', isSuccess)
    //   resetForm({ title: '' })
    //   setTimeout(() => {
    //     reset()
    //   }, 3000)
    // }
  }
  return (
    <>
      <Tooltip
        onClick={e => setIsOpened(true)}
        title='Добавить категорию'
        sx={{
          mb: 5,
        }}
      >
        <IconButton>
          <AddIcon />
        </IconButton>
      </Tooltip>
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
            {/* {isSuccess && (
              <Alert severity='success' sx={{ my: 2 }}>
                Категория успешно добавлена
              </Alert>
            )} */}
          </form>

          <Button sx={{ mt: 5 }} onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            Создать
          </Button>
        </Box>
      </StyledModal>
    </>
  )
}

import { Button, IconButton, Modal, styled, TextField, Tooltip, Typography, Alert, Snackbar } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from 'store'
import { useSearchParams } from 'react-router-dom'

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

interface FormInput {
  title: string
}

type Props = {
  isOpened: boolean
  setIsOpened: (value: boolean) => void
  title?: string
}

export const Category: React.FC<Props> = ({ isOpened, setIsOpened }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const editId = searchParams.get('editId') || ''
  const editMode = Boolean(editId)

  const { data, isFetching } = useGetCategoryByIdQuery(editId, {
    skip: !editMode,
  })
  const [createCategory, { isLoading, isSuccess, reset, isError }] = useCreateCategoryMutation()

  const [updateCategory] = useUpdateCategoryMutation()

  const [deleteCategory] = useDeleteCategoryMutation()

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
    if (data?.title && editMode) {
      setValue('title', data.title)
    }
    return () => {
      setValue('title', '')
    }
  }, [data, editMode])

  const onSubmit: SubmitHandler<FormInput> = async data => {
    if (!editMode) {
      const res = await createCategory({ title: data.title })
    } else {
      const res = await updateCategory({ id: editId, title: data.title })
      removeEditId()
    }
    resetForm({ title: '' })
    setIsOpened(false)
  }

  const onClickDeleteCategory = async () => {
    const res = await deleteCategory({ id: editId })
    removeEditId()
  }

  const removeEditId = () => {
    const queryObj = { ...Object.fromEntries(new URLSearchParams(searchParams)) }
    delete queryObj.editId
    setSearchParams({
      ...queryObj,
    })
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
        onClose={e => {
          setIsOpened(false)
          removeEditId()
        }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box width={400} bgcolor={'background.default'} color={'text.primary'} p={3} borderRadius={5}>
          <Typography variant='h6' color='gray' textAlign='center' sx={{ mb: 2 }}>
            {!editMode ? 'Добавление' : 'Редактирование'} категории
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

          <Button sx={{ mt: 5, width: '50%' }} onClick={handleSubmit(onSubmit)} disabled={isLoading} color='success'>
            Сохранить
          </Button>

          {editMode && (
            <Button sx={{ mt: 5, width: '50%' }} onClick={onClickDeleteCategory} disabled={isLoading} color='error'>
              Удалить
            </Button>
          )}
        </Box>
      </StyledModal>
    </>
  )
}

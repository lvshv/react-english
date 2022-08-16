import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppSelector } from 'hooks/useAppSelector'

interface Props {}

export const UserPage: React.FC<Props> = () => {
  const { user, isAuth, isLoading } = useAppSelector(state => state.user)

  return (
    <div className='container mx-auto grow py-10'>
      <div className='mx-auto w-6/12'>{user?.fullName}</div>
    </div>
  )
}

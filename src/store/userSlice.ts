import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { userAPI, AuthDto, RegisterDto } from 'api'
// import { parseCookies, setCookie, destroyCookie } from 'nookies'

export interface UserState {
  isLoading: boolean
  user: User | null
  isAuth: boolean
  error: string
}

interface User {
  email: string
  fullName: string
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  isAuth: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.isAuth = true
    })

    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
    })

    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.isAuth = true
    })

    builder.addCase(getMe.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    })
  },
})

export const { setUserError } = userSlice.actions

export const fetchUser = createAsyncThunk<User, AuthDto>(
  'user/fetchUser',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.authUser(payload)
      if (response.status !== 200) {
        throw new Error('Server Error!')
      }

      return response.data
    } catch (error: any) {
      setTimeout(() => {
        dispatch(setUserError(''))
      }, 5000)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const registerUser = createAsyncThunk<User, RegisterDto>(
  'user/registerUser',
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await userAPI.registerUser(payload)
      if (response.status !== 200) {
        throw new Error('Server Error!')
      }

      return response.data
    } catch (error: any) {
      setTimeout(() => {
        dispatch(setUserError(''))
      }, 5000)
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getMe = createAsyncThunk('user/getMe', async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await userAPI.getMe()
    if (response.status !== 200) {
      throw new Error('Server Error!')
    }

    return response.data
  } catch (error: any) {
    // setTimeout(() => {
    //   dispatch(setUserError(''))
    // }, 5000)
    // return rejectWithValue(error.response.data.message)
  }
})

export default userSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

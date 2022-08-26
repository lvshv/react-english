import { configureStore } from '@reduxjs/toolkit'
import { api } from 'store/api'
import userReducer from './userSlice'
import themeReducer from './themeSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

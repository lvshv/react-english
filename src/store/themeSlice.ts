import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ThemeType = 'dark' | 'light'

const getTheme = (): ThemeType => {
  const theme = `${window?.localStorage?.getItem('theme')}` as ThemeType
  if (['light', 'dark'].includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: light)')
  if (userMedia.matches) return 'light'

  return 'dark'
}

const initialState: ThemeType = getTheme()

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: {
      reducer: (_, action: PayloadAction<ThemeType>) => {
        return action.payload
      },
      prepare: (value: ThemeType) => {
        localStorage.setItem('theme', value)
        return { payload: value }
      },
    },
  },
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer

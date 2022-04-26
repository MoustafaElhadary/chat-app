import { createSlice } from '@reduxjs/toolkit'
import { AppStateType } from '../../types'

const initialState: AppStateType = {
  user: null,
  token: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken(state, { payload }) {
      state.token = payload
    },
    setUser: (state, { payload }) => {
      state.user = payload
    },
    clearUser: (state) => {
      state.user = null
    },
  },
})

export const { setUser, clearUser, setToken } = appSlice.actions

export default appSlice.reducer

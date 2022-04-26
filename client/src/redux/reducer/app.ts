import { createSlice } from '@reduxjs/toolkit'
import { AppStateType, User } from '../../types'

const initialState: AppStateType = {
  user: null,
  token: localStorage.getItem('chat-auth-token') || ''
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToken(state, { payload }: { payload: string }) {
      state.token = payload
    },
    setUser: (state, { payload }: { payload: User }) => {
      state.user = payload
    },
    signOut: (state) => {
      state.user = null
      state.token = ''
    }
  },
})

export const { setUser, signOut, setToken } = appSlice.actions

export default appSlice.reducer

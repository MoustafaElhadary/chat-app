import { configureStore } from '@reduxjs/toolkit'
import appReducer from './reducer/app'
import contactsReducer from './reducer/contacts'
import conversationsReducer from './reducer/conversations'
const store = configureStore({
  reducer: {
    app: appReducer,
    contacts: contactsReducer,
    conversations: conversationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export { store }

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
import { SocketProvider } from '../contexts/SocketProvider'
import useLocalStorage from '../hooks/useLocalStorage'
import Dashboard from '../Pages/Dashboard'
import SignInPage from '../Pages/SignInPage'
import SignUpPage from '../Pages/SignUpPage'
import { RootState } from '../redux/store'
import AuthRoute from './AuthRoute'
import OldDashboard from './OldDashboard'

function App() {
  const [id, setId] = useLocalStorage<string>('id')
  const token = useSelector((state: RootState) => state.app.token)

  useEffect(() => {
    localStorage.setItem('chat-auth-token', token)
  }, [token])

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <OldDashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  // return (
  //   id ? dashboard : <Login onIdSubmit={setId} />
  // )

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route path="login" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
    </Routes>
  )
}
export default App

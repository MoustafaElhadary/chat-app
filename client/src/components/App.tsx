import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { SocketProvider } from '../contexts/SocketProvider'
import Dashboard from '../Pages/Dashboard'
import SignInPage from '../Pages/SignInPage'
import SignUpPage from '../Pages/SignUpPage'
import { RootState } from '../redux/store'
import AuthRoute from './AuthRoute'

function App() {
  const { token } = useSelector((state: RootState) => state.app)
  useEffect(() => {
    localStorage.setItem('chat-auth-token', token)
  }, [token])

  return (
    <SocketProvider>
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
    </SocketProvider>
  )
}
export default App

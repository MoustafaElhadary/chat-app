import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { meAPI } from '../api'
import { useSocket } from '../contexts/SocketProvider'
import { setToken, setUser } from '../redux/reducer/app'
import { RootState } from '../redux/store'

function AuthRoute({ children }: { children: React.ReactNode }): JSX.Element {
  const token = useSelector((state: RootState) => state.app.token)
  const [loading, setLoading] = useState(true)
  const socket = useSocket()

  const dispatch = useDispatch()

  const fetchMe = async () => {
    try {
      const data = await meAPI(token)
      dispatch(setUser(data))
    } catch (error) {
      dispatch(setToken(''))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMe()
    //TODO: receive conversations and notifications
    socket.on('receive-message', (message) => {
      console.log({ message })
    })
  }, [])


  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  if (token) {
    return <> {children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}
export default AuthRoute

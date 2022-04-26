import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { meAPI } from '../api'
import { setToken, setUser } from '../redux/reducer/app'
import { RootState } from '../redux/store'

function AuthRoute({ children }: { children: React.ReactNode }): JSX.Element {
  const token = useSelector((state: RootState) => state.app.token)
  const [loading, setLoading] = useState(true)
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
    console.log({ token })
    fetchMe()
  }, [])



  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  if (token) {
    return <React.Fragment> {children}</React.Fragment>
  } else {
    return <Navigate to="/login" replace />
  }
}
export default AuthRoute

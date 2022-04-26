import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { signInAPI } from '../api'
import { setToken } from '../redux/reducer/app'
import { RootState } from '../redux/store'

export default function SignInPage() {
  const [error, setError] = useState<string>('')
  const token = useSelector((state: RootState) => state.app.token)

  const dispatch = useDispatch()
  const initialValues = {
    email: '',
    password: '',
  }
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const data = await signInAPI({ ...values })
        const token = data.accessToken
        console.log({ token })
        dispatch(setToken(token))
        setError('')
      } catch (error) {
        dispatch(setToken(''))
        setError('something went wrong')
      }
    },
  })
  if (token) return <Navigate to="/" replace />

  return (
    <Container
      className="align-items-center d-flex justify-center"
      sx={{ height: '100vh' }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{ height: '100vh', justifyContent: 'space-between' }}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ my: 6 }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ my: 6 }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
        {error && <div>{error}</div>}
      </form>
    </Container>
  )
}

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import logo from '../logo.svg'

export default function App() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ height: '100vh', justifyContent: 'space-between' }}
    >
      <Box
        sx={{
          bgcolor: 'primary.main',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          width: '100vw',
          py: 2,
          px: 5,
        }}
      >
        <Typography color="primary.contrastText" variant="h5">
          Login
        </Typography>
      </Box>
      <Grid
        container
        direction="column"
        alignItems="center"
        rowGap={3}
        sx={{
          width: '100vw',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={logo}
          width="60%"
          style={{ maxWidth: '250px' }}
          alt="app logo"
        />

        <Box
          sx={{
            width: '100vw',
            px: 5,
          }}
        >
          <TextField id="email" label="Email" variant="standard" fullWidth />
        </Box>
        <Box
          sx={{
            width: '100vw',
            px: 5,
          }}
        >
          <TextField
            id="password"
            label="Password"
            variant="standard"
            fullWidth
          />
        </Box>
        <Button variant="contained">LogIn</Button>

        <Box>
          <Typography variant="body1">Don't Have an account?</Typography>
        </Box>
      </Grid>
      <Box
        sx={{
          bgcolor: 'primary.main',
          width: '100vw',
          py: 1,
        }}
      />
    </Grid>
  )
}

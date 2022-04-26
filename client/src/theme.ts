import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#373759',
      contrastText: '#fff',
    },
    background: {
      default: '#f4f5fb',
    },
  },
})

export default theme

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2ECC71',
    },
    secondary: {
      main: '#1A1A1A',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#0D0D0D',
      paper: '#1A1A1A',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
    },
  },
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    h1: {
      fontSize: '3.75rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.125rem',
    },
    body2: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none', 
          boxShadow: 'none', 
          '&:hover': {
            boxShadow: 'none', 
          },
        },
        containedPrimary: {
        }
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0D0D0D',
        },
      },
    },
  },
});

export default theme;
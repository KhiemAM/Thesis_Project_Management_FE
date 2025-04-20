import 'src/global.css'

import { useEffect } from 'react'

import Fab from '@mui/material/Fab'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
// ----------------------------------------------------------------------
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import { useColorScheme } from '@mui/material/styles'
import FormControlLabel from '@mui/material/FormControlLabel'

import { usePathname } from 'src/routes/hooks'

import { ThemeProvider } from 'src/theme/theme-provider'

import { Iconify } from 'src/components/iconify'


type AppProps = {
  children: React.ReactNode;
};

function ToggleDarkMode() {
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
        minHeight: '56px'
      }}
    >
      <FormControl>
        <FormLabel id="demo-theme-toggle">Theme</FormLabel>
        <RadioGroup
          aria-labelledby="demo-theme-toggle"
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) =>
            setMode(event.target.value as 'system' | 'light' | 'dark')
          }
        >
          <FormControlLabel value="system" control={<Radio />} label="System" />
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
      </FormControl>
    </Box>
  )
}


export default function App({ children }: AppProps) {
  useScrollToTop()

  const githubButton = () => (
    // <Fab
    //   size="medium"
    //   aria-label="Github"
    //   href="https://github.com/minimal-ui-kit/material-kit-react"
    //   sx={{
    //     zIndex: 9,
    //     right: 20,
    //     bottom: 20,
    //     width: 48,
    //     height: 48,
    //     position: 'fixed',
    //     bgcolor: 'grey.800'
    //   }}
    // >
    //   <Iconify width={24} icon="socials:github" sx={{ '--color': 'white' }} />
    // </Fab>
    // <ToggleDarkMode />
    <>
    </>
  )

  return (
    <ThemeProvider>
      {children}
      {githubButton()}
    </ThemeProvider>
  )
}

// ----------------------------------------------------------------------

function useScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

import { useCallback } from 'react'
// import { useDispatch } from 'react-redux'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useRouter } from 'src/routes/hooks'

import authApi from 'src/axios/auth'

import { Iconify } from 'src/components/iconify'

// ----------------------------------------------------------------------

export function RegisterView() {
  const router = useRouter()
  // const dispatch = useDispatch()

  const handleRegister = useCallback(async() => {
    const response = await authApi.register(
      {
        'user_name': 'khiem5',
        'password': '',
        'is_active': true,
        'is_lecturer': false,
        'major': '123e4567-e89b-12d3-a456-426614174000'
      }
    )
    console.log('🚀 ~ handleRegister ~ response:', response)
  }, [])

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column'
      }}
    >
      <TextField
        fullWidth
        name="email"
        label="Mã số sinh viên"
        sx={{ mb: 3 }}
        slotProps={{
          // inputLabel: { shrink: true }
        }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleRegister}
      >
        Đăng ký
      </Button>
    </Box>
  )

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5
        }}
      >
        <Typography variant="h5">Đăng ký tài khoản</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary'
          }}
        >
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  )
}

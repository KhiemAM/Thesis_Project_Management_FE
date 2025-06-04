import type { SubmitHandler } from 'react-hook-form'

import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Alert } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useRouter } from 'src/routes/hooks'
import { RouterLink } from 'src/routes/components'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import authApi from 'src/axios/auth'

import { Iconify } from 'src/components/iconify'

// ----------------------------------------------------------------------

interface IFormInputRegister {
  user_name: string;
}

export function RegisterView() {
  const router = useRouter()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputRegister>()

  const handleRegister: SubmitHandler<IFormInputRegister> = useCallback(async(data) => {
    const newData = {
      user_name: data.user_name.trim(),
      password: '',
      is_active: true,
      user_type: 2
    }
    toast.promise(
      authApi.register(newData),
      { pending: 'Đang đăng ký...', success: 'Đăng ký thành công!' }
    ).then((res) => {
      if (res.status === 200 || res.status === 201) {
        navigate('/login')
      }
    })
  }, [router])

  const renderForm = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <TextField
        fullWidth
        label="Mã số sinh viên *"
        error={!!errors['user_name']}
        sx={{ mb: 3 }}
        {...register('user_name', {
          required: FIELD_REQUIRED_MESSAGE
        })}
      />
      {errors['user_name'] && (
        <Alert severity="error" sx={{ mb: 3 }}>{String(errors['user_name']?.message)}</Alert>
      )}

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
      >
        Đăng ký
      </Button>
    </Box>
  )

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
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
          Bạn đã có tài khoản?
          <Link variant="subtitle2" component={RouterLink} href='/login' sx={{ ml: 0.5 }}>
            Bắt đầu ngay
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
      </Box>
    </form>
  )
}

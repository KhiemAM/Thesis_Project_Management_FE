import type { SubmitHandler } from 'react-hook-form'

import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'

import { useRouter } from 'src/routes/hooks'
import { RouterLink } from 'src/routes/components'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import { useAppDispatch } from 'src/redux/hook'
import { loginUserAPI } from 'src/redux/user/user-slice'

import { Iconify } from 'src/components/iconify'

// ----------------------------------------------------------------------
interface IFormInputLogin {
  user_name: string;
  password: string;
}

export function SignInView() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputLogin>()

  const handleSignIn: SubmitHandler<IFormInputLogin> = useCallback(async(data) => {
    toast.promise(
      dispatch(loginUserAPI(data)).unwrap(),
      { pending: 'Đang đăng nhập...', success: 'Đăng nhập thành công!' }
    ).then((res) => {
      if (!res.error) {
        navigate('/student')
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

      <Link variant="body2" color="inherit" sx={{ mb: 1.5, alignSelf: 'flex-end' }}>
        Quên mật khẩu?
      </Link>

      <TextField
        fullWidth
        label="Mật khẩu *"
        error={!!errors['password']}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
        sx={{ mb: 3 }}
        {...register('password', {
          required: FIELD_REQUIRED_MESSAGE
        })}
      />
      {errors['password'] && (
        <Alert severity="error" sx={{ mb: 3 }}>{String(errors['password']?.message)}</Alert>
      )}

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
      >
        Đăng nhập
      </Button>
    </Box>
  )

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5
        }}
      >
        <Typography variant="h5">Đăng nhập</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary'
          }}
        >
          Bạn chưa có tài khoản?
          <Link variant="subtitle2" component={RouterLink} href='/register' sx={{ ml: 0.5 }}>
            Hãy bắt đầu ngay
          </Link>
        </Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          HOẶC
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

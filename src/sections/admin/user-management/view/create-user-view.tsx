import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import authApi from 'src/axios/auth'
import { DashboardContent } from 'src/layouts/dashboard'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

// ----------------------------------------------------------------------

interface IFormInputCreateUser {
  user_name: string;
  password: string;
  confirm_password: string;
}

export function CreateUserView() {
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<IFormInputCreateUser>()
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const submitCreateFunction = async (data: IFormInputCreateUser) => {
    try {
      setIsLoadingButton(true)
      const newData = {
        user_name: data.user_name,
        password: data.password,
        is_active: true,
        user_type: 3
      }
      await authApi.register(newData)
      toast.success('Tạo tài khoản thành công!')
      // Reset form after successful submission
      reset()
    } finally {
      setIsLoadingButton(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitCreateFunction)}>
      <DashboardContent>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Tạo tài khoản mới
          </Typography>
        </Box>

        <Card sx={{ width: { sm: '100%', md: '60%' }, mx: { sm: 'none', md: 'auto' } }}>
          <Scrollbar>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
              <TextField
                fullWidth
                label="Tên tài khoản *"
                error={!!errors['user_name']}
                sx={{ mb: 3 }}
                {...register('user_name', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['user_name'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['user_name']?.message)}</Alert>
              )}

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
                sx={{
                  mb: 3,
                  '& input::-ms-reveal': { display: 'none' }
                }}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['password'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['password']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Xác nhận mật khẩu *"
                error={!!errors['confirm_password']}
                type={showPasswordConfirm ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} edge="end">
                          <Iconify icon={showPasswordConfirm ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
                sx={{
                  mb: 3,
                  '& input::-ms-reveal': { display: 'none' }
                }}
                {...register('confirm_password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  validate: (value) => {
                    const password = watch('password')
                    return value === password || 'Mật khẩu xác nhận không khớp'
                  }
                })}
              />
              {errors['confirm_password'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['confirm_password']?.message)}</Alert>
              )}

              <Button
                loading={isLoadingButton}
                loadingPosition='start'
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
              >
                Tạo tài khoản
              </Button>
            </Box>
          </Scrollbar>
        </Card>
      </DashboardContent>
    </form>
  )
}

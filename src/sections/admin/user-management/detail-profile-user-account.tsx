import 'dayjs/locale/vi'

import type { SubmitHandler } from 'react-hook-form'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { IconButton, InputAdornment } from '@mui/material'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import authApi from 'src/axios/auth'

import { Iconify } from 'src/components/iconify'

//-------------------------------------------------------------------------

interface IFormInput {
  new_password: string
}

interface DetailProfileUserAccountProps {
  userId: string | null
}

const DetailProfileUserAccount = ({ userId }: DetailProfileUserAccountProps) => {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    try {
      setLoadingButton(true)
      await authApi.changePasswordByAdmin({ user_id: userId, new_password: data.new_password })
      toast.success('Đổi mật khẩu thành công!')
    } finally {
      reset()
      setLoadingButton(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ py: 3 }}>
        <Grid size={{ xs: 12, md: 12 }}>
          <TextField
            fullWidth
            label="Nhập mật khẩu mới *"
            error={!!errors['new_password']}
            type={showNewPassword ? 'text' : 'password'}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                      <Iconify icon={showNewPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                )
              }
            }}
            sx={{
              mb: 3,
              '& input::-ms-reveal': { display: 'none' }
            }}
            {...register('new_password', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {errors['new_password'] && (
            <Alert severity="error" sx={{ mb: 3 }}>{String(errors['new_password']?.message)}</Alert>
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              loading={loadingButton}
              loadingPosition='start'
              type="submit"
              size='large'
              variant="contained"
              color="primary"
              sx={{
                minWidth: 120,
                transition: 'all 0.2s ease'
              }}
            >
              Đổi mật khẩu
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default DetailProfileUserAccount
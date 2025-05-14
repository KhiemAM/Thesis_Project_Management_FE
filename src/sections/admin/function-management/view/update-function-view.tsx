import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'

import { RouterLink } from 'src/routes/components'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import { DashboardContent } from 'src/layouts/dashboard'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

// ----------------------------------------------------------------------
const _type = [
  {
    value: 'GROUP',
    label: 'Quyền truy cập'
  },
  {
    value: 'API',
    label: 'Quyền thao tác'
  }
]

const _status = [
  {
    value: 'ACTIVATE',
    label: 'Hoạt động'
  },
  {
    value: 'DEACTIVATE',
    label: 'Ngừng hoạt động'
  }
]

interface IFormInputUpdateFunction {
  function: string;
  path: string;
  parentFunction: string;
  type: string;
  status: string;
}

export function UpdateFunctionView() {
  const theme = useTheme()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputUpdateFunction>()

  return (
    <form onSubmit={handleSubmit((data) => {
      console.log(data)
    })}>
      <DashboardContent>
        <Box
          component={RouterLink}
          href='/user/list'
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            color: 'text.primary',
            textDecoration: 'none'
          }}
          gap={1}
        >
          <Iconify icon='solar:alt-arrow-left-line-duotone'/>
          <Typography variant="h4" sx={{ flexGrow: 1 }} >
            Cập nhật chức năng
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
                label="Tên chức năng *"
                error={!!errors['function']}
                sx={{ mb: 3 }}
                {...register('function', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['function'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['function']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Đường dẫn *"
                error={!!errors['path']}
                sx={{ mb: 3 }}
                {...register('path', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['path'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['path']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                select
                label="Chọn loại chức năng *"
                error={!!errors['type']}
                sx={{ mb: 3 }}
                {...register('type', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              >
                <ListSubheader sx={{ bgcolor: theme.vars.palette.primary.main, borderStartStartRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
                    <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                      Giá trị
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                      Nhãn
                    </Typography>
                  </Box>
                </ListSubheader>
                {_type.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.value}</Typography>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
              {errors['type'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['type']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                select
                label="Chọn trạng thái"
                sx={{ mb: 3 }}
                defaultValue='ACTIVATE'
                {...register('status')}
              >
                <ListSubheader sx={{ bgcolor: theme.vars.palette.primary.main, borderStartStartRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
                    <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                      Giá trị
                    </Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                      Nhãn
                    </Typography>
                  </Box>
                </ListSubheader>
                {_status.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.value}</Typography>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                sx={{
                  width: { sm: '100%', md: '30%' },
                  ml: { sm: 'none', md: 'auto' }
                }}
              >
                Cập nhật
              </Button>
            </Box>
          </Scrollbar>
        </Card>
      </DashboardContent>
    </form>
  )
}

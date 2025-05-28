import { useForm } from 'react-hook-form'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'
import { Grid, Stack, Button, useTheme } from '@mui/material'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import { _function } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import { Scrollbar } from 'src/components/scrollbar'
import { UniversalCheckboxTree } from 'src/components/list'

// ----------------------------------------------------------------------

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

interface IFormInputCreateRole {
  roleId: string;
  roleName: string;
  description: string;
  status: string;
}

export function CreateRoleView() {
  const theme = useTheme()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputCreateRole>()

  return (
    <form onSubmit={handleSubmit((data) => {
      console.log(data)
    })}>
      <DashboardContent>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Thêm vai trò mới
          </Typography>
        </Box>

        <Stack>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
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
                      label="Mã vai trò *"
                      error={!!errors['roleId']}
                      sx={{ mb: 3 }}
                      {...register('roleId', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                    />
                    {errors['roleId'] && (
                      <Alert severity="error" sx={{ mb: 3 }}>{String(errors['roleId']?.message)}</Alert>
                    )}

                    <TextField
                      fullWidth
                      label="Tên vai trò *"
                      error={!!errors['roleName']}
                      sx={{ mb: 3 }}
                      {...register('roleName', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                    />
                    {errors['roleName'] && (
                      <Alert severity="error" sx={{ mb: 3 }}>{String(errors['roleName']?.message)}</Alert>
                    )}

                    <TextField
                      fullWidth
                      label="Mô tả vai trò"
                      sx={{ mb: 3 }}
                      {...register('description')}
                    />

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
                  Thêm mới
                    </Button>
                  </Box>
                </Scrollbar>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <Typography variant="h6" sx={{ p: 3 }}>
                  Chọn chức năng
                </Typography>

                <Divider />

                <Scrollbar sx={{ maxHeight: 400, overflow: 'auto' }}>
                  <UniversalCheckboxTree items={_function} label='function'/>
                </Scrollbar>
              </Card>
            </Grid>
          </Grid>
        </Stack>

      </DashboardContent>
    </form>
  )
}

import _ from 'lodash'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'
import { Grid, Stack, Button, useTheme } from '@mui/material'

import { RouterLink } from 'src/routes/components'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import rolesApi from 'src/axios/roles'
import { useLoading } from 'src/context'
import functionsApi from 'src/axios/functions'
import { DashboardContent } from 'src/layouts/dashboard'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { UniversalCheckboxTree } from 'src/components/list'

// ----------------------------------------------------------------------

const _status = [
  {
    value: '1',
    label: 'Hoạt động'
  },
  {
    value: '0',
    label: 'Ngừng hoạt động'
  }
]

interface IFormInputUpdateRole {
  role_code: string;
  role_name: string;
  description: string;
  status: string;
}

interface RoleDetail {
    roleId: string;
    roleName: string;
    description: string;
    status: string;
    // Add other properties if needed
  }

export function UpdateRoleView() {
  const theme = useTheme()
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<IFormInputUpdateRole>()
  const { id } = useParams()
  const navigate = useNavigate()
  const { setIsLoading } = useLoading()
  const [roleDetail, setRoleDetail] = useState<RoleDetail | null>(null)
  const [functions, setFunctions] = useState([])
  const [checkedIds, setCheckedIds] = useState<string[]>([])
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  const flattenFunctionIds = useCallback((functionList: any[]): string[] => _(functionList)
    .flatMap((f) => {
      if (!f || typeof f.id === 'undefined') return [] // bỏ qua nếu không hợp lệ
      const children = Array.isArray(f.children) ? f.children : []
      return [f, ...flattenFunctionIds(children)]
    })
    .map((f) => String(f.id))
    .filter((functionId) => functionId !== 'undefined') // Bỏ các giá trị 'undefined' string
    .value(), [])


  const fetchFunctions = useCallback(async () => {
    try {
      setIsLoading(true)
      const resFunctionDetail = await rolesApi.getRoleById(id as string)
      const resFunctions = await functionsApi.getAllFunctions()
      setFunctions(resFunctions.data)
      setRoleDetail(resFunctionDetail.data)
      setCheckedIds(flattenFunctionIds(resFunctionDetail.data.function))
    } finally {
      setIsLoading(false)
    }
  }, [id, setIsLoading, flattenFunctionIds])

  useEffect(() => {
    fetchFunctions()
  }, [fetchFunctions])

  useEffect(() => {
    if (roleDetail) {
      reset({
        role_code: roleDetail.roleId,
        role_name: roleDetail.roleName,
        description: roleDetail.description,
        status: roleDetail.status
      })
    }
  }, [roleDetail, reset])

  const submitUpdateRole = async (data: IFormInputUpdateRole) => {
    try {
      setIsLoadingButton(true)
      const newData = {
        ...data,
        function_ids: checkedIds
      }
      await rolesApi.updateRole(id as string, newData)
      toast.success('Cập nhật vai trò thành công!')
      // Reset form after successful submission
      navigate('/role/list')
    } finally {
      setIsLoadingButton(false)
    }
  }

  const handleChangeChecked = (ids: string[]) => {
    setCheckedIds(ids)
  }

  return (
    <form onSubmit={handleSubmit(submitUpdateRole)}>
      <DashboardContent>
        <Box
          component={RouterLink}
          href='/role/list'
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
            Cập nhật vai trò
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
                      disabled
                      fullWidth
                      label="Mã vai trò *"
                      error={!!errors['role_code']}
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      sx={{ mb: 3 }}
                      {...register('role_code', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                    />
                    {errors['role_code'] && (
                      <Alert severity="error" sx={{ mb: 3 }}>{String(errors['role_code']?.message)}</Alert>
                    )}

                    <TextField
                      fullWidth
                      label="Tên vai trò *"
                      error={!!errors['role_name']}
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      sx={{ mb: 3 }}
                      {...register('role_name', {
                        required: FIELD_REQUIRED_MESSAGE
                      })}
                    />
                    {errors['role_name'] && (
                      <Alert severity="error" sx={{ mb: 3 }}>{String(errors['role_name']?.message)}</Alert>
                    )}

                    <TextField
                      fullWidth
                      label="Mô tả vai trò"
                      slotProps={{
                        inputLabel: { shrink: true }
                      }}
                      sx={{ mb: 3 }}
                      {...register('description')}
                    />

                    <TextField
                      fullWidth
                      select
                      label="Chọn trạng thái *"
                      sx={{ mb: 3 }}
                      value={watch('status') || '1'}
                      {...register('status', {
                        required: FIELD_REQUIRED_MESSAGE,
                        onChange: (e) => {
                          const value = e.target.value
                          reset((prev) => ({
                            ...prev,
                            status: value
                          }))
                        }
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
                      loading={isLoadingButton}
                      loadingPosition='start'
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
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <Typography variant="h6" sx={{ p: 3 }}>
                  Chọn chức năng
                </Typography>

                <Divider />

                <Scrollbar sx={{ maxHeight: 400, overflow: 'auto' }}>
                  <UniversalCheckboxTree
                    items={functions}
                    label='name'
                    checkedIds={checkedIds}
                    onChange={handleChangeChecked}
                  />
                </Scrollbar>
              </Card>
            </Grid>
          </Grid>
        </Stack>

      </DashboardContent>
    </form>
  )
}

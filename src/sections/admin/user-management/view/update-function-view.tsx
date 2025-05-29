import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
import FormHelperText from '@mui/material/FormHelperText'

import { RouterLink } from 'src/routes/components'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import { useLoading } from 'src/context'
import functionsApi from 'src/axios/functions'
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
    value: '1',
    label: 'Hoạt động'
  },
  {
    value: '0',
    label: 'Ngừng hoạt động'
  }
]

interface IFormInputCreateFunction {
  name: string;
  description: string;
  path: string;
  parent_id: string;
  type: string;
  status: string;
}

export function UpdateFunctionView() {
  const theme = useTheme()
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<IFormInputCreateFunction>()
  const selectedType = watch('type')
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [_parentName, setParentName] = useState<{ value: string; label: string }[]>([])
  const [functionDetail, setFunctionDetail] = useState<IFormInputCreateFunction | null>(null)
  const { setIsLoading } = useLoading()
  const { id } = useParams()
  const navigate = useNavigate()

  const fetchFunctions = useCallback(async () => {
    try {
      setIsLoading(true)
      const resFunctionsParent = await functionsApi.getAllFunctionsParent()
      const resFunctionDetail = await functionsApi.getFunctionById(id as string)
      setParentName(resFunctionsParent.data.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name
      })))
      setFunctionDetail(resFunctionDetail.data)
    } finally {
      setIsLoading(false)
    }
  }, [id, setIsLoading])

  useEffect(() => {
    fetchFunctions()
  }, [fetchFunctions])

  useEffect(() => {
    if (functionDetail) {
      reset({
        name: functionDetail.name,
        description: functionDetail.description,
        path: functionDetail.path,
        parent_id: functionDetail.parent_id,
        type: functionDetail.type,
        status: functionDetail.status
      })
    }
  }, [functionDetail, reset])

  const submitCreateFunction = async (data: IFormInputCreateFunction) => {
    try {
      setIsLoadingButton(true)
      await functionsApi.updateFunction(id as string, data)
      toast.success('Cập nhật chức năng thành công!')
      // Reset form after successful submission
      navigate('/function/list')
    } finally {
      setIsLoadingButton(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitCreateFunction)}>
      <DashboardContent>
        <Box
          component={RouterLink}
          href='/function/list'
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
                error={!!errors['name']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                sx={{ mb: 3 }}
                {...register('name', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['name'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['name']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Mô tả *"
                error={!!errors['description']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                sx={{ mb: 3 }}
                {...register('description', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['description'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['description']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Đường dẫn *"
                error={!!errors['path']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
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
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                sx={{ mb: 3 }}
                value={watch('type') || 'GROUP'}
                {...register('type', {
                  required: FIELD_REQUIRED_MESSAGE,
                  onChange: (e) => {
                    const value = e.target.value
                    reset((prev) => ({
                      ...prev,
                      type: value
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

              {/* If the function type is API, the parent function selection appears. */}
              {selectedType === 'API' && (
                <>
                  <FormHelperText sx={{ mb: 1, ml: 1 }}>
                    * Trường này chỉ hiển thị khi loại chức năng là <b>API</b>
                  </FormHelperText>
                  <TextField
                    fullWidth
                    select
                    label="Chọn chức năng cha *"
                    error={!!errors['parent_id']}
                    sx={{ mb: 3 }}
                    value={watch('parent_id') || null}
                    {...register('parent_id', {
                      required: FIELD_REQUIRED_MESSAGE,
                      onChange: (e) => {
                        const value = e.target.value
                        reset((prev) => ({
                          ...prev,
                          parent_id: value
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
                    {_parentName.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                          <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.value}</Typography>
                          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                          <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.label}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                  {errors['parent_id'] && (
                    <Alert severity="error" sx={{ mb: 3 }}>{String(errors['parent_id']?.message)}</Alert>
                  )}
                </>
              )}

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
                Cập nhật
              </Button>
            </Box>
          </Scrollbar>
        </Card>
      </DashboardContent>
    </form>
  )
}

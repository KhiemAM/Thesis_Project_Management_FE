import 'dayjs/locale/vi'

import type { Dayjs } from 'dayjs'
import type { SubmitHandler } from 'react-hook-form'

import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'
import { Divider, MenuItem, useTheme } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import { useLoading } from 'src/context'
import thesesApi from 'src/axios/theses'
import profileApi from 'src/axios/profile'

dayjs.locale('vi')
//-------------------------------------------------------------------------
const _gender = [
  { value: '1', label: 'Nam' },
  { value: '2', label: 'Nữ' }
]

const _title = [
  { value: '1', label: 'Thạc sĩ' },
  { value: '2', label: 'Tiến sĩ' },
  { value: '3', label: 'Phó giáo sư' },
  { value: '4', label: 'Giáo sư' }
]

export type StudentProfileProps = {
  user_id: string;
  information: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: Dayjs | string;
    gender: string;
    address: string;
    tel_phone: string;
  };
  lecturer_info: {
    lecturer_code: string;
    department: string;
    title: string;
    email: string;
    id: string;
    user_id: string;
    department_name: string;
    create_datetime: Dayjs | string; // hoặc Date nếu bạn parse dữ liệu
    update_datetime: Dayjs | string;
  };
};


interface ProfileStudentInformationProps {
  initialValues: StudentProfileProps | null;
  onRefresh?: () => void; // Hàm callback để làm mới dữ liệu sau khi cập nhật
}

interface IFormInput {
  first_name: string;
  last_name: string;
  date_of_birth: string | Dayjs;
  gender: string;
  address?: string;
  tel_phone?: string;
  lecturer_code: string;
  department: string;
  title: string;
  email: string;
}

const ProfileStudentInformation = ({
  initialValues = null,
  onRefresh
} : ProfileStudentInformationProps) => {
  const theme = useTheme()
  const { setIsLoading } = useLoading()
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const [_departments, setDepartments] = useState<{ value: string; label: string }[]>([])

  const fetchStudentInfo = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await thesesApi.getAllDepartments()
      setDepartments(res.data.map((item: { id: string; name: string }) => ({
        value: item.id,
        label: item.name
      })))
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  useEffect(() => {
    fetchStudentInfo()
  }, [fetchStudentInfo])

  useEffect(() => {
    if (initialValues) {
      setIsEditing(false) // Nếu có dữ liệu, chuyển sang chế độ chỉ xem
    }
  }, [initialValues])

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IFormInput>()

  useEffect(() => {
    if (initialValues) {
      reset({
        first_name: initialValues.information.first_name,
        last_name: initialValues.information.last_name,
        gender: initialValues.information.gender,
        address: initialValues.information.address,
        tel_phone: initialValues.information.tel_phone,
        date_of_birth: dayjs(initialValues.information.date_of_birth),
        lecturer_code: initialValues.lecturer_info.lecturer_code,
        department: initialValues.lecturer_info.department,
        title: initialValues.lecturer_info.title,
        email: initialValues.lecturer_info.email
      })
    }
  }, [initialValues, reset])

  const handleCreateStudentInfo: SubmitHandler<IFormInput> = async(data) => {
    try {
      const newData = {
        information: {
          first_name: data.first_name,
          last_name: data.last_name,
          date_of_birth: dayjs(data.date_of_birth).format('YYYY-MM-DDTHH:mm:ss'),
          gender: data.gender,
          address: data.address || '',
          tel_phone: data.tel_phone || ''
        },
        lecturer_info: {
          lecturer_code: data.lecturer_code,
          department: data.department,
          title: data.title,
          email: data.email
        }
      }
      setIsLoadingButton(true)
      if (initialValues) {
        // Cập nhật thông tin sinh viên
        await profileApi.updateLecturerProfile(newData)
        toast.success('Cập nhật thông tin giảng viên thành công!')
      }
      else {
        // Tạo mới thông tin sinh viên
        await profileApi.createLecturerProfile(newData)
        toast.success('Tạo thông tin giảng viên thành công!')
      }
    } finally {
      onRefresh?.()
      setIsLoadingButton(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleCreateStudentInfo)}>
      <Grid container spacing={3} sx={{ py: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Mã số giáo viên *"
            error={!!errors['lecturer_code']}
            variant="outlined"
            disabled={!isEditing}
            slotProps={{
              inputLabel: { shrink: true }
            }}
            {...register('lecturer_code', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {errors['lecturer_code'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['lecturer_code']?.message)}</Alert>
          )
          }
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="department"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                select
                label="Bộ môn *"
                disabled={!isEditing}
                error={!!errors['department']}
                {...field}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
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

                {_departments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <Typography
                        variant="body1"
                        sx={{
                          flex: 1,
                          textAlign: 'center',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {option.value}
                      </Typography>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                      <Typography variant="body1" sx={{ flex: 1, textAlign: 'center' }}>
                        {option.label}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          {errors['department'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['department']?.message)}</Alert>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="title"
            control={control}
            defaultValue="Thạc sĩ" // giá trị mặc định nếu chưa có
            render={({ field }) => (
              <TextField
                fullWidth
                select
                label="Trình độ"
                disabled={!isEditing}
                {...field} // bao gồm value + onChange
                error={!!errors['title']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
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
                {_title.map((option) => (
                  <MenuItem key={option.value} value={option.label}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.value}</Typography>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Tên giảng viên *"
            error={!!errors['first_name']}
            variant="outlined"
            disabled={!isEditing}
            slotProps={{
              inputLabel: { shrink: true }
            }}
            {...register('first_name', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {errors['first_name'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['first_name']?.message)}</Alert>
          )
          }
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Họ giảng viên *"
            error={!!errors['last_name']}
            variant="outlined"
            disabled={!isEditing}
            slotProps={{
              inputLabel: { shrink: true }
            }}
            {...register('last_name', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {errors['last_name'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['last_name']?.message)}</Alert>
          )
          }
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="date_of_birth"
            control={control}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi'>
                <DatePicker
                  label="Ngày sinh *"
                  dayOfWeekFormatter={(weekday) => `${(weekday as Dayjs).format('dd')}`}
                  enableAccessibleFieldDOMStructure={false}
                  disabled={!isEditing}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => field.onChange(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!errors['date_of_birth'],
                      slotProps: {
                        inputLabel: { shrink: true }
                      }
                    }
                  }}
                />
              </LocalizationProvider>
            )}
          />
          {errors['date_of_birth'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['date_of_birth']?.message)}</Alert>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="gender"
            control={control}
            defaultValue="1" // giá trị mặc định nếu chưa có
            render={({ field }) => (
              <TextField
                fullWidth
                select
                label="Giới tính"
                disabled={!isEditing}
                {...field} // bao gồm value + onChange
                error={!!errors['gender']}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
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
                {_gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.value}</Typography>
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Email *"
            error={!!errors['email']}
            variant="outlined"
            disabled={!isEditing}
            slotProps={{
              inputLabel: { shrink: true }
            }}
            {...register('email', {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: EMAIL_RULE,
                message: EMAIL_RULE_MESSAGE
              }
            })}
          />
          {errors['email'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['email']?.message)}</Alert>
          )
          }
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Địa chỉ"
            variant="outlined"
            disabled={!isEditing}
            slotProps={{
              inputLabel: { shrink: true }
            }}
            {...register('address')}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Điện thoại"
            variant="outlined"
            disabled={!isEditing}
            slotProps={{
              inputLabel: { shrink: true }
            }}
            {...register('tel_phone')}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {initialValues ? (
              isEditing ? (
                <>
                  <Button
                    loading={isLoadingButton}
                    loadingPosition='start'
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: 120, transition: 'all 0.2s ease' }}
                  >
                    Cập nhật thông tin
                  </Button>
                  <Button
                    type="button"
                    size="large"
                    variant="outlined"
                    onClick={(event) => {
                      event.preventDefault()
                      reset()
                      setIsEditing(false)
                    }}
                    sx={{ ml: 2 }}
                  >
                    Hủy bỏ
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    event.preventDefault()
                    setIsEditing(true)
                  }}
                  sx={{ minWidth: 120, transition: 'all 0.2s ease' }}
                >
                  Chỉnh sửa thông tin
                </Button>
              )
            ) : (
              <Button
                loading={isLoadingButton}
                loadingPosition='start'
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                sx={{ minWidth: 120, transition: 'all 0.2s ease' }}
              >
                Tạo thông tin
              </Button>
            )}
          </Box>

        </Grid>
      </Grid>
    </form>
  )
}

export default ProfileStudentInformation
import 'dayjs/locale/vi'

import type { Dayjs } from 'dayjs'
import type { SubmitHandler } from 'react-hook-form'

import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { MenuItem, useTheme } from '@mui/material'
import ListSubheader from '@mui/material/ListSubheader'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

dayjs.locale('vi')

interface ProfileStudentInformationProps {
  initialValues?: {
    first_name: string;
    last_name: string;
    date_of_birth: string | Dayjs;
    gender: string;
    address: string;
    tel_phone: string;
    student_code: string;
    class_name: string;
    major_name: string;
  };
  onSave?: (values: any) => void;
}

interface IFormInput {
  first_name: string;
  last_name: string;
  date_of_birth: string | Dayjs;
  gender: string;
  address?: string;
  tel_phone?: string;
  student_code: string;
  class_name: string;
  major_name: string;
}

const ProfileStudentInformation = ({
  initialValues = {
    first_name: 'khiem',
    last_name: '',
    date_of_birth: '',
    gender: '',
    address: '',
    tel_phone: '',
    student_code: '',
    class_name: '',
    major_name: ''
  },
  onSave
} : ProfileStudentInformationProps) => {
  const theme = useTheme()
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm<IFormInput>({
    defaultValues: initialValues
  })
  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    console.log('🚀 ~ constonSubmit:SubmitHandler<IFormInput>=async ~ data:', data)
  }

  const handleValueDateOfBirth = useCallback(
    (value: unknown, context: any) => {
      // value can be Dayjs | null | string | number | Date, but we expect Dayjs or null
      const newValue = value as Dayjs | null
      if (newValue && dayjs.isDayjs(newValue)) {
        const formattedDate = dayjs(newValue).format('DD/MM/YYYY')
        setValue('date_of_birth', formattedDate) // Cập nhật giá trị vào react-hook-form
      }
    },
    [setValue]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ py: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Mã số sinh viên *"
            error={!!errors['student_code']}
            variant="outlined"
            disabled={!isEditing}
            {...register('student_code', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {errors['student_code'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['student_code']?.message)}</Alert>
          )
          }
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Lớp học *"
            error={!!errors['class_name']}
            variant="outlined"
            disabled={!isEditing}
            {...register('class_name', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {errors['class_name'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['class_name']?.message)}</Alert>
          )
          }
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Chuyên ngành *"
            error={!!errors['major_name']}
            variant="outlined"
            disabled={!isEditing}
            {...register('major_name', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {errors['major_name'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['major_name']?.message)}</Alert>
          )
          }
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Tên sinh viên *"
            error={!!errors['first_name']}
            variant="outlined"
            disabled={!isEditing}
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
            label="Họ sinh viên *"
            error={!!errors['last_name']}
            variant="outlined"
            disabled={!isEditing}
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
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi'>
            <DatePicker
              label="Ngày sinh *"
              dayOfWeekFormatter={(weekday) => `${(weekday as Dayjs).format('dd')}`}
              enableAccessibleFieldDOMStructure={false}
              disabled={!isEditing}
              defaultValue={dayjs(getValues('date_of_birth'))}
              onChange={handleValueDateOfBirth}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={!!errors['date_of_birth']}
                    variant="outlined"
                    {...register('date_of_birth', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                  />
                )
              }}
            />
          </LocalizationProvider>
          {errors['date_of_birth'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['date_of_birth']?.message)}</Alert>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            select
            label="Chọn giới tính *"
            error={!!errors['gender']}
            disabled={!isEditing}
            {...register('gender', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          >
            <ListSubheader sx={{ bgcolor: theme.vars.palette.primary.main, borderStartStartRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
                <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                  Giới tính
                </Typography>
              </Box>
            </ListSubheader>
            <MenuItem value="Nam">
              <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>Nam</Typography>
            </MenuItem>
            <MenuItem value="Nữ">
              <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>Nữ</Typography>
            </MenuItem>
          </TextField>
          {errors['gender'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['gender']?.message)}</Alert>
          )}
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Địa chỉ"
            variant="outlined"
            disabled={!isEditing}
            {...register('address')}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="Điện thoại"
            variant="outlined"
            disabled={!isEditing}
            {...register('tel_phone')}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {isEditing ? (
              <Button
                type="submit"
                size='large'
                variant="contained"
                color="primary"
                sx={{
                  minWidth: 120,
                  transition: 'all 0.2s ease'
                }}
              >
                Cập nhật
              </Button>
            ) : (
              <Button
                type='button'
                size='large'
                variant="contained"
                color="primary"
                onClick={(event) => {
                  event.preventDefault()
                  setIsEditing(true)
                }}
                sx={{
                  minWidth: 120,
                  transition: 'all 0.2s ease'
                }}
              >
                Chỉnh sửa
              </Button>
            )}
            {isEditing && (
              <Button
                type='button'
                size='large'
                variant="outlined"
                onClick={(event) => {
                  event.preventDefault()
                  reset()
                  setIsEditing(false)
                }}
                sx={{ ml: 2 }}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </form>
  )
}

export default ProfileStudentInformation
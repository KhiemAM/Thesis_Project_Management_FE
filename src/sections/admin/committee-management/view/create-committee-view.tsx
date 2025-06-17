import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'

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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import thesesApi from 'src/axios/theses'
import { useLoading } from 'src/context'
import { DashboardContent } from 'src/layouts/dashboard'

import { Scrollbar } from 'src/components/scrollbar'

// ----------------------------------------------------------------------

interface IFormInputCreateFunction {
  name: string;
  date: string;
  location: string;
  major: string;
}

export function CreateCommitteeView() {
  const theme = useTheme()
  const { setIsLoading } = useLoading()
  const { register, handleSubmit, formState: { errors }, control } = useForm<IFormInputCreateFunction>()
  const [major, setMajor] = useState<{ value: string; label: string }[]>([])

  const fetchMajor = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await thesesApi.getAllMajor()
      setMajor(res.data.map((item: { id: string, name: string }) => ({ value: item.id, label: item.name })))
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

  useEffect(() => {
    // fetchMajor()
  }, [fetchMajor])

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
            Lập đề xuất đề tài
          </Typography>
        </Box>

        <Scrollbar>
          <Card sx={{ width: { sm: '100%', md: '80%' }, mx: { sm: 'none', md: 'auto' } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
              <TextField
                fullWidth
                label="Tên hội đồng *"
                error={!!errors['name']}
                sx={{ mb: 3 }}
                {...register('name', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['name'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['name']?.message)}</Alert>
              )}

              <Controller
                name="date"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi'>
                    <DateTimePicker
                      label="Thời gian *"
                      dayOfWeekFormatter={(weekday) => `${(weekday as Dayjs).format('dd')}`}
                      enableAccessibleFieldDOMStructure={false}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: 'outlined',
                          error: !!errors['date'],
                          slotProps: {
                            inputLabel: { shrink: true }
                          }
                        }
                      }}
                      sx={{ mb: 3 }}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors['date'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['date']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Địa điểm *"
                error={!!errors['location']}
                sx={{ mb: 3 }}
                {...register('location', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['location'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['location']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                select
                label="Chuyên ngành *"
                defaultValue=''
                error={!!errors['major']}
                sx={{ mb: 3 }}
                {...register('major', {
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
                {major.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <Typography
                        variant='body1'
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
                      <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.label}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
              {errors['major'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['major']?.message)}</Alert>
              )}
            </Box>
          </Card>

          <Card sx={{ width: { sm: '100%', md: '80%' }, mx: { sm: 'none', md: 'auto' }, mt: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
              <></>
            </Box>
          </Card>

          <Card sx={{ width: { sm: '100%', md: '80%' }, mx: { sm: 'none', md: 'auto' }, mt: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
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
                Lập đề xuất
              </Button>
            </Box>
          </Card>
        </Scrollbar>
      </DashboardContent>
    </form>
  )
}

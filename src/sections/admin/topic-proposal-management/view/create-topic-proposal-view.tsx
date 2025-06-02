import { toast } from 'react-toastify'
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

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import userApi from 'src/axios/user'
import { useLoading } from 'src/context'
import thesesApi from 'src/axios/theses'
import academyApi from 'src/axios/academy'
import { DashboardContent } from 'src/layouts/dashboard'

import { Scrollbar } from 'src/components/scrollbar'
import { MultipleSelectTextField } from 'src/components/select'

// ----------------------------------------------------------------------
const _thesis_type = [
  {
    value: '1',
    label: 'Đồ án tốt nghiệp'
  },
  {
    value: '2',
    label: 'Khóa luận kỹ sư'
  }
]

interface IFormInputCreateThese {
  academy_years: string;
  academy_semesters: string;
  batch_id: string;
  title: string;
  description: string;
  thesis_type: string;
  major_id: string;
  lecturer_ids: string[];
}

export function CreateTopicProposalView() {
  const theme = useTheme()
  const { setIsLoading } = useLoading()
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch, reset, control } = useForm<IFormInputCreateThese>({
    defaultValues: {
      lecturer_ids: []
    }
  })
  const [academyYears, setAcademyYears] = useState<{ value: string; label: string }[]>([])
  const [academySemestes, setAcademySemestes] = useState<{ value: string; label: string }[]>([])
  const [academyBatches, setAcademyBatches] = useState<{
    value: string
    label: string
    start_date: string
    end_date: string
  }[]>([])
  const [userLecturers, setUserLecturers] = useState<{ value: string; label: string }[]>([])
  const [major, setMajor] = useState<{ value: string; label: string }[]>([])
  const [selectedBatchInfo, setSelectedBatchInfo] = useState<{
    value: string
    label: string
    start_date: string
    end_date: string
  } | null>(null)
  const selectedAcademyYear = watch('academy_years')
  const selectedAcademySemester = watch('academy_semesters')
  const selectedBatchId = watch('batch_id')

  const fetchAcademyYears = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await academyApi.getAcademyYears()
      setAcademyYears(res.data.map((year: { id: string, name: string }) => ({ value: year.id, label: year.name })))
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

  const fetchUserLecturers = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await userApi.getUserLectures()
      setUserLecturers(res.data.map((item: { id: string, first_name: string, last_name: string, title: string }) => ({
        value: item.id,
        label: `${item.title}. ${item.last_name} ${item.first_name}`
      })))
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

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
    fetchAcademyYears()
    fetchUserLecturers()
    fetchMajor()
  }, [fetchMajor, fetchAcademyYears, fetchUserLecturers])

  const fetchAcademySemestes = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      const res = await academyApi.getAcademySemestes(id)
      setAcademySemestes(res.data.map((year: { id: string, name: string }) => ({ value: year.id, label: year.name })))
    } catch {
      setAcademySemestes([])
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

  useEffect(() => {
    if (selectedAcademyYear) {
      fetchAcademySemestes(selectedAcademyYear)
    }
  }, [selectedAcademyYear, fetchAcademySemestes])

  const fetchAcademyBatches = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      const res = await academyApi.getAcademyBatches(id)
      setAcademyBatches(res.data.map((item: { id: string, name: string, start_date: string, end_date: string }) => ({
        value: item.id,
        label: item.name,
        start_date: item.start_date,
        end_date: item.end_date
      })))
    } catch {
      setAcademyBatches([])
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

  useEffect(() => {
    if (selectedAcademySemester) {
      fetchAcademyBatches(selectedAcademySemester)
    }
  }, [selectedAcademySemester, fetchAcademyBatches])

  useEffect(() => {
    const selected = academyBatches.find((batch) => batch.value === selectedBatchId)
    if (selected) {
      setSelectedBatchInfo(selected)
    }
  }, [selectedBatchId, academyBatches])

  const submitCreateThese = async (data: IFormInputCreateThese) => {
    try {
      setIsLoadingButton(true)
      const newData = {
        batch_id: data.batch_id,
        title: data.title,
        description: data.description,
        thesis_type: data.thesis_type,
        lecturer_ids: data.lecturer_ids,
        status: 3,
        major_id: data.major_id,
        start_date: selectedBatchInfo?.start_date,
        end_date: selectedBatchInfo?.end_date
      }
      await thesesApi.createThese(newData)
      toast.success('Thêm đề tài thành công!')
      // Reset form after successful submission
      reset()
    } finally {
      setIsLoadingButton(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitCreateThese)}>
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
                select
                label="Năm học *"
                defaultValue=''
                error={!!errors['academy_years']}
                sx={{ mb: 3 }}
                {...register('academy_years', {
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
                {academyYears.map((option) => (
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
              {errors['academy_years'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['academy_years']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                select
                label="Học kỳ *"
                defaultValue=''
                error={!!errors['academy_semesters']}
                sx={{ mb: 3 }}
                {...register('academy_semesters', {
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
                {academySemestes.map((option) => (
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
              {errors['academy_semesters'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['academy_semesters']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                select
                label="Đợt *"
                defaultValue=''
                error={!!errors['batch_id']}
                sx={{ mb: 3 }}
                {...register('batch_id', {
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
                {academyBatches.map((option) => (
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
              {errors['batch_id'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['batch_id']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Tên đề tài *"
                error={!!errors['title']}
                sx={{ mb: 3 }}
                {...register('title', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['title'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['title']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Mô tả nội dung yêu cầu *"
                error={!!errors['description']}
                multiline
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
                select
                label="Chuyên ngành *"
                defaultValue=''
                error={!!errors['major_id']}
                sx={{ mb: 3 }}
                {...register('major_id', {
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
              {errors['major_id'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['major_id']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                select
                label="Loại đề tài *"
                defaultValue='1'
                error={!!errors['thesis_type']}
                sx={{ mb: 3 }}
                {...register('thesis_type', {
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
                {_thesis_type.map((option) => (
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
              {errors['thesis_type'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['thesis_type']?.message)}</Alert>
              )}

              <Controller
                name="lecturer_ids"
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                control={control}
                render={({ field }) => (
                  <MultipleSelectTextField
                    data={userLecturers}
                    inputLabel='Giáo viên hướng dẫn'
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors['lecturer_ids']}
                  />
                )}
              />
              {errors['lecturer_ids'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['lecturer_ids']?.message)}</Alert>
              )}

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
                Lập đề xuất
              </Button>
            </Box>
          </Scrollbar>
        </Card>
      </DashboardContent>
    </form>
  )
}

import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ListSubheader from '@mui/material/ListSubheader'
import { useTheme, FormHelperText } from '@mui/material'

import { fDate, fIsoDateTime } from 'src/utils/format-time'
import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import userApi from 'src/axios/user'
import { useLoading } from 'src/context'
import thesesApi from 'src/axios/theses'
import academyApi from 'src/axios/academy'
import { DashboardContent } from 'src/layouts/dashboard'
import { TopicStatusCode } from 'src/constants/topic-status'

import { Scrollbar } from 'src/components/scrollbar'
import { MultipleSelectTextField } from 'src/components/select'
import { SingleSelectTextField } from 'src/components/select/single-select-text-field'

// ----------------------------------------------------------------------
const _thesis_type = [
  {
    value: '1',
    label: 'Khóa luận kỹ sư'
  },
  {
    value: '2',
    label: 'Đồ án tốt nghiệp'
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
  instructor_ids: string[];
  reviewer_ids: string[];
  department_id: string;
}

export function CreateTopicProposalView() {
  const theme = useTheme()
  const { setIsLoading } = useLoading()
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const { register, handleSubmit, formState: { errors }, watch, reset, control } = useForm<IFormInputCreateThese>({
    defaultValues: {
      instructor_ids: [],
      reviewer_ids: []
    }
  })
  const [academyYears, setAcademyYears] = useState([])
  const [academySemestes, setAcademySemestes] = useState([])
  const [academyBatches, setAcademyBatches] = useState<{ id: string; name: string; start_date: string; end_date: string }[]>([])
  const [userLecturers, setUserLecturers] = useState([])
  const [major, setMajor] = useState<{ value: string; label: string }[]>([])
  const [selectedBatchInfo, setSelectedBatchInfo] = useState<{
    id: string;
    name: string;
    start_date: string;
    end_date: string;
  } | null>(null)
  const [_departments, setDepartments] = useState<{ value: string; label: string }[]>([])
  const selectedAcademyYear = watch('academy_years')
  const selectedAcademySemester = watch('academy_semesters')
  const selectedBatchId = watch('batch_id')
  const selectedThesisType = watch('thesis_type')

  const fetchAcademyYears = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await academyApi.getAcademyYears()
      setAcademyYears(res.data.map((item: { start_date: string, end_date: string }) => ({
        ...item,
        start_date: fDate(item.start_date),
        end_date: fDate(item.end_date)
      })))
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

  const fetchUserLecturers = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await userApi.getUserLectures()
      setUserLecturers(res.data.map((item: { first_name: string, last_name: string, title: string }) => ({
        ...item,
        full_name: `${item.title}. ${item.last_name} ${item.first_name}`
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

  const fetchDepartments = useCallback(async () => {
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
    fetchAcademyYears()
    fetchUserLecturers()
    fetchMajor()
    fetchDepartments()
  }, [fetchMajor, fetchAcademyYears, fetchUserLecturers, fetchDepartments])

  const fetchAcademySemestes = useCallback(async (id: string) => {
    try {
      setIsLoading(true)
      const res = await academyApi.getAcademySemestes(id)
      setAcademySemestes(res.data.map((item: { id: string, name: string, start_date: string, end_date: string }) => ({
        ...item,
        start_date: fDate(item.start_date),
        end_date: fDate(item.end_date)
      })))
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
      setAcademyBatches(res.data.map((item: { start_date: string, end_date: string }) => ({
        ...item,
        start_date_fDate: fDate(item.start_date),
        end_date_fDate: fDate(item.end_date)
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
    const selected = academyBatches.find((batch) => batch.id === selectedBatchId)
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
        thesis_type:  data.thesis_type,
        instructor_ids: data.instructor_ids,
        reviewer_ids: data.reviewer_ids,
        department_id: data.department_id,
        status: TopicStatusCode.PENDING_APPROVAL,
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
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="academy_years"
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  control={control}
                  render={({ field }) => (
                    <SingleSelectTextField
                      data={academyYears}
                      columns={[
                        { key: 'name', label: 'Năm học' },
                        { key: 'start_date', label: 'Ngày bắt đầu' },
                        { key: 'end_date', label: 'Ngày kết thúc' }
                      ]}
                      valueKey='id'
                      displayKey='name'
                      inputLabel='Năm học *'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors['academy_years']}
                    />
                  )}
                />
              </Box>
              {errors['academy_years'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['academy_years']?.message)}</Alert>
              )}

              <Box sx={{ mb: 3 }}>
                <Controller
                  name="academy_semesters"
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  control={control}
                  render={({ field }) => (
                    <SingleSelectTextField
                      data={academySemestes}
                      columns={[
                        { key: 'name', label: 'Học kỳ' },
                        { key: 'start_date', label: 'Ngày bắt đầu' },
                        { key: 'end_date', label: 'Ngày kết thúc' }
                      ]}
                      valueKey='id'
                      displayKey='name'
                      inputLabel='Học kỳ *'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors['academy_semesters']}
                    />
                  )}
                />
              </Box>
              {errors['academy_semesters'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['academy_semesters']?.message)}</Alert>
              )}

              <Box sx={{ mb: 3 }}>
                <Controller
                  name="batch_id"
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  control={control}
                  render={({ field }) => (
                    <SingleSelectTextField
                      data={academyBatches}
                      columns={[
                        { key: 'name', label: 'Đợt' },
                        { key: 'start_date_fDate', label: 'Ngày bắt đầu' },
                        { key: 'end_date_fDate', label: 'Ngày kết thúc' }
                      ]}
                      valueKey='id'
                      displayKey='name'
                      inputLabel='Đợt *'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors['batch_id']}
                    />
                  )}
                />
              </Box>
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
                label="Bộ môn *"
                defaultValue=''
                error={!!errors['department_id']}
                sx={{ mb: 3 }}
                {...register('department_id', {
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
                {_departments.map((option) => (
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
              {errors['department_id'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['department_id']?.message)}</Alert>
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

              {selectedThesisType === '2' && (
                <Box sx={{ mb: 3 }}>
                  <FormHelperText sx={{ mb: 1, ml: 1 }}>
                    * Trường này chỉ hiển thị khi loại đề tài là <b>Đồ án tốt nghiệp</b>
                  </FormHelperText>
                  <Controller
                    name="reviewer_ids"
                    rules={{ required: FIELD_REQUIRED_MESSAGE }}
                    control={control}
                    render={({ field }) => (
                      <MultipleSelectTextField
                        data={userLecturers}
                        columns={[
                          { key: 'user_name', label: 'Tên tài khoản' },
                          { key: 'full_name', label: 'Tên giáo viên' }
                        ]}
                        valueKey='id'
                        displayKey='full_name'
                        inputLabel='Giáo viên phản biện'
                        value={field.value}
                        onChange={field.onChange}
                        error={!!errors['reviewer_ids']}
                      />
                    )}
                  />
                  {errors['reviewer_ids'] && (
                    <Alert severity="error" sx={{ mt: 3 }}>{String(errors['reviewer_ids']?.message)}</Alert>
                  )}
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Controller
                  name="instructor_ids"
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  control={control}
                  render={({ field }) => (
                    <MultipleSelectTextField
                      data={userLecturers}
                      columns={[
                        { key: 'user_name', label: 'Tên tài khoản' },
                        { key: 'full_name', label: 'Tên giáo viên' }
                      ]}
                      valueKey='id'
                      displayKey='full_name'
                      inputLabel='Giáo viên hướng dẫn'
                      value={field.value}
                      onChange={field.onChange}
                      error={!!errors['instructor_ids']}
                    />
                  )}
                />
              </Box>
              {errors['instructor_ids'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['instructor_ids']?.message)}</Alert>
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
                  ml: { sm: 'none', md: 'auto' },
                  mt: 3
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

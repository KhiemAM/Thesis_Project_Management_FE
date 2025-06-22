import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import React, { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { fDate } from 'src/utils/format-time'
import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import progressApi from 'src/axios/progress'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import { SingleSelectTextField } from 'src/components/select/single-select-text-field'

import { getColorByPriority } from './utils'
import MessageSection from './progress-group-student-message-section'

import type { Task } from './types'

const _priority = [
  { id: 1, name: 'Thấp' },
  { id: 2, name: 'Trung bình' },
  { id: 3, name: 'Cao' }
]

interface TodoDetailsProps {
  open: boolean;
  onClose: () => void;
  todo: Task | null;
  onRefresh?: () => void;
}

interface IFormInputUpdateTodo {
  title: string;
  description: string;
  due_date: Dayjs | string;
  priority: string;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ open, onClose, todo, onRefresh }) => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IFormInputUpdateTodo>()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
        description: todo.description || '',
        due_date: dayjs(todo.due_date),
        priority: todo.priority
      })
    }
  }, [todo, reset])

  const handleEditToggle = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const submitUpdateTodo = async (data: IFormInputUpdateTodo) => {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        due_date: dayjs(data.due_date).format('YYYY-MM-DDTHH:mm:ss'),
        status: 1,
        priority: data.priority
      }
      if (todo?.id) {
        await progressApi.updateTaskProgress(todo.id, payload)
        toast.success('Cập nhật công việc thành công!')
        handleCloseDialog()
        onRefresh?.()
      }
      setIsLoadingButton(true)
    } finally {
      setIsLoadingButton(false)
    }
  }

  const handleCloseDialog = () => {
    setIsEditing(false)
    onClose()
  }

  if (!todo) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="lg"
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            handleSubmit(submitUpdateTodo)()
          }
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isEditing ? (
          <Typography variant="h6" component='span'>Chỉnh sửa công việc</Typography>
        ) : (
          <Typography variant="h6" component='span'>Chi tiết công việc</Typography>
        )}
        <Box>
          {!isEditing && (
            <IconButton
              edge="end"
              color="primary"
              onClick={handleEditToggle}
              aria-label="edit"
              sx={{ mr: 1 }}
            >
              <Iconify icon='solar:pen-bold' />
            </IconButton>
          )}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <Iconify icon='mingcute:close-line' />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isEditing ? (
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Tên đề tài *"
              error={!!errors['title']}
              sx={{ mt: 3 }}
              {...register('title', {
                required: FIELD_REQUIRED_MESSAGE
              })}
            />
            {errors['title'] && (
              <Alert severity="error" sx={{ mt: 3 }}>{String(errors['title']?.message)}</Alert>
            )}

            <TextField
              fullWidth
              label="Mô tả chi tiết *"
              error={!!errors['description']}
              sx={{ mt: 3 }}
              {...register('description', {
                required: FIELD_REQUIRED_MESSAGE
              })}
            />
            {errors['description'] && (
              <Alert severity="error" sx={{ mt: 3 }}>{String(errors['description']?.message)}</Alert>
            )}

            <Box sx={{ mt: 3 }}>
              <Controller
                name="due_date"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi'>
                    <DatePicker
                      label="Ngày đến hạn *"
                      dayOfWeekFormatter={(weekday) => `${(weekday as Dayjs).format('dd')}`}
                      enableAccessibleFieldDOMStructure={false}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: 'outlined',
                          error: !!errors['due_date'],
                          slotProps: {
                            inputLabel: { shrink: true }
                          }
                        }
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Box>
            {errors['due_date'] && (
              <Alert severity="error" sx={{ mt: 3 }}>{String(errors['due_date']?.message)}</Alert>
            )}

            <Box sx={{ mt: 3 }}>
              <Controller
                name="priority"
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                control={control}
                render={({ field }) => (
                  <SingleSelectTextField
                    data={_priority}
                    columns={[
                      { key: 'name', label: 'Độ ưu tiên' }
                    ]}
                    valueKey='id'
                    displayKey='name'
                    inputLabel='Độ ưu tiên *'
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors['priority']}
                  />
                )}
              />
            </Box>
            {errors['priority'] && (
              <Alert severity="error" sx={{ mt: 3 }}>{String(errors['priority']?.message)}</Alert>
            )}
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #e5e7eb' }}>
              <Typography variant="h5" gutterBottom>
                {todo.title}
              </Typography>

              <Typography variant="body1" gutterBottom whiteSpace="pre-wrap">
                {todo.description || 'Không có mô tả'}
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Độ ưu tiên:
                  </Typography>
                  <Label color={getColorByPriority(todo.priority_text)}>{todo.priority_text}</Label>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Trạng thái:
                  </Typography>
                  <Label color={todo.status == '2' ? 'success' : 'error'}>
                    {todo.status == '2' ? 'Hoàn thành' : 'Chưa hoàn thành'}
                  </Label>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon='solar:calendar-bold' />
                  <Typography variant="body2" color="text.secondary">
                    Ngày hết hạn:
                  </Typography>
                  <Label color='default'>{fDate(todo.due_date)}</Label>
                </Box>
              </Box>
            </Box>

            <Box>
              <MessageSection
                todoId={todo.id}
                messages={todo.comments}
              />
            </Box>
          </>
        )}
      </DialogContent>

      {isEditing && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setIsEditing(false)} color="inherit">
            Hủy
          </Button>
          <Button
            loading={isLoadingButton}
            loadingPosition='start'
            variant="contained"
            color="primary"
            type='submit'
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default TodoDetails
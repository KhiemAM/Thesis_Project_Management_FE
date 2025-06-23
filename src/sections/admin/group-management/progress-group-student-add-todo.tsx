import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import {
  Box,
  Alert
} from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import progressApi from 'src/axios/progress'

import { SingleSelectTextField } from 'src/components/select/single-select-text-field'

import type { Group } from './types'

const _priority = [
  { id: 1, name: 'Thấp' },
  { id: 2, name: 'Trung bình' },
  { id: 3, name: 'Cao' }
]

interface AddTodoProps {
  group: Group | null;
  open: boolean;
  onClose: () => void;
  onRefresh?: () => void;
}

interface IFormInputCreateTodo {
  title: string;
  description: string;
  due_date: string;
  priority: string;
}


const AddTodo: React.FC<AddTodoProps> = ({ group, open, onClose, onRefresh }) => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<IFormInputCreateTodo>()
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  const submitCreateTodo = async (data: IFormInputCreateTodo) => {
    try {
      setIsLoadingButton(true)
      const payload = {
        title: data.title,
        description: data.description,
        due_date: dayjs(data.due_date).format('YYYY-MM-DDTHH:mm:ss'),
        status: 1,
        priority: data.priority
      }
      if (group?.thesis_id) {
        await progressApi.createTaskProgress(group.thesis_id, payload)
        toast.success('Tạo công việc thành công!')
        handleCancel()
        onRefresh?.()
        reset()
      } else {
        toast.error('Không tìm thấy đề tài liên kết với nhóm này!')
      }
    } finally {
      setIsLoadingButton(false)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            handleSubmit(submitCreateTodo)()
          }
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>Tạo công việc mới</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Tiêu đề *"
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
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleCancel}
          color="inherit"
          sx={{ mr: 1 }}
        >
          Hủy
        </Button>
        <Button
          loading={isLoadingButton}
          loadingPosition='start'
          type='submit'
          variant="contained"
        >
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddTodo
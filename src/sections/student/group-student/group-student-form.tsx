import type { SubmitHandler } from 'react-hook-form'

import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Box,
  Alert,
  Button,
  TextField
} from '@mui/material'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import { Iconify } from 'src/components/iconify'

import type { Group, Student } from './type'

interface GroupStudentFormProps {
   students: Student[]
   onCreateGroup: (group: Group) => void;
   labelButton: string
}

interface IFormInput {
  name: string
  description?: string
}

const GroupStudentForm = ({ students, onCreateGroup, labelButton } : GroupStudentFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    onCreateGroup({
      id: '1',
      ...data,
      members: students,
      coverImage: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGdyb3VwJTIwc3R1ZGVudHxlbnwwfHx8fDE2OTI5NzYxNTg&ixlib=rb-4.0.3&q=80&w=1080'
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Tên nhóm *"
          error={!!errors['name']}
          sx={{ mb: 3 }}
          {...register('name', {
            required: FIELD_REQUIRED_MESSAGE
          })}
        />
        {errors['name'] && (
          <Alert severity="error" sx={{ mb: 3 }}>{String(errors['name']?.message)}</Alert>
        )
        }

        <TextField
          fullWidth
          label="Mô tả nhóm"
          sx={{ mb: 3 }}
          {...register('description', {})}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3 }}>
        <Button
          variant="contained"
          type='submit'
          color="primary"
          size="large"
          startIcon={<Iconify icon='solar:check-circle-bold' />}
        >
          {labelButton}
        </Button>
      </Box>
    </form>
  )
}

export default GroupStudentForm
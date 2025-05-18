import type { SubmitHandler } from 'react-hook-form'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

import {
  Box,
  Alert,
  Button,
  TextField
} from '@mui/material'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import groupApi from 'src/axios/group'

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
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    try {
      setLoading(true)
      await groupApi.createGroup(data)
      toast.success('Tạo nhóm thành công')
    }
    finally {
      setLoading(false)
    }
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
          loading={loading}
          loadingPosition='start'
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
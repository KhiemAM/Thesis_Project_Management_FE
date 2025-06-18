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
   onCreateGroup: (data: { new_name: string }) => void;
   labelButton: string;
}

interface IFormInput {
  new_name: string
  // description?: string
}

const GroupStudentForm = ({ students, onCreateGroup, labelButton } : GroupStudentFormProps) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    onCreateGroup(data)
  }

  const isOverLimit = students.length > 3

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Tên nhóm *"
          error={!!errors['new_name']}
          sx={{ mb: 3 }}
          {...register('new_name', {
            required: FIELD_REQUIRED_MESSAGE
          })}
        />
        {errors['new_name'] && (
          <Alert severity="error" sx={{ mb: 3 }}>{String(errors['new_name']?.message)}</Alert>
        )
        }
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 3 }}>
        <Button
          disabled={isOverLimit}
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
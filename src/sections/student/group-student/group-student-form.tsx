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

interface GroupFormProps {
  name: string;
  description: string;
  maxMembers: number;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onMaxMembersChange: (value: number) => void;
  disabled?: boolean;
}

const GroupStudentForm: React.FC<GroupFormProps> = ({
  name,
  description,
  maxMembers,
  onNameChange,
  onDescriptionChange,
  onMaxMembersChange,
  disabled = false
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <form onSubmit={handleSubmit(() => {})}>
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
            Tạo nhóm
        </Button>
      </Box>
    </form>
  )
}

export default GroupStudentForm
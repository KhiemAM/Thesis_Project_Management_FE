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

import type { Group } from './types'

interface GroupStudentFormProps {
  group: Group
  labelButton: string
  refresh?: () => void
}

interface IFormInput {
  new_name: string
  // description?: string
}

const GroupStudentForm = ({ group, labelButton, refresh } : GroupStudentFormProps) => {
  const [loadingButton, setLoadingButton] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = async(data) => {
    try {
      setLoadingButton(true)
      await groupApi.updateNameGroup(group.id, data)
      toast.success('Cập nhật nhóm thành công')
      refresh?.()
    }
    finally {
      setLoadingButton(false)
      reset()
    }
  }

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
          loading={loadingButton}
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
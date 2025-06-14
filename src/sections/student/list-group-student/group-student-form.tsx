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

import type { Group, Student } from './types'

interface GroupStudentFormProps {
   students: Student[]
   onCreateGroup: (group: Group) => void;
   labelButton: string
}

interface IFormInput {
  name: string
  // description?: string
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
    // onCreateGroup(
    //   {
    //     id: '1',
    //     name: data.name,
    //     description: data.description,
    //     members: [
    //       {
    //         id: '1',
    //         username: '2001210783',
    //         displayName: 'Huỳnh Quang Khiêm',
    //         profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    //         type: 'inviter'
    //       },
    //       {
    //         id: '2',
    //         username: '2001210783',
    //         displayName: 'Hà Trang',
    //         profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    //         type: 'inviter'
    //       },
    //       {
    //         id: '3',
    //         username: '2001210783',
    //         displayName: 'Hà Trang',
    //         profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    //         type: 'inviter'
    //       }
    //     ]
    //   }
    // )
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
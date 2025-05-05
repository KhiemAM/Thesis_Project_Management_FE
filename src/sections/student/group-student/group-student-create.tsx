import React, { useState } from 'react'

import {
  Box,
  Grid,
  Alert,
  useTheme,
  Typography
} from '@mui/material'

import { Iconify } from 'src/components/iconify'

import { userSuggestions } from './data'
import GroupStudentForm from './group-student-form'
import GroupStudentListAccept from './group-student-list-accept'

import type { Group, Student } from './type'

interface GroupStudentCreateProps {
  onCreateGroup: (group: Group) => void;
}

const GroupStudentCreate = ({ onCreateGroup } : GroupStudentCreateProps) => {
  const theme = useTheme()
  const [students, setStudents] = useState<Student[]>(userSuggestions)

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id))
  }

  const isOverLimit = students.length > 3

  return (
    <Grid
      container
      spacing={3}
      sx={{
        overflow: 'hidden'
      }}>
      {/* Left Column: Student List */}
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          borderRadius: 2,
          boxSizing: 'border-box',
          border: '2px solid transparent',
          '&:hover': {
            border: `2px solid ${theme.vars.palette.primary.main}`
          }
        }}
      >
        <Box
          sx={{
            py: 2,
            px: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderBottom: `2px solid ${theme.vars.palette.divider}`
          }}
        >
          <Iconify icon='solar:users-group-rounded-bold' />
          <Typography variant="h6">
            Danh sách sinh viên chấp nhận
          </Typography>
        </Box>

        {isOverLimit && (
          <Alert
            severity="warning"
            sx={{
              mx: 2,
              mt: 2
            }}
          >
            Vui lòng xóa {students.length - 3} thành viên trước khi tạo nhóm.
          </Alert>
        )}

        <GroupStudentListAccept
          students={students}
          maxMembers={3}
          onRemoveStudent={handleRemoveStudent}
        />
      </Grid>

      {/* Right Column: Group Form */}
      <Grid
        size={{ xs: 12, md: 7 }}
        sx={{
          borderRadius: 2,
          boxSizing: 'border-box',
          border: '2px solid transparent',
          '&:hover': {
            border: `2px solid ${theme.vars.palette.primary.main}`
          }
        }}
      >
        <Box
          sx={{
            py: 2,
            px: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderBottom: `2px solid ${theme.vars.palette.divider}`
          }}
        >
          <Iconify icon='solar:users-group-rounded-bold' />
          <Typography variant="h6">
            Tạo nhóm
          </Typography>
        </Box>

        <GroupStudentForm
          students={students}
          onCreateGroup={onCreateGroup}
          labelButton='Tạo nhóm'
        />
      </Grid>
    </Grid>
  )
}

export default GroupStudentCreate
import React, { useState } from 'react'

import {
  Box,
  Grid,
  Card,
  Alert,
  Button,
  useTheme,
  Typography,
  CardContent
} from '@mui/material'

import { Iconify } from 'src/components/iconify'

import { userSuggestions } from './data'
import GroupStudentForm from './group-student-form'
import GroupStudentListAccept from './group-student-list-accept'

interface Student {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  type: string;
}

interface CreateGroupProps {
  onCreateGroup: (group: {
    name: string;
    description: string;
    maxMembers: number;
    members: Student[];
  }) => void;
}

const GroupStudentCreate: React.FC<CreateGroupProps> = ({ onCreateGroup }) => {
  const theme = useTheme()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [maxMembers, setMaxMembers] = useState(3)
  const [students, setStudents] = useState<Student[]>(userSuggestions)

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id))
  }

  const handleCreateGroup = () => {
    if (name.trim() === '') return

    onCreateGroup({
      name,
      description,
      maxMembers,
      members: students
    })
  }

  const isValid = name.trim() !== '' && students.length <= maxMembers
  const isOverLimit = students.length > maxMembers

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
              mt: 2,
              borderRadius: 2
            }}
          >
            Please remove {students.length - maxMembers} student(s) to meet the maximum limit.
          </Alert>
        )}

        <GroupStudentListAccept
          students={students}
          maxMembers={maxMembers}
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
          name={name}
          description={description}
          maxMembers={maxMembers}
          onNameChange={setName}
          onDescriptionChange={setDescription}
          onMaxMembersChange={setMaxMembers}
        />
      </Grid>
    </Grid>
  )
}

export default GroupStudentCreate
import React, { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import { Tooltip, useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'

import userApi from 'src/axios/user'

import { Iconify } from 'src/components/iconify'

import type { Student } from './types'

interface StudentListProps {
  students: Student[];
  maxMembers: number;
  onOpenInformation?: () => void;
  setInformationStudent: (student: any) => void;
  handleTransferLeader: (studentId: string) => void;
}

const GroupStudentListAccept: React.FC<StudentListProps> = ({
  students,
  maxMembers,
  onOpenInformation,
  setInformationStudent,
  handleTransferLeader
}) => {
  const theme = useTheme()
  const isOverLimit = students.length > maxMembers
  const [loading, setLoading] = useState(false)

  const fetchInformationStudent = useCallback(async(userId: string) => {
    try {
      setLoading(true)
      const res = await userApi.getUserFullProfile(userId)
      setInformationStudent(res.data)
    } finally {
      setLoading(false)
    }
  }, [setInformationStudent])

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h3">
          Sinh viên ({students.length}/{maxMembers})
        </Typography>
        {isOverLimit && (
          <Fade in>
            <Chip
              label={`Vui lòng xóa ${students.length - maxMembers} sinh viên`}
              color="error"
              size="small"
              sx={{ animation: 'pulse 2s infinite' }}
            />
          </Fade>
        )}
      </Box>

      {students.length > 0 ? (
        <Paper
          elevation={0}
        >
          <List disablePadding>
            {students.map((student) => (
              <ListItem
                key={student.user_id}
                sx={{
                  py: 2,
                  my: 2,
                  borderRadius: 2,
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: theme.vars.palette.action.selected
                  }
                }}
                onClick={() => { onOpenInformation?.(); fetchInformationStudent(student.user_id) }}
              >
                <Avatar
                  src='/assets/images/avatar/avatar-1.webp'
                  alt={student.full_name}
                  sx={{
                    width: 48,
                    height: 48,
                    marginRight: 2,
                    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant='h6'>{student.full_name}</Typography>
                      {student.is_leader && <Iconify color='gold' icon="solar:crown-star-bold" /> }
                    </Box>
                  }
                  secondary={student.student_code}
                  slotProps={{ primary: { sx: { fontWeight: 'bold' } } }}
                />
                <Tooltip title="Xem thông tin sinh viên" arrow>
                  <IconButton loading={loading} color='primary'>
                    <Iconify icon="solar:eye-bold" />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 1 }}>
          Hiện tại không có sinh viên nào chấp nhận lời mời.
        </Typography>
      )}
    </Box>
  )
}

export default GroupStudentListAccept

import React from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemText from '@mui/material/ListItemText'

import { Iconify } from 'src/components/iconify'

import type { Student } from './types'

interface StudentListProps {
  students: Student[];
  maxMembers: number;
  onRemoveStudent: (id: string) => void;
  onOpenInformation?: () => void;
}

const GroupStudentListAccept: React.FC<StudentListProps> = ({
  students,
  maxMembers,
  onRemoveStudent,
  onOpenInformation
}) => {
  const theme = useTheme()
  const isOverLimit = students.length > maxMembers

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
                onClick={onOpenInformation}
              >
                <Avatar
                  src={student.avatarUrl}
                  alt={student.full_name}
                  sx={{
                    width: 48,
                    height: 48,
                    marginRight: 2,
                    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <ListItemText
                  primary={student.full_name}
                  secondary={student.student_code}
                  slotProps={{ primary: { sx: { fontWeight: 'bold' } } }}
                />
                <IconButton
                  edge="end"
                  onClick={(event) => {
                    event.stopPropagation()
                    onRemoveStudent(student.user_id)
                  }}
                  size="small"
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.50',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
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

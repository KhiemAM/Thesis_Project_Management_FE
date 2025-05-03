import React from 'react'

import {
  Box,
  List,
  Chip,
  Fade,
  Paper,
  Avatar,
  ListItem,
  useTheme,
  IconButton,
  Typography,
  ListItemText
} from '@mui/material'

import { Iconify } from 'src/components/iconify'

interface Student {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  type: string;
}

interface StudentListProps {
  students: Student[];
  maxMembers: number;
  onRemoveStudent: (id: string) => void;
}

const GroupStudentListAccept: React.FC<StudentListProps> = ({
  students,
  maxMembers,
  onRemoveStudent
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
                key={student.id}
                sx={{
                  py: 2,
                  my: 2,
                  borderRadius: 2,
                  '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: theme.vars.palette.action.selected
                  }
                }}
              >
                <Avatar
                  src={student.profileImage}
                  alt={student.displayName}
                  sx={{
                    width: 48,
                    height: 48,
                    marginRight: 2,
                    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                <ListItemText
                  primary={student.username}
                  secondary={student.displayName}
                  slotProps={{ primary: { sx: { fontWeight: 'bold' } } }}
                />
                <IconButton
                  edge="end"
                  onClick={() => onRemoveStudent(student.id)}
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

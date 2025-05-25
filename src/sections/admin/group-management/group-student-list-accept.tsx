import React from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import type { Student } from './types'

interface StudentListProps {
  students: Student[];
  onOpenInformation: () => void;
}

const GroupStudentListAccept: React.FC<StudentListProps> = ({
  students,
  onOpenInformation
}) => {
  const theme = useTheme()

  return (
    <Box sx={{ p: 3 }}>
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
              onClick={onOpenInformation}
            >
              <Avatar
                src={student.profileImage}
                alt={student.displayName}
                sx={{
                  width: 48,
                  height: 48,
                  marginRight: 2
                }}
              />
              <ListItemText
                primary={student.username}
                secondary={student.displayName}
                slotProps={{ primary: { sx: { fontWeight: 'bold' } } }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  )
}

export default GroupStudentListAccept

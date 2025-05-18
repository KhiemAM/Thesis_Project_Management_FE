import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Badge from '@mui/material/Badge'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import { Iconify } from 'src/components/iconify'
import { Main, Drawer } from 'src/components/drawer'

import ProfileStudentSidebarInfo from 'src/sections/student/profile-student/profile-student-sidebar-info'

import { userSuggestions } from './data'
import GroupStudentForm from './group-student-form'
import GroupStudentListAccept from './group-student-list-accept'

import type { Group, Student } from './type'

interface GroupStudentCreateProps {
  onCreateGroup: (group: Group) => void;
}
const drawerWidth = 360

const GroupStudentCreate = ({ onCreateGroup } : GroupStudentCreateProps) => {
  const theme = useTheme()
  const [openInformation, setOpenInformation] = useState(false)
  const [students, setStudents] = useState<Student[]>(userSuggestions)

  const canReset = ''

  const onOpenInformation = useCallback(() => {
    setOpenInformation(true)
  }, [])

  const onCloseInformation = useCallback(() => {
    setOpenInformation(false)
  }, [])

  const handleRemoveStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id))
  }

  const isOverLimit = students.length > 3

  return (
    <>
      {/* <Main open={openInformation} drawerWidth={drawerWidth}> */}
        <Grid
          container
          spacing={3}
          sx={{
            overflow: 'hidden'
          }}>
          {/* Left Column: Student List */}
          <Grid
            size={{ sm: 12, md: 5 }}
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
              onOpenInformation={onOpenInformation}
            />
          </Grid>

          {/* Right Column: Group Form */}
          <Grid
            size={{ sm: 12, md: 7 }}
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
      {/* </Main> */}
      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth
          }
        }}
        variant="persistent"
        anchor="right"
        open={openInformation}
      >
        <Box
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1.5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Thông tin sinh viên
          </Typography>

          <IconButton onClick={() => {}}>
            <Badge color="error" variant="dot" invisible={!canReset}>
              <Iconify icon="solar:restart-bold" />
            </Badge>
          </IconButton>

          <IconButton onClick={onCloseInformation}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />
        <ProfileStudentSidebarInfo isDrawer/>
      </Drawer> */}
    </>
  )
}

export default GroupStudentCreate
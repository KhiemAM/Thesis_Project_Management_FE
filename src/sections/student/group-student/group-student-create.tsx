import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import { useTheme } from '@mui/material'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import groupApi from 'src/axios/group'
import { useLoading } from 'src/context'

import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'
import { AlertConfirmCallAPI } from 'src/components/sweetalert2'

import ProfileStudentSidebarInfo from 'src/sections/student/profile-student/profile-student-sidebar-info'

import GroupStudentForm from './group-student-form'
import GroupStudentListAccept from './group-student-list-accept'

import type { Group, Student } from './type'

interface GroupStudentCreateProps {
  group: Group | null;
  onCreateGroup: (data: { new_name: string }) => void;
  onRefresh?: () => void; // Optional prop for refreshing the table
  members: Student[]; // Optional prop for initial members
}

const GroupStudentCreate = ({ group, onCreateGroup, onRefresh, members } : GroupStudentCreateProps) => {
  const { setIsLoading } = useLoading()
  const theme = useTheme()
  const [openInformation, setOpenInformation] = useState(false)
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    if (group) {
      setStudents(group.members)
    }
  }, [group])

  const onOpenInformation = useCallback(() => {
    setOpenInformation(true)
  }, [])

  const onCloseInformation = useCallback(() => {
    setOpenInformation(false)
  }, [])

  const handleRemoveStudent = useCallback(async(studentId: string) => {
    AlertConfirmCallAPI({
      title: 'Bạn có chắc chắn',
      text: 'Bạn có muốn xóa không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Hủy',
      api: async() => {
        if (!group) return
        try {
          setIsLoading(true)
          await groupApi.removeMember(group.id, studentId)
          onRefresh?.()
          toast.success('Đã xóa thành viên khỏi nhóm')
        } finally {
          setIsLoading(false)
        }
      }
    })
  }, [setIsLoading, group, onRefresh])

  const isOverLimit = students.length > 3

  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{
          overflow: 'hidden'
        }}>
        {/* Left Column: Student List */}
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
            students={students.length > 0 ? students : members}
            maxMembers={3}
            onRemoveStudent={handleRemoveStudent}
            onOpenInformation={onOpenInformation}
          />
        </Grid>

        {/* Right Column: Group Form */}
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
      <Drawer
        anchor="right"
        open={openInformation}
        onClose={onCloseInformation}
        slotProps={{
          paper: {
            sx: { width: { xs: 360, sm: 460 }, overflow: 'hidden' }
          }
        }}
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

          <IconButton onClick={onCloseInformation}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />
        <ProfileStudentSidebarInfo
          isDrawer
          initialValues={{
            user_id: 'ed629b03-aa01-4c7e-ba5d-86b4de5735c8',
            information: {
              id: '0705aad0-5e65-4850-997a-687b0beceb39',
              user_id: 'ed629b03-aa01-4c7e-ba5d-86b4de5735c8',
              first_name: 'Khiêm',
              last_name: 'Huỳnh Quang',
              date_of_birth: '2000-04-15',
              gender: '1',
              address: 'Tân An, Long An',
              tel_phone: '0356576557'
            },
            student_info: {
              student_code: '2001210783',
              class_name: '12DHTH05',
              major_id: '4c5ccb13-e1da-48de-a067-a7fdd547040c',
              major_name: 'Công nghệ thông tin',
              id: '0e8fc47e-2e22-46c7-a36d-234567891234',
              user_id: 'ed629b03-aa01-4c7e-ba5d-86b4de5735c8',
              create_datetime: '2024-08-01T10:30:00',
              update_datetime: '2025-06-06T15:45:00'
            }
          }}
        />
      </Drawer>
    </>
  )
}

export default GroupStudentCreate
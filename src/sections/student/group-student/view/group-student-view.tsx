import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import userApi from 'src/axios/user'
import groupApi from 'src/axios/group'
import { useLoading } from 'src/context'
import { useAppSelector } from 'src/redux/hook'
import { DashboardContent } from 'src/layouts/student'
import { selectCurrentUser } from 'src/redux/user/user-slice'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import GroupStudentCreate from '../group-student-create'

import type { Group, Student } from '../type'
// ----------------------------------------------------------------------
interface DecodedToken {
  uuid: string;
  name: string;
  type: number; // 2 = student, 3 = admin (tuỳ theo hệ thống của bạn)
  functions: string[]; // danh sách đường dẫn chức năng được phép truy cập
  exp: number; // thời gian hết hạn token (UNIX timestamp)
}

export function GroupStudentView() {
  const currentUser = useAppSelector(selectCurrentUser)
  const userInfo = currentUser ? jwtDecode<DecodedToken>(currentUser.access_token) : null
  const { setIsLoading } = useLoading()
  const [group, setGroup] = useState<Group | null>(null)
  const [members, setMembers] = useState<Student[]>([])

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await groupApi.getGroups()
      const data = res.data.find((item: Group) => item.name === null)
      if (!data) {
        const resUser = await userApi.getUserFullProfile(userInfo?.uuid || '')
        setMembers([{
          user_id: resUser.data.user_id,
          full_name: `${resUser.data.information.last_name} ${resUser.data.information.first_name}`,
          student_code: resUser.data.student_info.student_code,
          is_leader: true
        }])
      }
      setGroup(data)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, userInfo?.uuid])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const handleCreateGroup = useCallback(async (data: { new_name: string }) => {
    try {
      setIsLoading(true)
      if (!group?.id) {
        await groupApi.createGroup({ name: data.new_name })
      } else {
        await groupApi.updateNameGroup(group.id, data)
      }
      toast.success('Tạo nhóm thành công')
      fetchProfile()
    }
    finally {
      setIsLoading(false)
    }
  }, [group?.id, setIsLoading, fetchProfile])

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Thông tin nhóm
        </Typography>
        <IconButton
          // color={openSetting ? 'primary' : 'default'}
          // onClick={onOpenSetting}
          // sx={sx}
          // {...other}
        >
          <Iconify width={24} icon="solar:menu-dots-circle-bold" />
        </IconButton>

      </Box>

      <Card>
        <Scrollbar>
          <Box>
            <GroupStudentCreate
              group={group}
              onCreateGroup={handleCreateGroup}
              onRefresh={fetchProfile}
              members={members}
            />
          </Box>
        </Scrollbar>
      </Card>


    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

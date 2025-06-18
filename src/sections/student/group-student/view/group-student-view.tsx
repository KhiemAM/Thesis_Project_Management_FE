import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import groupApi from 'src/axios/group'
import { useLoading } from 'src/context'
import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import GroupStudentCreate from '../group-student-create'

import type { Group } from '../type'
// ----------------------------------------------------------------------

export function GroupStudentView() {
  const { setIsLoading } = useLoading()
  const [group, setGroup] = useState<Group | null>(null)

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await groupApi.getGroups()
      const data = res.data.find((item: Group) => item.name === null)
      setGroup(data)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const handleCreateGroup = useCallback(async (data: { new_name: string }) => {
    if (!group?.id) {
      toast.error('Không tìm thấy thông tin nhóm')
      return
    }
    try {
      setIsLoading(true)
      await groupApi.updateNameGroup(group.id, data)
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
            />
          </Box>
        </Scrollbar>
      </Card>


    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

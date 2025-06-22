import type { ProfileProps } from 'src/sections/student/search-student/user-table-row'

import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { RouterLink } from 'src/routes/components'

import groupApi from 'src/axios/group'
import { useLoading } from 'src/context'
import thesesApi from 'src/axios/theses'
import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import { Main, Drawer } from 'src/components/drawer'
import { Scrollbar } from 'src/components/scrollbar'
import { AlertConfirmCallAPI } from 'src/components/sweetalert2'

import ProfileStudentSidebarInfo from 'src/sections/student/profile-student/profile-student-sidebar-info'

import GroupStudentManagement from '../group-student-management'

import type { Group } from '../types'
import type { ApproveTopicProps } from '../group-student-thesis-information'
// ----------------------------------------------------------------------
const drawerWidth = 360

export function InformationGroupStudentView() {
  const { id } = useParams()
  const { setIsLoading } = useLoading()
  const [openInformation, setOpenInformation] = useState(false)
  const [group, setGroup] = useState<Group | null>(null)
  const [informationStudent, setInformationStudent] = useState<ProfileProps | null>(null)
  const [thesis, setThesis] = useState<ApproveTopicProps | null>(null)

  const fetchGroupInformation = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await groupApi.getGroupById(id as string)
      setGroup(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, id])

  const fetchThesisInformation = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await thesesApi.getTheseById(group?.thesis_id as string)
      setThesis(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, group?.thesis_id])

  useEffect(() => {
    fetchGroupInformation()
  }, [fetchGroupInformation])

  useEffect(() => {
    if (group?.thesis_id) {
      fetchThesisInformation()
    }
  }, [fetchThesisInformation, group?.thesis_id])

  const onOpenInformation = useCallback(() => {
    setOpenInformation(true)
  }, [])

  const onCloseInformation = useCallback(() => {
    setOpenInformation(false)
  }, [])

  const handleDeleteGroup = useCallback(() => {
    AlertConfirmCallAPI({
      title: 'Bạn có chắc chắn',
      text: 'Bạn có muốn xóa nhóm không?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Oke, xóa nhóm',
      cancelButtonText:'Không',
      api: async() => {
        try {
          setIsLoading(true)
          await groupApi.deleteGroup(id as string)
          toast.success('Xóa nhóm thành công')
          fetchGroupInformation()
        } finally {
          setIsLoading(false)
        }
      }
    })
  }, [fetchGroupInformation, id, setIsLoading])

  const handleTransferLeader = useCallback(async (studentId: string) => {
    AlertConfirmCallAPI({
      title: 'Bạn có chắc chắn',
      text: 'Bạn có muốn chuyển nhóm trưởng không?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Oke, chuyển nhóm trưởng',
      cancelButtonText:'Không',
      api: async() => {
        try {
          setIsLoading(true)
          await groupApi.transferLeader(id as string, studentId)
          toast.success('Chuyển nhóm trưởng thành công')
          fetchGroupInformation()
        } finally {
          setIsLoading(false)
        }
      }
    })
  }, [setIsLoading, id, fetchGroupInformation])

  return (
    <DashboardContent>
      <Box
        component={RouterLink}
        href='/group/list'
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          color: 'text.primary',
          textDecoration: 'none'
        }}
        gap={1}
      >
        <Iconify icon='solar:alt-arrow-left-line-duotone'/>
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

      <Main open={openInformation} drawerWidth={drawerWidth}>
        <Card>
          <Scrollbar>
            <Box>
              {group && (
                <GroupStudentManagement
                  group={group}
                  onOpenInformation={onOpenInformation}
                  onDeleteGroup={handleDeleteGroup}
                  refresh={fetchGroupInformation}
                  setInformationStudent={setInformationStudent}
                  handleTransferLeader={handleTransferLeader}
                  thesis={thesis}
                />
              )}
            </Box>
          </Scrollbar>
        </Card>
      </Main>
      <Drawer
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

          <IconButton onClick={onCloseInformation}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />
        <ProfileStudentSidebarInfo
          isDrawer
          initialValues={informationStudent}
        />
      </Drawer>

    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

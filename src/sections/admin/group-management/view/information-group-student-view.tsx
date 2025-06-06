

import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { RouterLink } from 'src/routes/components'

import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import { Main, Drawer } from 'src/components/drawer'
import { Scrollbar } from 'src/components/scrollbar'

import ProfileStudentSidebarInfo from 'src/sections/student/profile-student/profile-student-sidebar-info'

import { groupData } from '../data'
import GroupStudentManagement from '../group-student-management'
// ----------------------------------------------------------------------
const drawerWidth = 360

export function InformationGroupStudentView() {
  const [openInformation, setOpenInformation] = useState(false)
  const onOpenInformation = useCallback(() => {
    setOpenInformation(true)
  }, [])

  const onCloseInformation = useCallback(() => {
    setOpenInformation(false)
  }, [])

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
              <GroupStudentManagement
                group={groupData}
                onOpenInformation={onOpenInformation}
              />
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
        {/* <ProfileStudentSidebarInfo isDrawer/> */}
      </Drawer>

    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Badge from '@mui/material/Badge'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import { Main, Drawer } from 'src/components/drawer'
import { Scrollbar } from 'src/components/scrollbar'

import ProfileStudentSidebarInfo from 'src/sections/student/profile-student/profile-student-sidebar-info'

import { userSuggestions } from '../data'
import UserProfileCard from '../invite-student-card'
import { InviteStudentToolbar } from '../invite-student-toolbar'
// ----------------------------------------------------------------------

const drawerWidth = 360

export function InviteStudentView() {
  const [filterName, setFilterName] = useState('')
  const [profile, setProfile] = useState(null)
  const [openInformation, setOpenInformation] = useState(false)
  const canReset = ''

  const onOpenInformation = useCallback(() => {
    setOpenInformation(true)
  }, [])

  const onCloseInformation = useCallback(() => {
    setOpenInformation(false)
  }, [])

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
          Lời mời nhóm
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
          <InviteStudentToolbar
            numSelected={0}
            filterName={filterName}
            onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFilterName(event.target.value)
            }}
          />

          <Scrollbar>
            <Typography variant="h5" sx={{ ml: 3 }}>
              Danh sách lời mời
            </Typography>
            <Box sx={{ p: 3 }} >
              {userSuggestions.map((user) => (
                <UserProfileCard key={user.id} user={user} onOpenInformation={onOpenInformation}/>
              ))}
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
      </Drawer>
    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Badge from '@mui/material/Badge'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/student'

import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import ProfileStudentSidebarInfo from 'src/sections/student/profile-student/profile-student-sidebar-info'

import { userSuggestions } from '../data'
import UserProfileCard from '../invite-student-card'
import { InviteStudentToolbar } from '../invite-student-toolbar'
// ----------------------------------------------------------------------

const drawerWidth = 360

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: 'relative',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: drawerWidth
      }
    }
  ]
}))

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
      <Main open={openInformation}>
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

import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import { userSuggestions } from '../data'
import UserProfileCard from '../invite-student-card'
import { InviteStudentToolbar } from '../invite-student-toolbar'
// ----------------------------------------------------------------------

export function InviteStudentView() {
  const [filterName, setFilterName] = useState('')

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

      <Card>
        <InviteStudentToolbar
          numSelected={0}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value)
          }}
        />

        <Scrollbar>
          <Typography variant="h5">
            Danh sách lời mời
          </Typography>
          {userSuggestions.map((user) => (
            <UserProfileCard key={user.id} user={user} />
          ))}
        </Scrollbar>
      </Card>
    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

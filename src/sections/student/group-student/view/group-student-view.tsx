
import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import GroupStudentCreate from '../group-student-create'


// ----------------------------------------------------------------------

interface Student {
  id: string;
  username: string;
  displayName: string;
  profileImage: string;
  type: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  maxMembers: number;
  members: Student[];
  coverImage?: string;
}

export function GroupStudentView() {
  const [group, setGroup] = useState<Group>()

  const handleCreateGroup = (newGroup: {
    name: string;
    description: string;
    maxMembers: number;
    members: Student[];
  }) => {
    const groupValue = {
      id: '1',
      ...newGroup
    }
    setGroup(groupValue)
  }

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
            <GroupStudentCreate onCreateGroup={handleCreateGroup}/>
          </Box>
        </Scrollbar>
      </Card>
    </DashboardContent>
  )
}

// ----------------------------------------------------------------------


import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import GroupStudentCreate from '../group-student-create'
import GroupStudentManagement from '../group-student-management'

import type { Group } from '../type'
// ----------------------------------------------------------------------

export function GroupStudentView() {
  const [group, setGroup] = useState<Group | null>(
    null
  )

  const handleCreateGroup = (newGroup : Group) => {
    setGroup(newGroup)
  }

  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroup(updatedGroup)
  }

  const handleDeleteGroup = () => {
    setGroup(null)
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
            {group ? (
              <GroupStudentManagement
                group={group}
                onUpdateGroup={handleUpdateGroup}
                onDeleteGroup={handleDeleteGroup}
              />
            ) : (
              <GroupStudentCreate
                onCreateGroup={handleCreateGroup}
              />
            )}
          </Box>
        </Scrollbar>
      </Card>


    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

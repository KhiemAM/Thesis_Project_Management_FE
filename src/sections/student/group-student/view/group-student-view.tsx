
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
    // {
    //   id: '1',
    //   name: 'Nhóm Aitilon',
    //   description: 'Nhóm học tập Aitilon',
    //   members: [
    //     {
    //       id: '1',
    //       username: '2001210783',
    //       displayName: 'Huỳnh Quang Khiêm',
    //       profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    //       type: 'inviter'
    //     },
    //     {
    //       id: '2',
    //       username: '2001210783',
    //       displayName: 'Hà Trang',
    //       profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    //       type: 'inviter'
    //     },
    //     {
    //       id: '3',
    //       username: '2001210783',
    //       displayName: 'Hà Trang',
    //       profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    //       type: 'inviter'
    //     }
    //   ]
    // }
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

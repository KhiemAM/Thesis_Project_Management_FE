import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { Iconify } from 'src/components/iconify'
import { AlertConfirmNavigate } from 'src/components/sweetalert2'

import GroupStudentForm from './group-student-form'
import GroupStudentHeader from './group-student-header'
import GroupStudentListAccept from './group-student-list-accept'

import type { Group } from './types'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`group-tabpanel-${index}`}
      aria-labelledby={`group-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

interface GroupStudentManagementProps {
  group: Group;
  onDeleteGroup: () => void;
  onOpenInformation?: () => void;
  refresh?: () => void;
  setInformationStudent: (student: any) => void;
  handleTransferLeader: (studentId: string) => void;
}

const GroupStudentManagement = ({
  group,
  onDeleteGroup,
  onOpenInformation,
  refresh,
  setInformationStudent,
  handleTransferLeader
}: GroupStudentManagementProps) => {
  const theme = useTheme()
  const [currentTab, setCurrentTab] = useState(0)

  const handleImageUpload = (file: File) => {}

  return (
    <Box>
      <GroupStudentHeader
        name={group.name}
        description={group.description}
        memberCount={group.members.length}
        maxMembers={3}
        coverImage={group.coverImage}
        onImageUpload={handleImageUpload}
      />

      <Paper elevation={0}>
        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              '&:hover': {
                bgcolor: theme.vars.palette.action.hover
              }
            }
          }}
        >
          <Tab
            icon={<Iconify icon="solar:home-angle-bold-duotone" />}
            label="Overview"
            iconPosition="start"
          />
          <Tab
            icon={<Iconify icon="solar:users-group-rounded-bold" />}
            label="Members"
            iconPosition="start"
          />
          <Tab
            icon={<Iconify icon="solar:settings-bold-duotone" />}
            label="Settings"
            iconPosition="start"
          />
        </Tabs>

        <Box sx={{ px: 3 }}>
          <TabPanel value={currentTab} index={0}>
            <GroupStudentForm
              group={group}
              labelButton='Cập nhật'
              refresh={refresh}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <GroupStudentListAccept
              students={group.members}
              maxMembers={3}
              onOpenInformation={onOpenInformation}
              setInformationStudent={setInformationStudent}
              handleTransferLeader={handleTransferLeader}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6">
                  Xóa nhóm
                </Typography>
                <Typography variant="body1">
                  Sau khi xóa nhóm, tất cả các thành viên sẽ bị xóa khỏi nhóm và không thể khôi phục lại.
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="error"
                size='large'
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={onDeleteGroup}
                sx={{ ml: 3, minWidth: 150 }}
              >
                Xóa nhóm
              </Button>
            </Box>
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  )
}

export default GroupStudentManagement

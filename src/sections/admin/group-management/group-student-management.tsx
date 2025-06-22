import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material'

import { Iconify } from 'src/components/iconify'

import GroupStudentHeader from './group-student-header'
import GroupStudentListAccept from './group-student-list-accept'
import GroupStudentThesisInformation from './group-student-thesis-information'

import type { Group } from './types'
import type { ApproveTopicProps } from './group-student-thesis-information'

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
  thesis: ApproveTopicProps | null;
}

const GroupStudentManagement = ({
  group,
  onDeleteGroup,
  onOpenInformation,
  refresh,
  setInformationStudent,
  handleTransferLeader,
  thesis
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
            icon={<Iconify icon="solar:users-group-rounded-bold" />}
            label="Thành viên"
            iconPosition="start"
          />
          <Tab
            icon={<Iconify icon="solar:document-medicine-bold" />}
            label="Đề tài đăng ký"
            iconPosition="start"
          />
        </Tabs>

        <Box sx={{ px: 3 }}>
          <TabPanel value={currentTab} index={0}>
            <GroupStudentListAccept
              students={group.members}
              maxMembers={3}
              onOpenInformation={onOpenInformation}
              setInformationStudent={setInformationStudent}
              handleTransferLeader={handleTransferLeader}
            />
          </TabPanel>

          <TabPanel value={currentTab} index={1}>
            <GroupStudentThesisInformation data={thesis}/>
          </TabPanel>

        </Box>
      </Paper>
    </Box>
  )
}

export default GroupStudentManagement

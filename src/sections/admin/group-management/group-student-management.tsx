import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

import GroupStudentHeader from './group-student-header'
import GroupStudentListAccept from './group-student-list-accept'

import type { Group } from './types'

interface GroupStudentManagementProps {
  group: Group;
  onOpenInformation: () => void;
}

const GroupStudentManagement = ({
  group,
  onOpenInformation
}: GroupStudentManagementProps) => (
  <Box>
    <GroupStudentHeader
      name={group.name}
      description={group.description}
      memberCount={group.members.length}
      maxMembers={3}
      coverImage={group.coverImage}
    />

    <Paper elevation={0}>
      <Box sx={{ px: 3 }}>
        <GroupStudentListAccept
          students={group.members}
          onOpenInformation={onOpenInformation}
        />
      </Box>
    </Paper>
  </Box>
)

export default GroupStudentManagement

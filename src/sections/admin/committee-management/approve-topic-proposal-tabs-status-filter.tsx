import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { Label } from 'src/components/label'

interface TopicTabsFilterProps {
  value: string
  setValue: (newValue: string) => void
}

export function ApproveTopicProposalTabsStatusFilter({ value, setValue }: TopicTabsFilterProps) {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', ml: 3 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        indicatorColor="primary"
        aria-label="topic department tabs"
      >
        <Tab value="Tất cả" label="Tất cả" icon={<Label color='default'>24</Label>} iconPosition='end'/>
        <Tab value="Đã duyệt" label="Đã duyệt" icon={<Label color='success'>4</Label>} iconPosition='end'/>
        <Tab value="Chờ duyệt" label="Chờ duyệt" icon={<Label color='warning'>9</Label>} iconPosition='end'/>
      </Tabs>
    </Box>
  )
}

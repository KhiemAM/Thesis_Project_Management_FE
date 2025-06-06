import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { getTopicStatusText } from 'src/constants/topic-status'

import { Label } from 'src/components/label'

import { getDataFilterByTabs } from './utils'

import type { TopicProps } from './topic-proposal-table-row'

interface TopicTabsFilterProps {
  data: TopicProps[]
  value: string
  setValue: (newValue: string) => void
}

export function ApproveFacultyTopicProposalTabsStatusFilter({ data, value, setValue }: TopicTabsFilterProps) {
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
        <Tab value="Tất cả" label="Tất cả" icon={<Label color='default'>{data.length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(2)} label={getTopicStatusText(2)} icon={<Label color='warning'>{getDataFilterByTabs(data, 'status', getTopicStatusText(2)).length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(3)} label={getTopicStatusText(3)} icon={<Label color='success'>{getDataFilterByTabs(data, 'status', getTopicStatusText(3)).length}</Label>} iconPosition='end'/>
      </Tabs>
    </Box>
  )
}

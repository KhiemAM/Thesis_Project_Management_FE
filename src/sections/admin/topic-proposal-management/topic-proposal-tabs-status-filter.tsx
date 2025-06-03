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

export function TopicProposalTabsStatusFilter({ data, value, setValue }: TopicTabsFilterProps) {
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
        variant="scrollable"
        scrollButtons={false}
      >
        <Tab value="Tất cả" label="Tất cả" icon={<Label color='default'>{data.length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(3)} label={getTopicStatusText(3)} icon={<Label color='warning'>{getDataFilterByTabs(data, 'status', getTopicStatusText(3)).length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(1)} label={getTopicStatusText(1)} icon={<Label color='info'>{getDataFilterByTabs(data, 'status', getTopicStatusText(1)).length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(0)} label={getTopicStatusText(0)} icon={<Label color='error'>{getDataFilterByTabs(data, 'status', getTopicStatusText(0)).length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(2)} label={getTopicStatusText(2)} icon={<Label color='primary'>{getDataFilterByTabs(data, 'status', getTopicStatusText(2)).length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(4)} label={getTopicStatusText(4)} icon={<Label color='success'>{getDataFilterByTabs(data, 'status', getTopicStatusText(4)).length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(5)} label={getTopicStatusText(5)} icon={<Label color='error'>{getDataFilterByTabs(data, 'status', getTopicStatusText(5)).length}</Label>} iconPosition='end'/>
      </Tabs>
    </Box>
  )
}

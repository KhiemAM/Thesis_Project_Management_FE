import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { getTopicStatusText } from 'src/constants/topic-status'

import { Label } from 'src/components/label'

import { getDataFilterByTabs } from './utils'

import type { ApproveTopicProps } from './announce-topic-table-row'

interface TopicTabsFilterProps {
  data: ApproveTopicProps[]
  value: string
  setValue: (newValue: string) => void
}

export function AnnounceTopicTabsStatusFilter({ data, value, setValue }: TopicTabsFilterProps) {
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
        <Tab value={getTopicStatusText(4)} label={getTopicStatusText(4)} icon={<Label color='error'>{getDataFilterByTabs(data, 'status', getTopicStatusText(4)).length}</Label>} iconPosition='end'/>
        <Tab value={getTopicStatusText(5)} label={getTopicStatusText(5)} icon={<Label color='success'>{getDataFilterByTabs(data, 'status', getTopicStatusText(5)).length}</Label>} iconPosition='end'/>
      </Tabs>
    </Box>
  )
}

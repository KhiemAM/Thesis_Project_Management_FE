import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { Label } from 'src/components/label'

import { getDataFilterByTabs } from './utils'

import type { TopicProps } from './topic-proposal-table-row'

interface TopicTabsFilterProps {
  data: TopicProps[]
  value: string
  setValue: (newValue: string) => void
}

export function TopicTabsFilter({ data, value, setValue }: TopicTabsFilterProps) {
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
        <Tab value="Khóa luận" label="Khóa luận" icon={<Label color='primary'>{getDataFilterByTabs(data, 'name_thesis_type', 'Khóa luận').length}</Label>} iconPosition='end'/>
        <Tab value="Đồ án" label="Đồ án" icon={<Label color='secondary'>{getDataFilterByTabs(data, 'name_thesis_type', 'Đồ án').length}</Label>} iconPosition='end'/>
      </Tabs>
    </Box>
  )
}

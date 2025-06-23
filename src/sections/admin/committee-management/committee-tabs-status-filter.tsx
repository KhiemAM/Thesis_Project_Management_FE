import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { Label } from 'src/components/label'

import { getDataFilterByTabs } from './utils'

import type { Council } from './types'

interface TopicTabsFilterProps {
  data: Council[]
  value: string
  setValue: (newValue: string) => void
}

export function CommitteeTabsStatusFilter({ data, value, setValue }: TopicTabsFilterProps) {
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
        <Tab value="Công nghệ thông tin" label="Công nghệ thông tin" icon={<Label color='primary'>{getDataFilterByTabs(data, 'major', 'Công nghệ thông tin').length}</Label>} iconPosition='end'/>
        <Tab value="An toàn thông tin" label="An toàn thông tin" icon={<Label color='secondary'>{getDataFilterByTabs(data, 'major', 'An toàn thông tin').length}</Label>} iconPosition='end'/>
      </Tabs>
    </Box>
  )
}

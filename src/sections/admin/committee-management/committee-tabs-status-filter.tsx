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
        {/* <Tab value="Tất cả" label="Tất cả" icon={<Label color='default'>{data.length}</Label>} iconPosition='end'/>
        <Tab value="Hoạt động" label="Hoạt động" icon={<Label color='success'>{getDataFilterByTabs(data, 'status', 'Hoạt động').length}</Label>} iconPosition='end'/>
        <Tab value="Ngừng hoạt động" label="Ngừng hoạt động" icon={<Label color='error'>{getDataFilterByTabs(data, 'status', 'Ngừng hoạt động').length}</Label>} iconPosition='end'/> */}
      </Tabs>
    </Box>
  )
}

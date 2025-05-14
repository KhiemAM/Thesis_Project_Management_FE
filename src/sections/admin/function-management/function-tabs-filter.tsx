import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import { Label } from 'src/components/label'

interface TopicTabsFilterProps {
  value: string
  setValue: (newValue: string) => void
}

export function FunctionTabsFilter({ value, setValue }: TopicTabsFilterProps) {
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
        <Tab value="Hoạt động" label="Hoạt động" icon={<Label color='success'>9</Label>} iconPosition='end'/>
        <Tab value="Ngừng hoạt động" label="Ngừng hoạt động" icon={<Label color='error'>5</Label>} iconPosition='end'/>
      </Tabs>
    </Box>
  )
}

import type { FunctionProps } from 'src/sections/admin/function-management/function-table-row'

import * as React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import type { CheckboxListProps } from './types'


export function CheckboxList({ items, label }: CheckboxListProps) {
  const [checked, setChecked] = React.useState<string[]>([])

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const renderList = (listItems: FunctionProps[], level: number = 0) => listItems.map((item) => {
    const labelId = `checkbox-list-label-${item.id}`
    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding sx={{ pl: 2 + 4 * level }}>
          <ListItemButton onClick={handleToggle(item.id)} dense>
            <ListItemIcon sx={{ minWidth: 0, mr: 0 }}>
              <Checkbox
                checked={checked.includes(item.id)}
                tabIndex={-1}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={item[label] as string} />
          </ListItemButton>
        </ListItem>
        {item.children && (
          <List disablePadding>
            {renderList(item.children, level + 1)}
          </List>
        )}
      </React.Fragment>
    )
  })

  return (
    <List>
      {renderList(items)}
    </List>
  )
}

import * as React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Checkbox from '@mui/material/Checkbox'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

import type { UniversalCheckboxTreeProps } from './types'

export function UniversalCheckboxTree<T extends Record<string, any>>({
  items,
  label,
  valueKey = 'id',
  childrenKey = 'children',
  defaultChecked = [],
  checkedIds,
  onChange
}: UniversalCheckboxTreeProps<T>) {
  const isControlled = checkedIds !== undefined
  const [internalChecked, setInternalChecked] = React.useState<string[]>(defaultChecked)

  const checked = isControlled ? checkedIds! : internalChecked

  const getValue = (item: T): string => String(item[valueKey])
  const getChildren = (item: T): T[] => item[childrenKey] || []
  const getLabel = (item: T): React.ReactNode =>
    typeof label === 'function' ? label(item) : String(item[label])

  const flatten = (item: T): T[] => {
    const children = getChildren(item)
    return [item, ...children.flatMap(flatten)]
  }

  const handleToggle = (item: T) => () => {
    const value = getValue(item)
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    if (!isControlled) {
      setInternalChecked(newChecked)
    }

    const allItems = items.flatMap(flatten)
    const selectedObjects = allItems.filter((i) =>
      newChecked.includes(getValue(i))
    )

    onChange?.(newChecked, selectedObjects)
  }

  const renderList = (listItems: T[], level: number = 0): React.ReactNode =>
    listItems.map((item) => {
      const value = getValue(item)
      const labelId = `checkbox-list-label-${value}`

      return (
        <React.Fragment key={value}>
          <ListItem disablePadding sx={{ pl: 2 + 3 * level }}>
            <ListItemButton onClick={handleToggle(item)} dense>
              <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={getLabel(item)} />
            </ListItemButton>
          </ListItem>

          {getChildren(item)?.length > 0 && (
            <List disablePadding>
              {renderList(getChildren(item), level + 1)}
            </List>
          )}
        </React.Fragment>
      )
    })

  return <List>{renderList(items)}</List>
}

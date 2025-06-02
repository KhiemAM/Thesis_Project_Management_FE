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

  // Dùng để flatten toàn bộ cây
  const flatten = (item: T): T[] => {
    const children = getChildren(item)
    return [item, ...children.flatMap(flatten)]
  }

  // 🌳 Tạo parentMap để tối ưu
  const parentMapRef = React.useRef(new Map<string, string | null>())

  React.useEffect(() => {
    const buildParentMap = (nodes: T[], parent: T | null = null) => {
      nodes.forEach((node) => {
        const id = getValue(node)
        parentMapRef.current.set(id, parent ? getValue(parent) : null)
        buildParentMap(getChildren(node), node)
      })
    }

    parentMapRef.current.clear()
    buildParentMap(items)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const getAncestors = (id: string): string[] => {
    const result: string[] = []
    let current = parentMapRef.current.get(id)
    while (current) {
      result.push(current)
      current = parentMapRef.current.get(current)
    }
    return result
  }

  const getDescendants = (item: T): string[] =>
    flatten(item).map(getValue)

  const handleToggle = (item: T) => () => {
    const value = getValue(item)
    const isChecked = checked.includes(value)
    let newChecked = [...checked]

    if (isChecked) {
      // ❌ Bỏ check: bỏ chính nó và toàn bộ con
      const allToRemove = getDescendants(item)
      newChecked = newChecked.filter((id) => !allToRemove.includes(id))
    } else {
      // ✅ Check: check chính nó và toàn bộ con
      const toAdd = getDescendants(item)
      newChecked = Array.from(new Set([...newChecked, ...toAdd]))

      // ✅ Đồng thời thêm cha
      const ancestors = getAncestors(value)
      newChecked = Array.from(new Set([...newChecked, ...ancestors]))
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

import type { SelectChangeEvent } from '@mui/material/Select'

import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import { useTheme } from '@mui/material'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import ListSubheader from '@mui/material/ListSubheader'

import type { SingleSelectTextFieldProps } from './types'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '70%'
    }
  }
}

export function SingleSelectTextField({
  data = [],
  columns = [],
  inputLabel = 'Chọn giá trị',
  value,
  onChange,
  error = false,
  valueKey = 'value',
  displayKey
}: SingleSelectTextFieldProps) {
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const newValue = event.target.value
    onChange(newValue)
  }

  const handleItemClick = (itemValue: any) => {
    onChange(itemValue)
  }

  const renderSelectedValue = (selected: any) => {
    if (!selected) return ''

    const found = data.find((item) => item[valueKey] === selected)
    if (displayKey && found) {
      return found[displayKey]
    }
    return found ? columns.map(col => found[col.key]).join(' - ') : selected
  }

  if (columns.length === 0) {
    return null
  }

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="single-select-label">{inputLabel}</InputLabel>
      <Select
        labelId="single-select-label"
        value={value || ''}
        onChange={handleChange}
        input={<OutlinedInput label={inputLabel} />}
        renderValue={renderSelectedValue}
        MenuProps={MenuProps}
      >
        <ListSubheader sx={{ bgcolor: theme.vars.palette.primary.main, borderStartStartRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
            <Box sx={{ width: '48px' }} /> {/* Khoảng trống cho radio */}
            {columns.map((column, index) => (
              <Box key={column.key} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: column.width || 1
              }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    flex: 1,
                    textAlign: 'center',
                    color: theme.vars.palette.common.white
                  }}
                >
                  {column.label}
                </Typography>
                {index < columns.length - 1 && (
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                )}
              </Box>
            ))}
          </Box>
        </ListSubheader>
        {data.map((item, index) => (
          <MenuItem
            key={item[valueKey] || index}
            value={item[valueKey]}
            onClick={(e) => {
              e.preventDefault()
              handleItemClick(item[valueKey])
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Box sx={{ width: '48px', display: 'flex', justifyContent: 'center' }}>
                <Radio
                  checked={value === item[valueKey]}
                  onClick={(e) => e.stopPropagation()}
                />
              </Box>
              {columns.map((column, colIndex) => (
                <Box key={column.key} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: column.width || 1
                }}>
                  <Typography
                    variant='body1'
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {column.render ? column.render(item) : item[column.key]}
                  </Typography>
                  {colIndex < columns.length - 1 && (
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  )}
                </Box>
              ))}
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
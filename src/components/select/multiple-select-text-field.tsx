import type { SelectChangeEvent } from '@mui/material/Select'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import ListSubheader from '@mui/material/ListSubheader'

import type { MultipleSelectTextFieldPops } from './types'

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

export function MultipleSelectTextField({
  data = [],
  inputLabel = 'Chọn giá trị',
  value,
  onChange,
  error = false
}: MultipleSelectTextFieldPops) {
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value: newValue }
    } = event
    onChange(typeof newValue === 'string' ? newValue.split(',') : newValue)
  }

  return (
    <FormControl fullWidth error={error}>
      <InputLabel id="demo-multiple-checkbox-label">{inputLabel}</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={inputLabel} />}
        renderValue={(selected) =>
          (selected)
            .map((val) => {
              const found = data.find((item) => item.value === val)
              return found?.label || val
            })
            .join(', ')
        }
        MenuProps={MenuProps}
      >
        <ListSubheader sx={{ bgcolor: theme.vars.palette.primary.main, borderStartStartRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
            <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                Giá trị
            </Typography>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', color: theme.vars.palette.common.white }}>
                Nhãn
            </Typography>
          </Box>
        </ListSubheader>
        {data.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Checkbox checked={(value || []).includes(option.value)} />
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
                {option.value}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <Typography variant='body1' sx={{ flex: 1, textAlign: 'center' }}>{option.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

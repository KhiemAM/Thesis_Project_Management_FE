import type { SelectChangeEvent } from '@mui/material/Select'

import * as React from 'react'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import OutlinedInput from '@mui/material/OutlinedInput'

import type { MultipleSelectFilterProps } from './types'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

export default function MultipleSelectFilter({ valueMultipleSelect, filterInstructor, onFilterInstructor } : MultipleSelectFilterProps) {

  const handleChange = (event: SelectChangeEvent<typeof filterInstructor>) => {
    const {
      target: { value }
    } = event
    onFilterInstructor(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="multiple-checkbox-label-filter">Giáo viên hướng dẫn</InputLabel>
        <Select
          labelId="multiple-checkbox-label-filter"
          id="multiple-checkbox-filter"
          multiple
          value={filterInstructor}
          onChange={handleChange}
          input={<OutlinedInput label="Giáo viên hướng dẫn" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {valueMultipleSelect.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={filterInstructor.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

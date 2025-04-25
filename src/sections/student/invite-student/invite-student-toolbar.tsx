import { useState, useCallback } from 'react'

import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import { Iconify } from 'src/components/iconify'

import { ProductSort } from 'src/sections/product/product-sort'

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InviteStudentToolbar({ numSelected, filterName, onFilterName }: UserTableToolbarProps) {
  const [sortBy, setSortBy] = useState('featured')

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort)
  }, [])

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ maxWidth: 320 }}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
        </Tooltip>
      ) : (
        <ProductSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'featured', label: 'Featured' },
            { value: 'newest', label: 'Newest' },
            { value: 'priceDesc', label: 'Price: High-Low' },
            { value: 'priceAsc', label: 'Price: Low-High' }
          ]}
        />
      )}
    </Toolbar>
  )
}

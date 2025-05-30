import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import { Iconify } from 'src/components/iconify'
import MultipleSelectFilter from 'src/components/select'

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  valueMultipleSelect: string[];
  filterInstructor: string[];
  onFilterInstructor: (newValue: string[]) => void;
};

export function UserTableToolbar({ numSelected, filterName, onFilterName, valueMultipleSelect, filterInstructor, onFilterInstructor }: UserTableToolbarProps) {
  return (
  // <Toolbar
  //   sx={{
  //     height: 96,
  //     display: 'flex',
  //     justifyContent: 'space-between',
  //     p: (theme) => theme.spacing(0, 1, 0, 3),
  //     ...(numSelected > 0 && {
  //       color: 'primary.main',
  //       bgcolor: 'primary.lighter'
  //     })
  //   }}
  // >
  //   {numSelected > 0 ? (
  //     <Typography component="div" variant="subtitle1">
  //       {numSelected} selected
  //     </Typography>
  //   ) : (
  //     <OutlinedInput
  //       fullWidth
  //       value={filterName}
  //       onChange={onFilterName}
  //       placeholder="Tìm kiếm tên đề tài..."
  //       startAdornment={
  //         <InputAdornment position="start">
  //           <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
  //         </InputAdornment>
  //       }
  //       sx={{ maxWidth: 320 }}
  //     />
  //   )}

  //     {numSelected > 0 ? (
  //       <Tooltip title="Delete">
  //         <IconButton>
  //           <Iconify icon="solar:trash-bin-trash-bold" />
  //         </IconButton>
  //       </Tooltip>
  //     ) : (
  //       <Tooltip title="Filter list">
  //         <IconButton>
  //           <Iconify icon="ic:round-filter-list" />
  //         </IconButton>
  //       </Tooltip>
  //     )}
  // </Toolbar>
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Tìm kiếm tên chức năng..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ width: 300, maxWidth: 320 }}
        />
      </Box>

      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

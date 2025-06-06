import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import { Iconify } from 'src/components/iconify'
import MultipleSelectFilter from 'src/components/select/multiple-select-filter'

import { TopicSort } from './topic-proposal-sort'

import type { Batch } from './types'

// ----------------------------------------------------------------------

type UserTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  valueMultipleSelect: string[];
  filterInstructor: string[];
  onFilterInstructor: (newValue: string[]) => void;
  sortBy: string;
  onSort: (newSort: string) => void;
  option: Batch[];
};

const formatBatchOptions = (batches: Batch[]) => batches.map((batch) => {
  const academyYearName = batch.semester.academy_year?.name
  const label = `${batch.name} - ${batch.semester.name}${academyYearName ? ` (${academyYearName})` : ''}`
  return {
    label,
    value: batch.id
  }
})


export function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  valueMultipleSelect,
  filterInstructor,
  onFilterInstructor,
  sortBy,
  onSort,
  option
}: UserTableToolbarProps) {
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
        <MultipleSelectFilter valueMultipleSelect={valueMultipleSelect} filterValue={filterInstructor} onFilter={onFilterInstructor}/>

        <OutlinedInput
          fullWidth
          value={filterName}
          onChange={onFilterName}
          placeholder="Tìm kiếm tên đề tài..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          sx={{ width: 300, maxWidth: 320 }}
        />
      </Box>

      <TopicSort
        sortBy={sortBy}
        onSort={onSort}
        options={[
          { label: 'Tất cả', value: 'Tất cả' },
          ...formatBatchOptions(option)
        ]}
      />
    </Toolbar>
  )
}

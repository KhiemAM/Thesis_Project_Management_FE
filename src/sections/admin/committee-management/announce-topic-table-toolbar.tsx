import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import { Iconify } from 'src/components/iconify'
import MultipleSelectFilter from 'src/components/select/multiple-select-filter'

import { TopicSort } from './topic-proposal-sort'

import type { Batch } from './types'

// ----------------------------------------------------------------------

type AnnounceTopicTableToolbarProps = {
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


export function AnnounceTopicTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  valueMultipleSelect,
  filterInstructor,
  onFilterInstructor,
  sortBy,
  onSort,
  option
}: AnnounceTopicTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography component="div" variant="subtitle1">
            Đã chọn {numSelected} đề tài
          </Typography>
          <Button variant='contained' size='large'>
            <Iconify icon="solar:upload-square-bold"/>
            <Typography variant='subtitle1' sx={{ ml: 1 }}>
              Công khai danh sách đề tài
            </Typography>
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <MultipleSelectFilter valueMultipleSelect={valueMultipleSelect} filterValue={filterInstructor} onFilter={onFilterInstructor} />

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
              sx={{ width: 300, maxWidth: 320 }} />
          </Box>
          <TopicSort
            sortBy={sortBy}
            onSort={onSort}
            options={[
              { label: 'Tất cả', value: 'Tất cả' },
              ...formatBatchOptions(option)
            ]}
          />
        </>
      )}

    </Toolbar>
  )
}

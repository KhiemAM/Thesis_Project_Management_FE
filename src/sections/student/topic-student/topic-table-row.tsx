import { useState, useCallback } from 'react'

import Popover from '@mui/material/Popover'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'

import { getColorByDepartment } from './utils'

// ----------------------------------------------------------------------

export type TopicProps = {
  id: string;
  topicNumber: number;
  name: string;
  instructor: string;
  email: string;
  department: string;
};

type UserTableRowProps = {
  row: TopicProps;
  selected: boolean;
  onSelectRow: () => void;
  onOpenTopicDetail: () => void;
};

export function TopicTableRow({ row, selected, onSelectRow, onOpenTopicDetail }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.topicNumber}</TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>{row.instructor}</TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell align='center'>
          <Label color={getColorByDepartment(row.department)}>{row.department}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 160,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' }
            }
          }}
        >
          <MenuItem onClick={handleClosePopover} sx={{ color: 'primary.main' }}>
            <Iconify icon="solar:user-plus-linear" />
            Gửi lời mời
          </MenuItem>

          <MenuItem onClick={() => { handleClosePopover(); onOpenTopicDetail() }}>
            <Iconify icon="solar:pen-bold" />
            Xem chi tiết
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  )
}

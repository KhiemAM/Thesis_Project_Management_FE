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
import { AlertConfirmNavigate } from 'src/components/sweetalert2'

import { getColorByStatus } from './utils'

// ----------------------------------------------------------------------

export type FunctionProps = {
  id: string;
  function: string;
  path: string;
  parentFunction: string;
  type: string;
  status: string;
  children?: FunctionProps[];
};

type UserTableRowProps = {
  row: FunctionProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function FunctionTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  const handleDeleteFunction = () => {
    AlertConfirmNavigate({
      title: 'Bạn có chắc chắn',
      text: 'Bạn có muốn xóa không?',
      icon:'warning',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Yes, delete it!',
      router: () => {}
    })
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.function}</TableCell>

        <TableCell>{row.path}</TableCell>

        <TableCell>{row.parentFunction}</TableCell>

        <TableCell>{row.type}</TableCell>

        <TableCell align='center'>
          <Label color={getColorByStatus(row.status)}>{row.status}</Label>
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
          <MenuItem
            onClick={() => { handleClosePopover() }}
            sx={{ color: 'primary.main' }}
          >
            <Iconify icon="solar:pen-bold" />
            Cập nhật
          </MenuItem>
          <MenuItem
            onClick={() => { handleClosePopover(); handleDeleteFunction() }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold"/>
            Xóa
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  )
}

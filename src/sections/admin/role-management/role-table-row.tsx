import { useState, useCallback } from 'react'

import Table from '@mui/material/Table'
import Dialog from '@mui/material/Dialog'
import Popover from '@mui/material/Popover'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { AlertConfirmNavigate } from 'src/components/sweetalert2'

import { getColorByStatus } from './utils'
import { RoleTableHeadNoSort } from './role-table-head-no-sort'
import { type FunctionProps } from '../function-management/function-table-row'
import { FunctionTableRowDialog } from '../function-management/function-table-row-dialog'

// ----------------------------------------------------------------------

export type RoleProps = {
  id: string;
  roleId: string;
  roleName: string;
  description: string;
  status: string;
  function: FunctionProps[];
};

type UserTableRowProps = {
  row: RoleProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function RoleTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
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

        <TableCell>{row.roleId}</TableCell>

        <TableCell>{row.roleName}</TableCell>

        <TableCell>{row.description}</TableCell>

        <TableCell align='center'>
          <Label color={getColorByStatus(row.status)}>{row.status}</Label>
        </TableCell>

        <TableCell align="center">
          {row.function.length > 0 && (
            <IconButton onClick={handleOpenDialog} sx={{ color: 'primary.main' }}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          )}
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

      <Dialog
        fullWidth
        maxWidth="lg"
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Danh sách chức năng
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500]
          })}
        >
          <Iconify icon='mingcute:close-line' />
        </IconButton>
        <DialogContent dividers>
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <RoleTableHeadNoSort
                  headLabel={[
                    { id: 'name', label: 'Chức năng', minWidth: 300 },
                    { id: 'description', label: 'Mô tả', minWidth: 300 },
                    { id: 'path', label: 'Đường dẫn', minWidth: 200 },
                    { id: 'parentFunction', label: 'Chức năng cha', minWidth: 200 },
                    { id: 'type', label: 'Loại chức năng', align: 'center', minWidth: 200 },
                    { id: 'status', label: 'Trạng thái', align: 'center', minWidth: 200 }
                  ]}
                />
                <TableBody>
                  {row.function
                    .map((rowFunction) => (
                      <FunctionTableRowDialog
                        key={rowFunction.id}
                        row={rowFunction}
                      />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </DialogContent>
      </Dialog>
    </>
  )
}

import type { Dayjs } from 'dayjs'

import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTheme } from '@mui/material'
import Popover from '@mui/material/Popover'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { fDate } from 'src/utils/format-time'

import functionsApi from 'src/axios/functions'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import { AlertConfirmCallAPI } from 'src/components/sweetalert2'

import { getColorByIsActive } from './utils'

// ----------------------------------------------------------------------

// Tạo một MotionTableRow từ MUI TableRow với cách sử dụng mới
const MotionTableRow = motion.create(styled(TableRow)({}))

export type UserProps = {
  id: string;
  user_name: string;
  is_active: boolean;
  user_type: string;
  user_type_name: string;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  level?: number;
  onRefresh?: () => void; // Optional prop for refreshing the table
};

export function UserTableRow({ row, selected, onSelectRow, level = 0, onRefresh }: UserTableRowProps) {
  const theme = useTheme()
  const navigate = useNavigate()
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [expanded, setExpanded] = useState(false)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  // This function should call the API to delete the function
  const handleDeleteFunction = useCallback(() => {
    AlertConfirmCallAPI({
      title: 'Bạn có chắc chắn',
      text: 'Bạn có muốn xóa không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Hủy',
      api: async() => {
        await functionsApi.deleteFunction(row.id)
        onRefresh?.()
        toast.success('Xóa chức năng thành công!')
      }
    })
  }, [row.id, onRefresh])

  const handleUpdateFunction = useCallback(() => {
    navigate(`/function/update/${row.id}`)
  }, [navigate, row.id])

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <MotionTableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        sx={
          level === 0
            ? {
              '&.MuiTableRow-root': {
                borderBottom: '1px solid',
                borderTop: '1px solid',
                backgroundColor: theme.vars.palette.action.selected,
                '&:hover': {
                  backgroundColor: theme.vars.palette.action.focus
                }
              }
            }
            : {}
        }
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.user_name}</TableCell>

        <TableCell>{row.user_type_name}</TableCell>

        <TableCell align='center'>
          <Label color={getColorByIsActive(row.is_active)}>{row.is_active ? 'Hoạt động' : 'Ngừng hoạt động'}</Label>
        </TableCell>

        <TableCell align="center" sx={{
          position: 'sticky',
          right: 0,
          backgroundColor: `${theme.vars.palette.background.paper}`
        }}>
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </MotionTableRow>

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
          <MenuItem onClick={() => { handleClosePopover(); handleUpdateFunction() }} sx={{ color: 'primary.main' }}>
            <Iconify icon="solar:pen-bold" />
            Xem thông tin
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  )
}

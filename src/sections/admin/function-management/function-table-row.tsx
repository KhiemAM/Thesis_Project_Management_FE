import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Popover from '@mui/material/Popover'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import { AlertConfirmNavigate } from 'src/components/sweetalert2'

import { getColorByStatus } from './utils'

// ----------------------------------------------------------------------

// Tạo một MotionTableRow từ MUI TableRow với cách sử dụng mới
const MotionTableRow = motion.create(styled(TableRow)({}))

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
  level?: number;
};

export function FunctionTableRow({ row, selected, onSelectRow, level = 0 }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [expanded, setExpanded] = useState(false)

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
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      router: () => {}
    })
  }

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
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell sx={{ pl: 3 + 3 * level }}>
          {row.function}
          {row.children && (
            <IconButton onClick={toggleExpand} size="small">
              <Iconify icon={expanded ? 'solar:alt-arrow-down-line-duotone' : 'solar:alt-arrow-right-line-duotone'} />
            </IconButton>
          )}
        </TableCell>

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
      </MotionTableRow>

      <AnimatePresence>
        {expanded && row.children?.map((child) => (
          <FunctionTableRow
            key={child.id}
            row={child}
            selected={selected}
            onSelectRow={onSelectRow}
            level={level + 1}
          />
        ))}
      </AnimatePresence>

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
            <Iconify icon="solar:pen-bold" />
            Cập nhật
          </MenuItem>
          <MenuItem onClick={() => { handleClosePopover(); handleDeleteFunction() }} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold"/>
            Xóa
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  )
}

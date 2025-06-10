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

export interface ProfileProps {
  user_id: string;
  information: {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string; // ISO format: "1985-03-15T00:00:00"
    gender: string; // 0: Female, 1: Male
    address: string;
    tel_phone: string;
  };
  student_info: {
    id: string;
    user_id: string;
    student_code: string;
    class_name: string;
    major_id: string;
    major_name: string;
    create_datetime: string; // ISO format
    update_datetime: string; // ISO format
  };
}

type UserTableRowProps = {
  row: ProfileProps;
  selected: boolean;
  onSelectRow: () => void;
  level?: number;
  onRefresh?: () => void; // Optional prop for refreshing the table
};

export function UserTableRow({ row, selected, onSelectRow, level = 0, onRefresh }: UserTableRowProps) {
  const theme = useTheme()
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

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

        <TableCell>{row.student_info.student_code}</TableCell>

        <TableCell>{`${row.information.last_name} ${row.information.first_name}`}</TableCell>

        <TableCell>{fDate(row.information.date_of_birth)}</TableCell>

        <TableCell>{String(row.information.gender) === '1' ? 'Nam' : 'Nữ'}</TableCell>

        <TableCell>{row.student_info.class_name}</TableCell>

        <TableCell>{row.student_info.major_name}</TableCell>

        {/* <TableCell align='center'>
          <Label color={getColorByIsActive(row.is_active)}>{row.is_active ? 'Hoạt động' : 'Ngừng hoạt động'}</Label>
        </TableCell> */}

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
          <MenuItem onClick={() => { handleClosePopover() }} sx={{ color: 'primary.main' }}>
            <Iconify icon="solar:pen-bold" />
            Xem thông tin
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  )
}

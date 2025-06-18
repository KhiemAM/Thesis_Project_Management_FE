
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useState, useCallback } from 'react'

import Popover from '@mui/material/Popover'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import { Box, Divider, useTheme, Typography } from '@mui/material'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { fDate } from 'src/utils/format-time'

import inviteApi from 'src/axios/invite'

import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'

import ProfileStudentSidebarInfo from '../profile-student/profile-student-sidebar-info'

// ----------------------------------------------------------------------

// Tạo một MotionTableRow từ MUI TableRow với cách sử dụng mới
const MotionTableRow = motion.create(styled(TableRow)({}))

export interface ProfileProps {
  user_id: string;
  user_name: string;
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
  const [openInformation, setOpenInformation] = useState(false)
  const [loadingButton, setLoadingButton] = useState(false)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  const onOpenInformation = useCallback(() => {
    setOpenInformation(true)
  }, [])

  const onCloseInformation = useCallback(() => {
    setOpenInformation(false)
  }, [])

  const handleInviteGroup = useCallback(async() => {
    try {
      setLoadingButton(true)
      await inviteApi.sendInvite({ receiver_id: row.user_id })
      toast.success('Gửi lời mời thành công!')
    } finally {
      setLoadingButton(false)
    }
  }, [row.user_id])

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

        <TableCell>{row.user_name}</TableCell>

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
          <MenuItem onClick={() => { handleClosePopover(); handleInviteGroup() }} sx={{ color: 'primary.main' }}>
            <Iconify icon="solar:user-plus-linear" />
            Gửi lời mời
          </MenuItem>
          <MenuItem onClick={() => { handleClosePopover(); onOpenInformation() }} sx={{ color: 'primary.main' }}>
            <Iconify icon="solar:eye-bold" />
            Xem thông tin
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={openInformation}
        onClose={onCloseInformation}
        slotProps={{
          paper: {
            sx: { width: { xs: 360, sm: 460 }, overflow: 'hidden' }
          }
        }}
      >
        <Box
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1.5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Thông tin sinh viên
          </Typography>

          <IconButton onClick={onCloseInformation}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />
        <ProfileStudentSidebarInfo
          isDrawer
          initialValues={row}
        />
      </Drawer>
    </>
  )
}

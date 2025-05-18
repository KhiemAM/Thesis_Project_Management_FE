import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Popover from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import ProfileStudentSidebarInfo from '../profile-student/profile-student-sidebar-info'

// ----------------------------------------------------------------------

export type SearchStudentProps = {
  id: string;
  mssv: string;
  name: string;
  class: string;
  gender: string;
  birthday: string;
};

type UserTableRowProps = {
  row: SearchStudentProps
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [openStudentInfoDetail, setOpenStudentInfoDetail] = useState(false)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  const onOpenStudentInfoDetail = useCallback(() => {
    setOpenStudentInfoDetail(true)
  }, [])

  const onCloseStudentInfoDetail = useCallback(() => {
    setOpenStudentInfoDetail(false)
  }, [])

  const handleInviteStudent = useCallback(() => {
    // setOpenStudentInfoDetail(false)
  }, [])

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.mssv}</TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell>{row.class}</TableCell>

        <TableCell>{row.birthday}</TableCell>

        <TableCell align='center'>
          <Label color={(row.gender === 'Nữ' && 'error') || 'success'}>{row.gender}</Label>
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

          <MenuItem onClick={() => { handleClosePopover(); onOpenStudentInfoDetail() }}>
            <Iconify icon="solar:pen-bold" />
            Xem thông tin
          </MenuItem>
        </MenuList>
      </Popover>

      <Drawer
        anchor="right"
        open={openStudentInfoDetail}
        onClose={onCloseStudentInfoDetail}
        slotProps={{
          paper: {
            sx: { width: { xs: 360, sm: 360 }, overflow: 'hidden' }
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

          <IconButton onClick={onCloseStudentInfoDetail}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />

        <Scrollbar>
          <ProfileStudentSidebarInfo isDrawer/>
        </Scrollbar>
      </Drawer>
    </>
  )
}

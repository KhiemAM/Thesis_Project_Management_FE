import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { Label } from 'src/components/label'
import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import { getColorByStatus, getColorByDepartment } from './utils'

// ----------------------------------------------------------------------

export type TopicProps = {
  id: string;
  status: string;
  topicNumber: number;
  name: string;
  content: string;
  instructor: string;
  email: string;
  department: string;
};

type UserTableRowProps = {
  row: TopicProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function TopicProposalTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [openTopicDetail, setOpenTopicDetail] = useState(false)

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  const onOpenTopicDetail = useCallback(() => {
    setOpenTopicDetail(true)
  }, [])

  const onCloseTopicDetail = useCallback(() => {
    setOpenTopicDetail(false)
  }, [])

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        sx={{
          '&.MuiTableRow-root': {
            borderBottom: '1px solid',
            borderTop: '1px solid',
            backgroundColor: (theme) => theme.vars.palette.action.selected,
            '&:hover': {
              backgroundColor: (theme) => theme.vars.palette.action.focus
            }
          }
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.topicNumber}</TableCell>

        <TableCell align='center'>
          <Label color={getColorByStatus(row.status)}>{row.status}</Label>
        </TableCell>

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
          <MenuItem
            onClick={() => { handleClosePopover(); onOpenTopicDetail() }}
            sx={{ color: 'primary.main' }}
          >
            <Iconify icon="solar:pen-bold" />
            Xem chi tiết
          </MenuItem>
        </MenuList>
      </Popover>

      <Drawer
        anchor="right"
        open={openTopicDetail}
        onClose={onCloseTopicDetail}
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
            Chi tiết đề tài
          </Typography>

          <IconButton onClick={onCloseTopicDetail}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />

        <Scrollbar>
          <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant='h5'>Tên đề tài:</Typography>
              <Typography variant='body1'>
                {row.name}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 3 }}>
              <Typography variant='h5'>Nội dung đề tài:</Typography>
              <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
                {row.content}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 3 }}>
              <Typography variant='h5'>Giáo viên hướng dẫn:</Typography>
              <Typography variant='body1'>
                {row.instructor}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 3 }}>
              <Typography variant='h5'>Email:</Typography>
              <Typography variant='body1'>
                {row.email}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 3 }}>
              <Typography variant='h5'>Bộ môn:</Typography>
              <Typography variant='body1'>
                {row.department}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 3 }}>
              <Typography variant='h5'>Ghi chú:</Typography>
              <Typography variant='body1'>
                {/* {row.instructor} */}
              </Typography>
            </Box>
          </Box>
        </Scrollbar>
      </Drawer>
    </>
  )
}

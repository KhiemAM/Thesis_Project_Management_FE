import { toast } from 'react-toastify'
import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import Popover from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import thesesApi from 'src/axios/theses'

import { Label } from 'src/components/label'
import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { AlertConfirmCallAPI } from 'src/components/sweetalert2'

import { getColorByStatus, getColorByThesisType, getColorByDepartment } from './utils'

// ----------------------------------------------------------------------

export type TopicProps = {
  id: string;
  thesis_type: number;
  name_thesis_type: string;
  status: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  major: string;
  instructors: {
    name: string;
    email: string;
    phone: string;
    department: number;
    department_name: string;
  }[];
  batch: {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    semester: {
      id: string;
      name: string;
      start_date: string;
      end_date: string;
      academy_year: {
        id: string;
        name: string;
        start_date: string;
        end_date: string;
      };
    };
  };
};

type UserTableRowProps = {
  row: TopicProps;
  selected: boolean;
  onSelectRow: () => void;
  onRefresh?: () => void; // Optional prop for refreshing the table
};

export function TopicProposalTableRow({ onRefresh, row, selected, onSelectRow }: UserTableRowProps) {
  const theme = useTheme()
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

  const handleDeleteTopic = useCallback(() => {
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
        await thesesApi.deleteThese(row.id)
        onRefresh?.()
        toast.success('Xóa đề tài thành công!')
      }
    })
  }, [row.id, onRefresh])


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
            backgroundColor: theme.vars.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.vars.palette.action.focus
            }
          }
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.name}</TableCell>

        <TableCell align='center'>
          <Label color={getColorByStatus(row.status)}>{row.status}</Label>
        </TableCell>


        <TableCell>
          {row.instructors.map((item, index) => (
            <Typography key={index} variant='body2'>{item.name}</Typography>
          ))}
        </TableCell>

        <TableCell>{row.instructors[0].email}</TableCell>

        <TableCell align='center'>
          <Label color={getColorByDepartment(row.instructors[0].department_name)}>{row.instructors[0].department_name}</Label>
        </TableCell>

        <TableCell align='center'>
          <Label color={getColorByThesisType(row.name_thesis_type)}>{row.name_thesis_type}</Label>
        </TableCell>

        <TableCell
          align="center"
          sx={{
            position: 'sticky',
            right: 0,
            backgroundColor: theme.vars.palette.background.paper
          }}
        >
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

          <MenuItem onClick={() => { handleClosePopover(); handleDeleteTopic() }} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold"/>
              Xóa
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
                {row.description}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 3 }}>
              <Typography variant='h5'>Giáo viên hướng dẫn:</Typography>
              <Typography variant='body1'>
                {row.instructors.map((instructor, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant='subtitle1'>{instructor.name}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {instructor.email} - {instructor.phone}
                    </Typography>
                  </Box>
                ))}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ my: 3 }}>
              <Typography variant='h5'>Bộ môn:</Typography>
              <Typography variant='body1'>
                {row.instructors[0].department_name}
              </Typography>
            </Box>

            <Divider />
          </Box>
        </Scrollbar>
      </Drawer>
    </>
  )
}

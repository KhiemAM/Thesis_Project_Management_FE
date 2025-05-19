import type { SubmitHandler } from 'react-hook-form'

import { useForm } from 'react-hook-form'
import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import { Label } from 'src/components/label'
import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { AlertConfirmCallAPI } from 'src/components/sweetalert2'

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

interface IFormInputApprovveTopicProposal {
  reason: string;
}

export function ApproveTopicProposalTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [openTopicDetail, setOpenTopicDetail] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputApprovveTopicProposal>()
  const onSubmit: SubmitHandler<IFormInputApprovveTopicProposal> = async(data) => {
    try {
      console.log('🚀 ~ constonSubmit:SubmitHandler<IFormInput>=async ~ data:', data)
      // setLoading(true)
      // await groupApi.createGroup(data)
      // toast.success('Tạo nhóm thành công')
    }
    finally {
      // setLoading(false)
      handleCloseDialog()
    }
  }

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

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

  const handleApproveTopicProposal = useCallback(() => {
    AlertConfirmCallAPI({
      title: 'Bạn có muốn thực hiện thao tác này không?',
      text: 'Bạn có muốn duyệt đề tài này không?',
      icon:'success',
      showCancelButton: true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Duyệt đề tài',
      cancelButtonText:'Hủy',
      api: () => {}
    })
  }, [])

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
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

        <TableCell align="right" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          <Tooltip title="Từ chối" arrow>
            <IconButton onClick={handleOpenDialog} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:close-circle-broken" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Duyệt đề tài" arrow>
            <IconButton onClick={handleApproveTopicProposal} sx={{ color: 'success.main' }}>
              <Iconify icon="solar:check-circle-broken" />
            </IconButton>
          </Tooltip>
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

      {/* Dialog */}
      <Dialog
        fullWidth
        open={openDialog}
        onClose={handleCloseDialog}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault()
              handleSubmit(onSubmit)()
            }
          }
        }}
      >
        <DialogTitle>Lý do từ chối</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vui lòng nhập lý do từ chối đề tài này.
          </DialogContentText>
          <TextField
            fullWidth
            label="Lý do *"
            error={!!errors['reason']}
            multiline
            sx={{ mt: 3 }}
            {...register('reason', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          {errors['reason'] && (
            <Alert severity="error" sx={{ mt: 3 }}>{String(errors['reason']?.message)}</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='error'>Hủy</Button>
          <Button type="submit">Từ chối</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

import { toast } from 'react-toastify'
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
import { Dialog, useTheme, TextField, DialogTitle, DialogContent } from '@mui/material'

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
  reason?: string;
  notes?: string;
  instructors: {
    name: string;
    email: string;
    lecturer_code: string;
    department: number;
    department_name: string;
  }[];
  reviewers: {
    name: string;
    email: string;
    lecturer_code: string;
    department: number;
    department_name: string;
  }[];
  department: {
    id: string;
    name: string;
  };
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
  const [openDialogReason, setOpenDialogReason] = useState(false)

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

  const handleOpenDialogReason = useCallback(() => {
    setOpenDialogReason(true)
  }, [])

  const handleCloseDialogReason = useCallback(() => {
    setOpenDialogReason(false)
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
          {row.reason && (
            <IconButton color='primary' onClick={handleOpenDialogReason}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          )}
        </TableCell>


        <TableCell>
          {row.instructors.map((item, index) => (
            <Typography key={index} variant='body2'>{item.name}</Typography>
          ))}
        </TableCell>

        <TableCell>{row.instructors[0].email}</TableCell>

        <TableCell>
          {row.reviewers.map((item, index) => (
            <Typography key={index} variant='body2'>{item.name}</Typography>
          ))}
        </TableCell>

        <TableCell align='center'>
          <Label color={getColorByDepartment(row.department.name)}>{row.department.name}</Label>
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

        <Divider />        <Scrollbar>
          <Box sx={{ p: 3 }}>
            {/* Topic Name Section */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                background: theme.vars.palette.primary.main,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Typography variant='subtitle2' sx={{ color: 'white', mb: 1, fontWeight: 600, opacity: 0.9 }}>
                Tên đề tài
              </Typography>
              <Typography variant='h6' sx={{ color: 'white', fontWeight: 600, lineHeight: 1.4 }}>
                {row.name}
              </Typography>
            </Box>            {/* Description Section */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                bgcolor: theme.vars.palette.background.paper,
                borderRadius: 3,
                border: '1px solid',
                borderColor: theme.vars.palette.grey[200],
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '6px',
                  background: `linear-gradient(135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.dark})`,
                  borderRadius: '0 8px 8px 0',
                  boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Typography variant='subtitle2' sx={{ color: theme.vars.palette.primary.main, mb: 2, fontWeight: 600 }}>
                Nội dung đề tài
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  whiteSpace: 'pre-line',
                  lineHeight: 1.7,
                  color: theme.vars.palette.text.primary,
                  pl: 1
                }}
              >
                {row.description}
              </Typography>
            </Box>            {/* Instructors Section */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                bgcolor: theme.vars.palette.background.paper,
                borderRadius: 3,
                border: '1px solid',
                borderColor: theme.vars.palette.grey[200],
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '6px',
                  background: `linear-gradient(135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.dark})`,
                  borderRadius: '0 8px 8px 0',
                  boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <Typography variant='subtitle2' sx={{ color: theme.vars.palette.primary.main, mb: 3, fontWeight: 600 }}>
                Giáo viên hướng dẫn
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 1 }}>
                {row.instructors.map((instructor, index) => ( <Box
                  key={index}
                  sx={{
                    p: 3,
                    bgcolor: theme.vars.palette.grey[50],
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: theme.vars.palette.grey[100],
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                      borderColor: theme.vars.palette.primary.light
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      background: `linear-gradient(135deg, ${theme.vars.palette.primary.main}, ${theme.vars.palette.primary.light})`,
                      borderRadius: '0 6px 6px 0'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1.1rem'
                      }}
                    >
                      {instructor.name.charAt(0).toUpperCase()}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>                        <Typography variant='subtitle1' sx={{ fontWeight: 600, color: theme.vars.palette.text.primary }}>
                      {instructor.name}
                    </Typography>
                    <Typography variant='caption' sx={{ color: theme.vars.palette.text.secondary, fontWeight: 500 }}>
                          Mã GV: {instructor.lecturer_code}
                    </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ pl: 6 }}>                      <Typography variant='body2' sx={{ color: theme.vars.palette.text.secondary }}>
                    {instructor.email}
                  </Typography>
                  </Box>
                </Box>
                ))}
              </Box>
            </Box>            {/* Reviewers Section */}
            {row.reviewers && row.reviewers.length > 0 && (
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: theme.vars.palette.background.paper,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: theme.vars.palette.grey[200],
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '6px',
                    background: `linear-gradient(135deg, ${theme.vars.palette.primary.light}, ${theme.vars.palette.primary.main})`,
                    borderRadius: '0 8px 8px 0',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Typography variant='subtitle2' sx={{ color: theme.vars.palette.primary.main, mb: 3, fontWeight: 600 }}>
                  Giáo viên phản biện
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 1 }}>
                  {row.reviewers.map((reviewer, index) => ( <Box
                    key={index}
                    sx={{
                      p: 3,
                      bgcolor: theme.vars.palette.grey[50],
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: theme.vars.palette.grey[100],
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                        borderColor: theme.vars.palette.primary.light
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        background: `linear-gradient(135deg, ${theme.vars.palette.primary.light}, ${theme.vars.palette.primary.main})`,
                        borderRadius: '0 6px 6px 0'
                      }
                    }}
                  >                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '1.1rem'
                        }}
                      >
                        {reviewer.name.charAt(0).toUpperCase()}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='subtitle1' sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {reviewer.name}
                        </Typography>
                        <Typography variant='caption' sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            Mã GV: {reviewer.lecturer_code}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ pl: 6 }}>
                      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        {reviewer.email}
                      </Typography>
                    </Box>
                  </Box>
                  ))}
                </Box>
              </Box>
            )}            {/* Department Section */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                background: theme.vars.palette.primary.lighter || theme.vars.palette.primary.light + '20',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                position: 'relative'
              }}
            >
              <Typography variant='subtitle2' sx={{ color: theme.vars.palette.primary.dark, mb: 1, fontWeight: 600 }}>
                Bộ môn
              </Typography>
              <Typography variant='h6' sx={{ color: theme.vars.palette.primary.dark, fontWeight: 600 }}>
                {row.department.name}
              </Typography>
            </Box>            {/* Notes Section */}
            {row.notes && (
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: theme.vars.palette.background.paper,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: theme.vars.palette.grey[200],
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '6px',
                    background: `linear-gradient(135deg, ${theme.vars.palette.warning.main}, ${theme.vars.palette.warning.dark})`,
                    borderRadius: '0 8px 8px 0',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Typography variant='subtitle2' sx={{ color: theme.vars.palette.warning.main, mb: 2, fontWeight: 600 }}>
                  Ghi chú
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    whiteSpace: 'pre-line',
                    lineHeight: 1.7,
                    color: theme.vars.palette.text.primary,
                    pl: 1
                  }}
                >
                  {row.notes}
                </Typography>
              </Box>
            )}            {/* Reason Section - Only if status is rejected */}
            {row.status === 'Từ chối' && row.reason && (
              <Box
                sx={{
                  mb: 4,
                  p: 3,
                  bgcolor: theme.vars.palette.background.paper,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: theme.vars.palette.error.light,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '6px',
                    background: `linear-gradient(135deg, ${theme.vars.palette.error.main}, ${theme.vars.palette.error.dark})`,
                    borderRadius: '0 8px 8px 0',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Typography variant='subtitle2' sx={{ color: theme.vars.palette.error.main, mb: 2, fontWeight: 600 }}>
                  Lý do từ chối
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    whiteSpace: 'pre-line',
                    lineHeight: 1.7,
                    color: theme.vars.palette.text.primary,
                    pl: 1
                  }}
                >
                  {row.reason}
                </Typography>
              </Box>
            )}            {/* Additional Info */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
              <Box
                sx={{
                  p: 3,
                  background: theme.vars.palette.primary.lighter || theme.vars.palette.primary.light + '20',
                  borderRadius: 3,
                  textAlign: 'center',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography variant='caption' sx={{ color: theme.vars.palette.primary.dark, fontWeight: 600, display: 'block', mb: 1 }}>
                  Loại đề tài
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: 600, color: theme.vars.palette.primary.dark }}>
                  {row.name_thesis_type}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 3,
                  background: theme.vars.palette.primary.main,
                  borderRadius: 3,
                  textAlign: 'center',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography variant='caption' sx={{ color: 'white', fontWeight: 600, display: 'block', mb: 1 }}>
                  Trạng thái
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: 600, color: 'white' }}>
                  {row.status}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Scrollbar>
      </Drawer>

      {/* Dialog See reason*/}
      <Dialog
        fullWidth
        open={openDialogReason}
        onClose={handleCloseDialogReason}
      >
        <DialogTitle>Lý do từ chối</DialogTitle>
        <DialogContent>
          <TextField
            value={row.reason || ''}
            fullWidth
            multiline
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'

import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Popover from '@mui/material/Popover'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { fDateTime } from 'src/utils/format-time'

import groupApi from 'src/axios/group'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import { getColorByMajor } from './utils'

import type { Council } from './types'


// ----------------------------------------------------------------------

interface GroupInfoCellProps {
  thesisId: string;
  groupData: any;
  isLoading: boolean;

  onFetchGroup: (thesisId: string) => void;
}

function GroupInfoCell({ thesisId, groupData, isLoading, onFetchGroup }: GroupInfoCellProps) {
  useEffect(() => {
    onFetchGroup(thesisId)
  }, [thesisId, onFetchGroup])
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60px' }}>
        <CircularProgress size={24} sx={{ color: '#1877F2' }} />
      </div>
    )
  }

  if (!groupData) {
    return (
      <div style={{
        background: 'rgba(255,152,0,0.1)',
        padding: '12px',
        borderRadius: '8px',
        border: '1px dashed #ff9800',
        textAlign: 'center'
      }}>
        <Iconify icon="solar:users-group-rounded-bold" width={24} color="#ff9800" />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Chưa có nhóm
        </Typography>
      </div>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        background: 'white',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e0e4e7',
        marginBottom: '8px'
      }}>
        <Typography variant="subtitle2" sx={{
          fontWeight: 600,
          color: '#1a1a1a',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1
        }}>
          <Iconify icon="solar:users-group-rounded-bold" width={16} color="#ff9800" />
          {groupData.name}
        </Typography>
      </div>      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {groupData.members?.map((member: any) => (
          <div
            key={member.user_id}
            style={{
              background: member.is_leader ? 'linear-gradient(135deg, #73BAFB 0%, #1877F2 100%)' : 'white',
              color: member.is_leader ? 'white' : '#1a1a1a',
              padding: '8px 12px',
              borderRadius: '8px',
              border: member.is_leader ? 'none' : '1px solid #e0e4e7',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: member.is_leader ? 600 : 400,
              transition: 'all 0.2s ease'
            }}
          >
            {member.is_leader && (
              <Iconify icon="solar:crown-star-bold" width={14} color="white" />
            )}
            <div>
              <div style={{ fontWeight: member.is_leader ? 600 : 500 }}>
                {member.full_name}
              </div>
              <div style={{
                fontSize: '11px',
                opacity: 0.8,
                marginTop: '2px'
              }}>
                {member.student_code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------

type CommitteeTableRowProps = {
  row: Council;
  selected: boolean;
  onSelectRow: () => void;

  onDeleteCouncil?: (councilId: string) => Promise<void>;
};

export function CommitteeTableRow({ row, selected, onSelectRow, onDeleteCouncil }: CommitteeTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [openMembersDialog, setOpenMembersDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [groupsData, setGroupsData] = useState<Record<string, any>>({})
  const [loadingGroups, setLoadingGroups] = useState<Record<string, boolean>>({})
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleOpenMembersDialog = useCallback(() => {
    setOpenMembersDialog(true)
  }, [])
  const handleCloseMembersDialog = useCallback(() => {
    setOpenMembersDialog(false)
  }, [])

  const handleOpenDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(true)
    handleClosePopover()
  }, [handleClosePopover])

  const handleCloseDeleteDialog = useCallback(() => {
    setOpenDeleteDialog(false)
  }, [])

  const fetchGroupInfo = useCallback(async (thesisId: string) => {
    if (groupsData[thesisId] || loadingGroups[thesisId]) return

    try {
      setLoadingGroups(prev => ({ ...prev, [thesisId]: true }))
      const response = await groupApi.getGroupByThesis(thesisId)
      setGroupsData(prev => ({ ...prev, [thesisId]: response.data }))
    } catch {
      // Error fetching group info
      setGroupsData(prev => ({ ...prev, [thesisId]: null }))
    } finally {
      setLoadingGroups(prev => ({ ...prev, [thesisId]: false }))
    }
  }, [groupsData, loadingGroups])
  const handleConfirmDelete = useCallback(async () => {
    if (!onDeleteCouncil) return

    setIsDeleting(true)
    try {
      await onDeleteCouncil(row.id)
      handleCloseDeleteDialog()
      // Show success message
      toast.success('Hội đồng đã được xóa thành công!')
    } finally {
      setIsDeleting(false)
    }
  }, [row.id, onDeleteCouncil, handleCloseDeleteDialog])

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

        <TableCell>{row.name}</TableCell>

        <TableCell align='center'>{fDateTime(row.meeting_time)}</TableCell>

        <TableCell align='center'>{row.location}</TableCell>

        <TableCell align='center'>
          <Label color='primary'>{row.theses.length}</Label>
          {row.theses.length > 0 && (
            <IconButton color='primary' onClick={handleOpenDialog}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          )}
        </TableCell>
        <TableCell align='center'>
          <Label color='primary'>{row.members.length}</Label>
          {row.members.length > 0 && (
            <IconButton color='primary' onClick={handleOpenMembersDialog}>
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          )}
        </TableCell>

        <TableCell align='center'>
          <Label color={getColorByMajor(row.major.name)}>{row.major.name}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>      <Popover
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
            Xem chi tiết
          </MenuItem>

          {onDeleteCouncil && (
            <MenuItem
              onClick={handleOpenDeleteDialog}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Xóa hội đồng
            </MenuItem>
          )}
        </MenuList>
      </Popover>      <Dialog
        fullWidth
        maxWidth="xl"
        onClose={handleCloseDialog}
        aria-labelledby="theses-dialog-title"
        open={openDialog}
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            overflow: 'hidden'
          }
        }}
      >        <DialogTitle
          sx={{
            background: 'linear-gradient(135deg, #73BAFB 0%, #1877F2 100%)',
            color: 'white',
            p: 3,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
          id="theses-dialog-title"
        >
          <Iconify icon="solar:document-text-bold" width={28} />
          <div>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              Danh sách đề tài
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Tổng cộng {row.theses.length} đề tài trong hội đồng
            </Typography>
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)'
            },
            zIndex: 1
          }}
        >
          <Iconify icon='mingcute:close-line' />
        </IconButton>
        <DialogContent sx={{ p: 0, backgroundColor: '#fafafa' }}>
          <Scrollbar>
            <div style={{ padding: '24px' }}>
              {row.theses.map((thesis, index) => (
                <div
                  key={thesis.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: index < row.theses.length - 1 ? '16px' : 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  {/* Header */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>                      <div style={{
                      background: 'linear-gradient(135deg, #73BAFB 0%, #1877F2 100%)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      minWidth: 'fit-content'
                    }}>
                        #{index + 1}
                    </div>
                    <Label
                      color="info"
                      sx={{
                        borderRadius: '8px',
                        fontWeight: 500,
                        px: 1.5,
                        py: 0.5
                      }}
                    >
                      {thesis.name_thesis_type}
                    </Label>
                    </div>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: '#1a1a1a',
                        lineHeight: 1.4,
                        mb: 1
                      }}
                    >
                      {thesis.title}
                    </Typography>
                  </div>

                  {/* Content Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px'
                  }}>                    {/* Instructors */}
                    <div style={{
                      background: '#f8f9ff',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #e8ebf7'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <Iconify icon="solar:users-group-rounded-bold" width={20} color="#1877F2" />
                        <Typography variant="subtitle2" sx={{ ml: 1, fontWeight: 600, color: '#1877F2' }}>
                          Giảng viên hướng dẫn
                        </Typography>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {thesis.instructors.map((instructor, idx) => (
                          <div key={instructor.lecturer_code || idx} style={{
                            background: 'white',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #e0e4e7'
                          }}>
                            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                              {instructor.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              {instructor.lecturer_code}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Student Group */}
                    <div style={{
                      background: '#fff8f0',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #ffe4cc'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <Iconify icon="solar:users-group-rounded-bold" width={20} color="#ff9800" />
                        <Typography variant="subtitle2" sx={{ ml: 1, fontWeight: 600, color: '#ff9800' }}>
                          Nhóm sinh viên
                        </Typography>
                      </div>
                      <GroupInfoCell
                        thesisId={thesis.id}
                        groupData={groupsData[thesis.id]}
                        isLoading={loadingGroups[thesis.id]}
                        onFetchGroup={fetchGroupInfo}
                      />
                    </div>                    {/* Timeline */}
                    <div style={{
                      background: '#f0f8ff',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #d0ecfe'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <Iconify icon="solar:calendar-bold" width={20} color="#1877F2" />
                        <Typography variant="subtitle2" sx={{ ml: 1, fontWeight: 600, color: '#1877F2' }}>
                          Thời gian thực hiện
                        </Typography>
                      </div>                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{
                          background: 'white',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #d0ecfe'
                        }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                            Bắt đầu
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                            {fDateTime(thesis.start_date)}
                          </Typography>
                        </div>
                        <div style={{
                          background: 'white',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #d0ecfe'
                        }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                            Kết thúc
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1a1a1a' }}>
                            {fDateTime(thesis.end_date)}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Scrollbar>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="md"
        onClose={handleCloseMembersDialog}
        aria-labelledby="members-dialog-title"
        open={openMembersDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="members-dialog-title">
          Danh sách giảng viên
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseMembersDialog}
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
              <Table sx={{ minWidth: 500 }}><TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 150 }}>
                    <strong>Họ và tên</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 120 }}>
                    <strong>Mã giảng viên</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 150 }}>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 180 }}>
                    <strong>Vai trò</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.members.map((member) => (
                  <TableRow key={member.member_id} hover>
                    <TableCell sx={{ minWidth: 150 }}>
                      <strong>{member.name}</strong>
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 120 }}>
                      <Label color="info">{member.lecturer_code}</Label>
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 150 }}>
                      {member.email}
                    </TableCell>
                    <TableCell align="center" sx={{ minWidth: 180 }}>
                      <Label
                        color={
                          member.role === 1 ? 'error' :
                            member.role === 2 ? 'warning' : 'success'
                        }
                      >
                        {member.role_name}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Xác nhận xóa hội đồng
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa hội đồng &quot;{row.name}&quot;? Hành động này không thể hoàn tác.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            variant="outlined"
            disabled={isDeleting}
          >
            Hủy
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
            startIcon={isDeleting ? <CircularProgress size={16} /> : <Iconify icon="solar:trash-bin-trash-bold" />}
          >
            {isDeleting ? 'Đang xóa...' : 'Xóa hội đồng'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

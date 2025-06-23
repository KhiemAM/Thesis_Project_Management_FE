import { useState, useCallback } from 'react'

import Table from '@mui/material/Table'
import Dialog from '@mui/material/Dialog'
import Popover from '@mui/material/Popover'
import Checkbox from '@mui/material/Checkbox'
import MenuList from '@mui/material/MenuList'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TableContainer from '@mui/material/TableContainer'
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { fDateTime } from 'src/utils/format-time'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import { useTable } from './view'
import { getColorByStatus } from './utils'
import { AnnounceTopicTableRow } from './announce-topic-table-row'
import { TopicProposalTableHead } from './topic-proposal-table-head'

import type { Council } from './types'


// ----------------------------------------------------------------------

type CommitteeTableRowProps = {
  row: Council;
  selected: boolean;
  onSelectRow: () => void;
};

export function CommitteeTableRow({ row, selected, onSelectRow }: CommitteeTableRowProps) {
  const table = useTable()
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

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

  const groups = [
    {
      thesis: 'Xây dựng website cung cấp các dụng cụ làm bánh',
      advisor: 'Mạnh Thiên Lý',
      members: [
        { stt: 1, id: '2001206954', name: 'Nguyễn Quang Trung' },
        { stt: 2, id: '2001207081', name: 'Lê Bảo Thiên Trân' },
        { stt: 3, id: '2001207349', name: 'Nguyễn Thị Ngọc Sương' }
      ]
    },
    {
      thesis: 'Xây dựng website cung cấp dịch vụ giúp việc nhà',
      advisor: 'Mạnh Thiên Lý',
      members: [
        { stt: 4, id: '2001206914', name: 'Nguyễn Quan Vinh' },
        { stt: 5, id: '2001206904', name: 'Đặng Ngọc Thảo' },
        { stt: 6, id: '2001202142', name: 'Hoàng Minh Long' }
      ]
    },
    {
      thesis: 'Nghiên cứu thuật toán khai thác tập hữu ích cao chéo...',
      advisor: 'Vũ Văn Vinh',
      members: [
        { stt: 7, id: '2001200553', name: 'Phạm Tấn Thuận' }
      ]
    },
    {
      thesis: 'Xây dựng ứng dụng quản lý chuỗi nhà hàng Xiên Khè',
      advisor: 'Trần Trương Tuấn Phát',
      members: [
        { stt: 10, id: '2001207033', name: 'Trần Văn Đạt' }
      ]
    },
    {
      thesis: 'Xây dựng ứng dụng quản lý sản xuất dược phẩm tại xí nghiệp dược GMP',
      advisor: 'Nguyễn Phương Hạc',
      members: [
        { stt: 13, id: '2001207025', name: 'Nguyễn Đức Phát' }
      ]
    }
  ]

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
        </TableCell>

        <TableCell align='center'>
          <Label color={getColorByStatus(row.major.name)}>{row.major.name}</Label>
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
            onClick={() => { handleClosePopover() }}
            sx={{ color: 'primary.main' }}
          >
            <Iconify icon="solar:pen-bold" />
            Xem chi tiết
          </MenuItem>
        </MenuList>
      </Popover>

      <Dialog
        fullWidth
        maxWidth="lg"
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Danh sách đề tài
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
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
              <Table sx={{ minWidth: 800 }}>
                <TopicProposalTableHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={row.theses.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      row.theses.map((topic) => topic.id)
                    )
                  }
                  headLabel={[
                    { id: 'name', label: 'Tên hội đồng', minWidth: 300 },
                    { id: 'meeting_time', label: 'Thời gian', minWidth: 200, align: 'center' },
                    { id: 'location', label: 'Địa điểm', minWidth: 200, align: 'center' },
                    { id: 'quantityTopic', label: 'Số lượng đề tài', align: 'center', minWidth: 150 },
                    { id: 'quantityTeacher', label: 'Số lượng giảng viên', align: 'center', minWidth: 250 },
                    { id: 'major', label: 'Chuyên ngành', align: 'center', minWidth: 200 },
                    { id: '' }
                  ]}
                />
                <TableBody>
                  {/* <AnnounceTopicTableRow
                    key={row.id}
                    row={row.theses}
                    selected={table.selected.includes(row.id)}
                    onSelectRow={() => table.onSelectRow(row.id)}
                  /> */}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </DialogContent>
      </Dialog>
    </>
  )
}

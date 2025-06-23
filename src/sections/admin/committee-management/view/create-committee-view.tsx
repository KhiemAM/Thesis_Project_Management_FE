import type { Dayjs } from 'dayjs'
import type { ChipsFilter } from 'src/components/chip/types'

import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Table, Dialog, TableBody, IconButton, DialogTitle, DialogContent, TableContainer } from '@mui/material'

import { FIELD_REQUIRED_MESSAGE } from 'src/utils/validator'

import userApi from 'src/axios/user'
import thesesApi from 'src/axios/theses'
import { useLoading } from 'src/context'
import councilApi from 'src/axios/council'
import { DashboardContent } from 'src/layouts/dashboard'
import { TopicStatusText } from 'src/constants/topic-status'

import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { SingleSelectTextField } from 'src/components/select/single-select-text-field'

import { TableNoData } from '../table-no-data'
import { useTable } from './list-committee-view'
import { TableEmptyRows } from '../table-empty-rows'
import { AnnounceTopicTableRow } from '../announce-topic-table-row'
import { emptyRows, getComparator, applyFilterTopic } from '../utils'
import { TopicProposalTableHead } from '../topic-proposal-table-head'
import { AnnounceTopicTableToolbar } from '../announce-topic-table-toolbar'

import type { Batch } from '../types'
import type { AnnounceTopicProps } from '../announce-topic-table-row'

// ----------------------------------------------------------------------
const _roles = [
  {
    id: 1,
    name: 'Chủ tịch Hội đồng'
  },
  {
    id: 2,
    name: 'Uỷ viên - Thư ký'
  },
  {
    id: 3,
    name: 'Uỷ viên'
  }
]
// ----------------------------------------------------------------------

interface IFormInputCreateFunction {
  name: string;
  meeting_time: string;
  location: string;
  major_id: string;
  thesis_ids: string[];
}

interface Member {
  id: string;
  member_id: string;
  role: string;
}

export function CreateCommitteeView() {
  const id = uuidv4()
  const table = useTable()
  const { setIsLoading } = useLoading()
  const { register, handleSubmit, formState: { errors }, control } = useForm<IFormInputCreateFunction>()
  const [major, setMajor] = useState<{ value: string; label: string }[]>([])
  const [_topic, setTopic] = useState<AnnounceTopicProps[]>([])
  const [_topicDialog, setTopicDialog] = useState<AnnounceTopicProps[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [sortBy, setSortBy] = useState('Tất cả')
  const [instructor, setInstructor] = useState<string[]>([])
  const [filterInstructor, setFilterInstructor] = useState<string[]>([])
  const [batches, setBatches] = useState<Batch[]>([])
  const [members, setMembers] = useState<Member[]>([
    { id: uuidv4(), member_id: '', role: '' },
    { id: uuidv4(), member_id: '', role: '' },
    { id: uuidv4(), member_id: '', role: '' }
  ])
  const [userLecturers, setUserLecturers] = useState([])
  const [chipsFilter, setChipsFilter] = useState<ChipsFilter>({
    filterSearch: {
      display: 'Tìm kiếm',
      data: []
    },
    filterTab: [
      {
        display: 'Loại đề tài',
        data: []
      },
      {
        display: 'Trạng thái',
        data: []
      }
    ],
    filterSelect: {
      display: 'Giáo viên hướng dẫn',
      data: []
    }
  })

  const fetchMajor = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await thesesApi.getAllMajor()
      setMajor(res.data)
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

  const fetchTheses = useCallback(async () => {
    try {
      setIsLoading(true)
      let res
      if (sortBy === 'Tất cả') {
        res = await thesesApi.getAllTheses()
      } else {
        res = await thesesApi.getTheseByBatchId(sortBy)
      }
      setTopicDialog(
        res.data.filter(
          (topic: AnnounceTopicProps) => [TopicStatusText[5]].includes(topic.status) && !topic.committee_id
        )
      )
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, sortBy])

  const fetchUserLecturers = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await userApi.getUserLectures()
      setInstructor(res.data.map((item: any) => `${item.last_name} ${item.first_name}`))
      setUserLecturers(res.data.map((item: { first_name: string, last_name: string, title: string }) => ({
        ...item,
        full_name: `${item.title}. ${item.last_name} ${item.first_name}`
      })))
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  useEffect(() => {
    fetchMajor()
    fetchTheses()
    fetchUserLecturers()
  }, [fetchMajor, fetchTheses, fetchUserLecturers])

  const dataFiltered: AnnounceTopicProps[] = applyFilterTopic({
    inputData: _topicDialog,
    comparator: getComparator(table.order, table.orderBy),
    filter: chipsFilter
  })

  const notFound = !dataFiltered.length && !!filterName

  const handleOpenDialog = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

  const handleFilterName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setChipsFilter((pvev) => ({
      ...pvev,
      filterSearch: {
        ...pvev.filterSearch,
        data: event.target.value ? [{ key: id, label: event.target.value }] : []
      }
    }))

    setFilterName(event.target.value)
    table.onResetPage()
  }, [id, table])

  const handleFilterInstructor = useCallback((newValue: string[]) => {
    setChipsFilter((pvev) => ({
      ...pvev,
      filterSelect: {
        ...pvev.filterSelect,
        data: newValue.map((item, index) => ({ key: id + index, label: item }))
      }
    }))
    setFilterInstructor(newValue)
  }
  , [id])
  const handleSelectTopic = useCallback(() => {
    const selectedTopics = _topicDialog.filter((topic) => table.selected.includes(topic.id))
    setTopic((prev) => [...prev, ...selectedTopics])
    setTopicDialog((prev) => prev.filter((topic) => !table.selected.includes(topic.id)))
    table.onSelectAllRows(false, [])
    setOpenDialog(false)
  }, [_topicDialog, setTopic, setOpenDialog, table])

  const handleAddMember = useCallback(() => {
    setMembers((prev) => [...prev, { id: uuidv4(), member_id: '', role: '' }])
  }, [])
  const handleRemoveMember = useCallback((memberId: string) => {
    if (members.length <= 3) {
      toast.warning('Hội đồng phải có ít nhất 3 thành viên!')
      return
    }
    setMembers((prev) => prev.filter((member) => member.id !== memberId))
  }, [members.length])

  const handleMemberChange = useCallback((memberId: string, field: 'member_id' | 'role', value: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === memberId ? { ...member, [field]: value } : member
      )
    )
  }, [])
  const handleCreateCommittee = useCallback(async (data: IFormInputCreateFunction) => {
    try {
      setIsLoading(true)
      const membersData = members
        .filter((member) => member.member_id && member.role)
        .map((member) => ({
          member_id: member.member_id,
          role: parseInt(member.role)
        }))

      // Kiểm tra số lượng thành viên
      if (membersData.length < 3) {
        toast.error('Hội đồng phải có ít nhất 3 thành viên!')
        return
      }

      const payload = {
        name: data.name,
        meeting_time: dayjs(data.meeting_time).format('YYYY-MM-DD HH:mm:ss'),
        location: data.location,
        major_id: data.major_id,
        thesis_ids: _topic.map((topic) => topic.id),
        members: membersData,
        note: ''
      }
      await councilApi.createCouncil(payload)
      toast.success('Lập hội đồng thành công!')
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, _topic, members])

  return (
    <form onSubmit={handleSubmit(handleCreateCommittee)}>
      <DashboardContent>
        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Lập hội đồng
          </Typography>
        </Box>

        <Scrollbar>
          <Card sx={{ width: { sm: '100%', md: '60%' }, mx: { sm: 'none', md: 'auto' } }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
              <TextField
                fullWidth
                label="Tên hội đồng *"
                error={!!errors['name']}
                sx={{ mb: 3 }}
                {...register('name', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['name'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['name']?.message)}</Alert>
              )}

              <Controller
                name="meeting_time"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi'>
                    <DateTimePicker
                      label="Thời gian *"
                      dayOfWeekFormatter={(weekday) => `${(weekday as Dayjs).format('dd')}`}
                      enableAccessibleFieldDOMStructure={false}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          variant: 'outlined',
                          error: !!errors['meeting_time'],
                          slotProps: {
                            inputLabel: { shrink: true }
                          }
                        }
                      }}
                      sx={{ mb: 3 }}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors['meeting_time'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['meeting_time']?.message)}</Alert>
              )}

              <TextField
                fullWidth
                label="Địa điểm *"
                error={!!errors['location']}
                sx={{ mb: 3 }}
                {...register('location', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              {errors['location'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['location']?.message)}</Alert>
              )}

              <Controller
                name="major_id"
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                control={control}
                render={({ field }) => (
                  <SingleSelectTextField
                    data={major}
                    columns={[
                      { key: 'name', label: 'Chuyên ngành' }
                    ]}
                    valueKey='id'
                    displayKey='name'
                    inputLabel='Chuyên ngành *'
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors['major_id']}
                  />
                )}
              />
              {errors['major_id'] && (
                <Alert severity="error" sx={{ mb: 3 }}>{String(errors['major_id']?.message)}</Alert>
              )}
            </Box>
          </Card>

          <Card sx={{ width: { sm: '100%', md: '100%' }, mx: { sm: 'none', md: 'auto' }, mt: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
              <Button
                fullWidth
                size="large"
                variant="outlined"
                onClick={handleOpenDialog}
                sx={{
                  width: { sm: '100%', md: '15%' },
                  ml: { sm: 'none', md: 'auto' },
                  mb: 3
                }}
              >
                Chọn đề tài
              </Button>

              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table sx={{ minWidth: 800 }}>
                    <TopicProposalTableHead
                      order={table.order}
                      orderBy={table.orderBy}
                      rowCount={_topic.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          _topic.map((topic) => topic.id)
                        )
                      }
                      headLabel={[
                        { id: 'name', label: 'Tên đề tài', minWidth: 350 },
                        { id: 'status', label: 'Trạng thái', align: 'center', minWidth: 150 },
                        { id: 'instructors', label: 'Giáo viên hướng dẫn', minWidth: 200 },
                        { id: 'email', label: 'Email', minWidth: 300 },
                        { id: 'reviewers', label: 'Giáo viên phản biện', minWidth: 200 },
                        { id: 'department_name', label: 'Bộ môn', align: 'center', minWidth: 150 },
                        { id: 'name_thesis_type', label: 'Loại đề tài', align: 'center', minWidth: 150 },
                        { id: '', label: 'Thao tác', alight: 'center', minWidth: 100 }
                      ]}
                    />
                    <TableBody>
                      {_topic
                        .map((row) => (
                          <AnnounceTopicTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                          />
                        ))}

                      <TableEmptyRows
                        height={68}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, _topic.length)}
                      />

                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Box>
          </Card>

          <Card sx={{ width: { sm: '100%', md: '100%' }, mx: { sm: 'none', md: 'auto' }, mt: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6">
                    Thành viên hội đồng
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Số lượng thành viên: {members.filter(m => m.member_id && m.role).length} / {members.length} (Tối thiểu: 3)
                  </Typography>
                </Box>
                <Button
                  size="large"
                  variant="outlined"
                  onClick={handleAddMember}
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  Thêm thành viên
                </Button>
              </Box>

              {members.map((member, index) => (
                <Box key={member.id} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2">
                      Thành viên {index + 1}
                    </Typography>
                    {members.length > 3 && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <SingleSelectTextField
                        data={userLecturers}
                        columns={[
                          { key: 'user_name', label: 'Tên tài khoản' },
                          { key: 'full_name', label: 'Tên giảng viên' }
                        ]}
                        valueKey='id'
                        displayKey='full_name'
                        inputLabel='Giảng viên *'
                        value={member.member_id}
                        onChange={(value) => handleMemberChange(member.id, 'member_id', value)}
                      />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <SingleSelectTextField
                        data={_roles}
                        columns={[
                          { key: 'name', label: 'Vai trò' }
                        ]}
                        valueKey='id'
                        displayKey='name'
                        inputLabel='Vai trò *'
                        value={member.role}
                        onChange={(value) => handleMemberChange(member.id, 'role', value)}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}

              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                sx={{
                  width: { sm: '100%', md: '30%' },
                  ml: { sm: 'none', md: 'auto' },
                  mt: 3
                }}
              >
                Lập hội đồng
              </Button>
            </Box>
          </Card>

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
              sx={(muiTheme) => ({
                position: 'absolute',
                right: 8,
                top: 8,
                color: muiTheme.palette.grey[500]
              })}
            >
              <Iconify icon='mingcute:close-line' />
            </IconButton>
            <DialogContent dividers>
              <AnnounceTopicTableToolbar
                numSelected={table.selected.length}
                filterName={filterName}
                onFilterName={handleFilterName}
                valueMultipleSelect={instructor}
                filterInstructor={filterInstructor}
                onFilterInstructor={handleFilterInstructor}
                sortBy={sortBy}
                onSort={setSortBy}
                option={batches}
                onSelectTopic={handleSelectTopic}
              />

              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table sx={{ minWidth: 800 }}>
                    <TopicProposalTableHead
                      order={table.order}
                      orderBy={table.orderBy}
                      rowCount={_topicDialog.length}
                      numSelected={table.selected.length}
                      onSort={table.onSort}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          _topicDialog.map((topic) => topic.id)
                        )
                      }
                      headLabel={[
                        { id: 'name', label: 'Tên đề tài', minWidth: 350 },
                        { id: 'status', label: 'Trạng thái', align: 'center', minWidth: 150 },
                        { id: 'instructors', label: 'Giáo viên hướng dẫn', minWidth: 200 },
                        { id: 'email', label: 'Email', minWidth: 300 },
                        { id: 'reviewers', label: 'Giáo viên phản biện', minWidth: 200 },
                        { id: 'department_name', label: 'Bộ môn', align: 'center', minWidth: 150 },
                        { id: 'name_thesis_type', label: 'Loại đề tài', align: 'center', minWidth: 150 },
                        { id: '', label: 'Thao tác', alight: 'center', minWidth: 100 }
                      ]}
                    />
                    <TableBody>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
                          <AnnounceTopicTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                          />
                        ))}

                      <TableEmptyRows
                        height={68}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, _topic.length)}
                      />

                      {notFound && <TableNoData searchQuery={filterName} />}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </DialogContent>
          </Dialog>
        </Scrollbar>
      </DashboardContent>
    </form>
  )
}

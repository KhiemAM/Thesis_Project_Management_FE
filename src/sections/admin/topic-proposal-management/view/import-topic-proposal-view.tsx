import type { ChipsFilter } from 'src/components/chip/types'

import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import userApi from 'src/axios/user'
import { useLoading } from 'src/context'
import thesesApi from 'src/axios/theses'
import { DashboardContent } from 'src/layouts/student'

import { Iconify } from 'src/components/iconify'
import ChipsArrayFilter from 'src/components/chip'
import { Scrollbar } from 'src/components/scrollbar'

import { TableNoData } from '../table-no-data'
import { TableEmptyRows } from '../table-empty-rows'
import { TopicTabsFilter } from '../topic-tabs-filter'
import { UserTableToolbar } from '../user-table-toolbar'
import { UserTableHead } from '../topic-proposal-table-head'
import { emptyRows, applyFilter, getComparator } from '../utils'
import { TopicProposalTableRow } from '../topic-proposal-table-row'
import { TopicProposalTabsStatusFilter } from '../topic-proposal-tabs-status-filter'

import type { Batch } from '../types'
import type { TopicProps } from '../topic-proposal-table-row'

// ----------------------------------------------------------------------
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})
// ----------------------------------------------------------------------

export function ImportTopicProposalView() {
  const { setIsLoading } = useLoading()
  const table = useTable()
  const id = uuidv4()
  const [filterName, setFilterName] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('Tất cả')
  const [filterStatus, setFilterStatus] = useState('Tất cả')
  const [filterInstructor, setFilterInstructor] = useState<string[]>([])
  const [_topic, setTopic] = useState<TopicProps[]>([])
  const [instructor, setInstructor] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Tất cả')
  const [batches, setBatches] = useState<Batch[]>([])
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

  const fetchUserLecturers = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await userApi.getUserLectures()
      setInstructor(res.data.map((item: any) => `${item.last_name} ${item.first_name}`))
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  const fetchAcademy = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await thesesApi.getAllBatches()
      setBatches(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  useEffect(() => {
    fetchUserLecturers()
    fetchAcademy()
  }, [fetchUserLecturers, fetchAcademy])

  const dataFiltered: TopicProps[] = applyFilter({
    inputData: _topic,
    comparator: getComparator(table.order, table.orderBy),
    filter: chipsFilter
  })

  const notFound = !dataFiltered.length && !!filterName

  const handleClearFilter = useCallback(() => {
    setChipsFilter({
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
    setFilterName('')
    setFilterDepartment('Tất cả')
    setFilterStatus('Tất cả')
    setFilterInstructor([])
  }, [])

  const handleDeleteChipData = useCallback((newChipsFilter: ChipsFilter) => {
    setChipsFilter(newChipsFilter)
    Object.keys(newChipsFilter).forEach((key) => {
      const section = newChipsFilter[key as keyof ChipsFilter]

      // Xử lý cho filterSearch
      if (key === 'filterSearch' && section && 'data' in section && Array.isArray(section.data) && section.data.length === 0) {
        setFilterName('')
      }

      // Xử lý cho filterTab
      if (key === 'filterTab' && Array.isArray(section)) {
        section.forEach((item) => {
          if (Array.isArray(item.data) && item.data.length === 0) {
            if (item.display === 'Loại đề tài') {
              setFilterDepartment('Tất cả')
            }
            if (item.display === 'Trạng thái') {
              setFilterStatus('Tất cả')
            }
          }
        })
      }

      // Xử lý cho filterSelect
      if (key === 'filterSelect' && section && 'data' in section && Array.isArray(section.data)) {
        setFilterInstructor(section.data.map((item) => item.label))
      }
    })
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

  const handleFilterDepartment = useCallback((newValue: string) => {
    setChipsFilter((prev) => {
      const updatedFilterTab = prev.filterTab.map((item) =>
        item.display === 'Loại đề tài'
          ? { ...item, data: newValue !== 'Tất cả' ? [{ key: id, label: newValue }] : [] }
          : item
      )

      return { ...prev, filterTab: updatedFilterTab }
    })
    setFilterDepartment(newValue)
  }, [id])

  const handleFilterStatus = useCallback((newValue: string) => {
    setChipsFilter((prev) => {
      const updatedFilterTab = prev.filterTab.map((item) =>
        item.display === 'Trạng thái'
          ? { ...item, data: newValue !== 'Tất cả' ? [{ key: id, label: newValue }] : [] }
          : item
      )

      return { ...prev, filterTab: updatedFilterTab }
    })
    setFilterStatus(newValue)
  }, [id])

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

  const handleDowloadTemplate = useCallback(async() => {
    try {
      setIsLoading(true)
      const res = await thesesApi.downloadTemplate()

      // Kiểm tra response
      if (!res.data) {
        toast.error('Không có dữ liệu file để tải xuống!')
        return
      }

      // Tạo blob với content type cho Excel
      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'File mẫu import đề tài.xlsx' // Đặt tên file rõ ràng
      link.style.display = 'none' // Ẩn link

      document.body.appendChild(link)
      link.click()

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      }, 100)

      toast.success('Tải file mẫu thành công!')
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  const handleUploadFile = useCallback(async (file: File) => {
    try {
      setIsLoading(true)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('status', '1')

      const response = await thesesApi.uploadTemplate(formData)

      const result = response.data
      if (!result) {
        toast.error('Có lỗi xảy ra: Không nhận được phản hồi từ server.')
        return
      }
      setTopic(result.imported_theses)
      toast.success('Upload file thành công!')
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])


  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Import đề xuất đề tài
        </Typography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<Iconify icon="solar:upload-minimalistic-bold" />}
          onClick={() => {}}
        >
          Upload đề tài
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleUploadFile(event.target.files?.[0] as File)}
          />
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<Iconify icon="solar:download-minimalistic-bold" />}
          onClick={handleDowloadTemplate}
          sx={{ ml: 2 }}
        >
          Tải file excel mẫu
        </Button>
      </Box>

      <Card>
        <TopicTabsFilter data={_topic} value={filterDepartment} setValue={handleFilterDepartment}/>

        <TopicProposalTabsStatusFilter data={_topic} value={filterStatus} setValue={handleFilterStatus}/>

        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={handleFilterName}
          valueMultipleSelect={instructor}
          filterInstructor={filterInstructor}
          onFilterInstructor={handleFilterInstructor}
          sortBy={sortBy}
          onSort={setSortBy}
          option={batches}
        />

        <ChipsArrayFilter chipData={chipsFilter} handleDeleteChipData={handleDeleteChipData} handleClearFilter={handleClearFilter}/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
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
                  { id: 'email', label: 'Email giáo viên hướng dẫn', minWidth: 300 },
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
                    <TopicProposalTableRow
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

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

function useTable() {
  const [page, setPage] = useState(0)
  const [orderBy, setOrderBy] = useState('topicNumber')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selected, setSelected] = useState<string[]>([])
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    },
    [order, orderBy]
  )

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }, [])

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue]

      setSelected(newSelected)
    },
    [selected]
  )

  const onResetPage = useCallback(() => {
    setPage(0)
  }, [])

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      onResetPage()
    },
    [onResetPage]
  )

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage
  }
}

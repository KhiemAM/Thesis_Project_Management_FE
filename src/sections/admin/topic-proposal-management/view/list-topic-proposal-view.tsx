import type { ChipsFilter } from 'src/components/chip/types'

import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { RouterLink } from 'src/routes/components'

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

export function ListTopicProposalView() {
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

  const fetchTheses = useCallback(async () => {
    try {
      setIsLoading(true)
      let res
      if (sortBy === 'Tất cả') {
        res = await thesesApi.getAllTheses()
      } else {
        res = await thesesApi.getTheseByBatchId(sortBy)
      }
      setTopic(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, sortBy])

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
    fetchTheses()
    fetchAcademy()
  }, [fetchTheses, fetchUserLecturers, fetchAcademy])

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
          Danh sách đề xuất đề tài
        </Typography>
        <Button
          component={RouterLink}
          href='/topic-proposal/create'
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Lập đề xuất đề tài
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
                  { id: 'major', label: 'Chuyên ngành', align: 'center', minWidth: 200 },
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
                      onRefresh={fetchTheses}
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

export function useTable() {
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

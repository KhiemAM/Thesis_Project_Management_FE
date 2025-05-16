import type { ChipsFilter } from 'src/components/chip/types'

import { v4 as uuidv4 } from 'uuid'
import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { _topic, _instructor } from 'src/_mock'
import { DashboardContent } from 'src/layouts/student'

import ChipsArrayFilter from 'src/components/chip'
import { Scrollbar } from 'src/components/scrollbar'

import { TableNoData } from '../table-no-data'
import { TopicTableRow } from '../topic-table-row'
import { UserTableHead } from '../user-table-head'
import { TableEmptyRows } from '../table-empty-rows'
import { TopicTabsFilter } from '../topic-tabs-filter'
import { UserTableToolbar } from '../user-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'
import { TopicProposalTabsStatusFilter } from '../topic-proposal-tabs-status-filter'

import type { TopicProps } from '../topic-table-row'

// ----------------------------------------------------------------------
const getUniqueInstructors = (): string[] => {
  const uniqueInstructors = new Set<string>()
  for (let i = 0; i < 24; i++) {
    uniqueInstructors.add(_instructor(i))
  }
  return Array.from(uniqueInstructors)
}

export function ListTopicProposalView() {
  const table = useTable()
  const id = uuidv4()
  const [filterName, setFilterName] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('Tất cả')
  const [filterStatus, setFilterStatus] = useState('Tất cả')
  const [filterInstructor, setFilterInstructor] = useState<string[]>([])
  const [chipsFilter, setChipsFilter] = useState<ChipsFilter>({
    filterSearch: {
      display: 'Tìm kiếm',
      data: []
    },
    filterTab: [
      {
        display: 'Bộ môn',
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
          display: 'Bộ môn',
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
            if (item.display === 'Bộ môn') {
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
        item.display === 'Bộ môn'
          ? { ...item, data: newValue ? [{ key: id, label: newValue }] : [] }
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
          ? { ...item, data: newValue ? [{ key: id, label: newValue }] : [] }
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
          Chọn đề tài
        </Typography>
      </Box>

      <Card>
        <TopicTabsFilter value={filterDepartment} setValue={handleFilterDepartment}/>

        <TopicProposalTabsStatusFilter value={filterStatus} setValue={handleFilterStatus}/>

        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={handleFilterName}
          valueMultipleSelect={getUniqueInstructors()}
          filterInstructor={filterInstructor}
          onFilterInstructor={handleFilterInstructor}
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
                  { id: 'topicNumber', label: 'STT đề tài', minWidth: 130 },
                  { id: 'status', label: 'Trạng thái', align: 'center', minWidth: 150 },
                  { id: 'name', label: 'Tên đề tài', minWidth: 350 },
                  { id: 'instructor', label: 'Giáo viên hướng dẫn', minWidth: 200 },
                  { id: 'email', label: 'Email', minWidth: 300 },
                  { id: 'department', label: 'Bộ môn', align: 'center', minWidth: 150 },
                  { id: '' }
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <TopicTableRow
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
          count={_topic.length}
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

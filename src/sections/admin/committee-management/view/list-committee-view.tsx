import type { ChipsFilter } from 'src/components/chip/types'

import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { useLoading } from 'src/context'
import councilApi from 'src/axios/council'
import { _committee, _instructor } from 'src/_mock'
import { DashboardContent } from 'src/layouts/student'

import ChipsArrayFilter from 'src/components/chip'
import { Scrollbar } from 'src/components/scrollbar'

import { TableNoData } from '../table-no-data'
import { TableEmptyRows } from '../table-empty-rows'
import { UserTableHead } from '../committee-table-head'
import { UserTableToolbar } from '../user-table-toolbar'
import { CommitteeTableRow } from '../committee-table-row'
import { emptyRows, applyFilter, getComparator } from '../utils'
import { CommitteeTabsStatusFilter } from '../committee-tabs-status-filter'

import type { Council } from '../types'

// ----------------------------------------------------------------------
const getUniqueInstructors = (): string[] => {
  const uniqueInstructors = new Set<string>()
  for (let i = 0; i < 24; i++) {
    uniqueInstructors.add(_instructor(i))
  }
  return Array.from(uniqueInstructors)
}

export function ListCommitteeView() {
  const table = useTable()
  const id = uuidv4()
  const { setIsLoading } = useLoading()
  const [filterName, setFilterName] = useState('')
  const [filterMajor, setFilterMajor] = useState('Tất cả')
  const [filterInstructor, setFilterInstructor] = useState<string[]>([])
  const [chipsFilter, setChipsFilter] = useState<ChipsFilter>({
    filterSearch: {
      display: 'Tìm kiếm',
      data: []
    },
    filterTab: [
      {
        display: 'Chuyên ngành',
        data: []
      }
    ],
    filterSelect: {
      display: 'Giáo viên hướng dẫn',
      data: []
    }
  })
  const [council, setCouncil] = useState<Council[]>([])

  const fetchCommittee = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await councilApi.getCouncils()
      setCouncil(res.data)
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

  useEffect(() => {
    fetchCommittee()
  }, [fetchCommittee])

  const dataFiltered: Council[] = applyFilter({
    inputData: council,
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
          display: 'Chuyên ngành',
          data: []
        }
      ],
      filterSelect: {
        display: 'Giáo viên hướng dẫn',
        data: []
      }
    })
    setFilterName('')
    setFilterMajor('Tất cả')
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
            if (item.display === 'Chuyên ngành') {
              setFilterMajor('Tất cả')
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

  const handleFilterMajor = useCallback((newValue: string) => {
    setChipsFilter((prev) => {
      const updatedFilterTab = prev.filterTab.map((item) =>
        item.display === 'Chuyên ngành'
          ? { ...item, data: newValue ? [{ key: id, label: newValue }] : [] }
          : item
      )

      return { ...prev, filterTab: updatedFilterTab }
    })
    setFilterMajor(newValue)
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
          Danh sách hội đồng
        </Typography>
      </Box>

      <Card>
        <CommitteeTabsStatusFilter data={council} value={filterMajor} setValue={handleFilterMajor}/>

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
                rowCount={_committee.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _committee.map((topic) => topic.id)
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
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <CommitteeTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _committee.length)}
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

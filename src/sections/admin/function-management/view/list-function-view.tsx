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

import { _function, _instructor } from 'src/_mock'
import { DashboardContent } from 'src/layouts/student'

import ChipsArrayFilter from 'src/components/chip'
import { Scrollbar } from 'src/components/scrollbar'

import { TableNoData } from '../table-no-data'
import { TableEmptyRows } from '../table-empty-rows'
import { UserTableHead } from '../function-table-head'
import { FunctionTableRow } from '../function-table-row'
import { UserTableToolbar } from '../function-table-toolbar'
import { FunctionTabsFilter } from '../function-tabs-filter'
import { emptyRows, applyFilter, getComparator } from '../utils'

import type { FunctionProps } from '../function-table-row'

// ----------------------------------------------------------------------
const getUniqueInstructors = (): string[] => {
  const uniqueInstructors = new Set<string>()
  for (let i = 0; i < 24; i++) {
    uniqueInstructors.add(_instructor(i))
  }
  return Array.from(uniqueInstructors)
}

export function ListFunctionView() {
  const table = useTable()
  const id = uuidv4()
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState('Tất cả')
  const [filterInstructor, setFilterInstructor] = useState<string[]>([])
  const [chipsFilter, setChipsFilter] = useState<ChipsFilter>({
    filterSearch: {
      display: 'Tìm kiếm',
      data: []
    },
    filterTab: {
      display: 'Trạng thái',
      data: []
    },
    filterSelect: {
      display: 'Giáo viên hướng dẫn',
      data: []
    }
  })

  const dataFiltered: FunctionProps[] = applyFilter({
    inputData: _function,
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
      filterTab: {
        display: 'Trạng thái',
        data: []
      },
      filterSelect: {
        display: 'Giáo viên hướng dẫn',
        data: []
      }
    })
    setFilterName('')
    setFilterStatus('Tất cả')
    setFilterInstructor([])
  }, [])

  const handleDeleteChipData = useCallback((newChipsFilter: ChipsFilter) => {
    setChipsFilter(newChipsFilter)
    Object.keys(newChipsFilter).forEach((key) => {
      const section = newChipsFilter[key as keyof ChipsFilter]
      if (key === 'filterSearch' && section.data.length === 0) {
        setFilterName('')
      }
      if (key === 'filterTab' && section.data.length === 0) {
        setFilterStatus('Tất cả')
      }
      if (key === 'filterSelect') {
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

  const handleFilterStatus = useCallback((newValue: string) => {
    setChipsFilter((pvev) => ({
      ...pvev,
      filterTab: {
        ...pvev.filterTab,
        data: newValue ? [{ key: id, label: newValue }] : []
      }
    }))
    setFilterStatus(newValue)
  }, [id])

  const handleFilterPath = useCallback((newValue: string[]) => {
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
          Danh sách chức năng
        </Typography>
      </Box>

      <Card>
        <FunctionTabsFilter value={filterStatus} setValue={handleFilterStatus}/>

        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={handleFilterName}
          valueMultipleSelect={getUniqueInstructors()}
          filterInstructor={filterInstructor}
          onFilterInstructor={handleFilterPath}
        />

        <ChipsArrayFilter chipData={chipsFilter} handleDeleteChipData={handleDeleteChipData} handleClearFilter={handleClearFilter}/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_function.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _function.map((topic) => topic.id)
                  )
                }
                headLabel={[
                  { id: 'function', label: 'Chức năng', minWidth: 200 },
                  { id: 'path', label: 'Đường dẫn', minWidth: 200 },
                  { id: 'parentFunction', label: 'Chức năng cha', minWidth: 200 },
                  { id: 'type', label: 'Loại chức năng', align: 'center', minWidth: 100 },
                  { id: 'status', label: 'Trạng thái', align: 'center', minWidth: 100 },
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
                    <FunctionTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _function.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_function.length}
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
  const [orderBy, setOrderBy] = useState('function')
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

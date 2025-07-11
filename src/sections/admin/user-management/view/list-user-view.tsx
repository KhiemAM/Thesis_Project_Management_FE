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

import userApi from 'src/axios/user'
import { _usersAdmin } from 'src/_mock'
import { useLoading } from 'src/context'
import { DashboardContent } from 'src/layouts/student'

import ChipsArrayFilter from 'src/components/chip'
import { Scrollbar } from 'src/components/scrollbar'

import { TableNoData } from '../table-no-data'
import { UserTableRow } from '../user-table-row'
import { UserTableHead } from '../user-table-head'
import { TableEmptyRows } from '../table-empty-rows'
import { UserTabsFilter } from '../user-tabs-filter'
import { UserTableToolbar } from '../function-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'

import type { UserProps } from '../user-table-row'

// ----------------------------------------------------------------------

export function ListUserView() {
  const { setIsLoading } = useLoading()
  const table = useTable()
  const id = uuidv4()
  const [filterName, setFilterName] = useState('')
  const [filterStatus, setFilterStatus] = useState('Tất cả')
  const [chipsFilter, setChipsFilter] = useState<ChipsFilter>({
    filterSearch: {
      display: 'Tìm kiếm',
      data: []
    },
    filterTab: [
      {
        display: 'Trạng thái',
        data: []
      }
    ],
    filterSelect: {
      display: '',
      data: []
    }
  })
  const [_users, setUsers] = useState<UserProps[]>([])

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await userApi.getAllUser()
      setUsers(res.data)
    } finally {
      setIsLoading(false)
    }
  }
  , [setIsLoading])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const dataFiltered: UserProps[] = applyFilter({
    inputData: _users.filter((user) => String(user.user_type) !== '1'),
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
          display: 'Trạng thái',
          data: []
        }
      ],
      filterSelect: {
        display: '',
        data: []
      }
    })
    setFilterName('')
    setFilterStatus('Tất cả')
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
            if (item.display === 'Trạng thái') {
              setFilterStatus('Tất cả')
            }
          }
        })
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
          Danh sách tài khoản
        </Typography>
      </Box>

      <Card>
        <UserTabsFilter value={filterStatus} setValue={handleFilterStatus}/>

        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={handleFilterName}
        />

        <ChipsArrayFilter chipData={chipsFilter} handleDeleteChipData={handleDeleteChipData} handleClearFilter={handleClearFilter}/>

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((item) => item.id)
                  )
                }
                headLabel={[
                  { id: 'user_name', label: 'Tên tài khoản', minWidth: 300 },
                  { id: 'user_type_name', label: 'Loại tài khoản', minWidth: 200 },
                  { id: 'is_active', label: 'Trạng thái', align: 'center', minWidth: 300 },
                  { id: '', label: 'Thao tác', minWidth: 100, align: 'center' }
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onRefresh={() => {}}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
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
  const [orderBy, setOrderBy] = useState('user_name')
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

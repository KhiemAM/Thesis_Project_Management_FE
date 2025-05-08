import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { _topic } from 'src/_mock'
import { DashboardContent } from 'src/layouts/student'

import { Drawer } from 'src/components/drawer'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'

import { TableNoData } from '../table-no-data'
import { TopicTableRow } from '../topic-table-row'
import { UserTableHead } from '../user-table-head'
import { TableEmptyRows } from '../table-empty-rows'
import { TopicTabsFilter } from '../topic-tabs-filter'
import { UserTableToolbar } from '../user-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'

import type { TopicProps } from '../topic-table-row'

// ----------------------------------------------------------------------

export function TopicStudentView() {
  const table = useTable()

  const [filterName, setFilterName] = useState('')
  const [valueTab, setValueTab] = useState('ALL')
  const [openTopicDetail, setOpenTopicDetail] = useState(false)

  const onOpenTopicDetail = useCallback(() => {
    setOpenTopicDetail(true)
  }, [])

  const onCloseTopicDetail = useCallback(() => {
    setOpenTopicDetail(false)
  }, [])

  const dataFiltered: TopicProps[] = applyFilter({
    inputData: _topic,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
    filterTab: valueTab
  })

  const notFound = !dataFiltered.length && !!filterName

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
        <TopicTabsFilter value={valueTab} setValue={setValueTab}/>

        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value)
            table.onResetPage()
          }}
        />

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
                  { id: 'name', label: 'Tên đề tài', minWidth: 350 },
                  { id: 'instructor', label: 'Giáo viên hướng dẫn', minWidth: 200 },
                  { id: 'email', label: 'Email', minWidth: 300 },
                  { id: 'department', label: 'Bộ môn', align: 'center', minWidth: 100 },
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
                      onOpenTopicDetail={onOpenTopicDetail}
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

      <Drawer
        anchor="right"
        open={openTopicDetail}
        onClose={onCloseTopicDetail}
        slotProps={{
          paper: {
            sx: { width: 360, overflow: 'hidden' }
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
            Setting
          </Typography>

          <IconButton onClick={onCloseTopicDetail}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Box>

        <Divider />

        <Scrollbar>
          <></>
        </Scrollbar>
      </Drawer>
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

import type { ChipsFilter } from 'src/components/chip/types'

import { v4 as uuidv4 } from 'uuid'
import { useMemo, useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Iconify } from 'src/components/iconify'
import ChipsArrayFilter from 'src/components/chip'
import MultipleSelectFilter from 'src/components/select'

import { useTodo } from './todo-context'
import AddTodo from './progress-group-student-add-todo'
import TodoItem from './progress-group-student-todo-item'
import TodoDetails from './progress-group-student-todo-detail'
import ProgressBar from './progress-group-student-progress-bar'


const TodoList = () => {
  const id = uuidv4()
  const {
    todos,
    selectedTodo,
    setSelectedTodo,
    filterCompleted,
    setFilterCompleted
  } = useTodo()

  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filterName, setFilterName] = useState<string>('')
  const [filterPriority, setFilterPriority] = useState<string[]>([])
  const [chipsFilter, setChipsFilter] = useState<ChipsFilter>({
    filterSearch: {
      display: 'Tìm kiếm',
      data: []
    },
    filterTab: [
      {
        display: '',
        data: []
      }
    ],
    filterSelect: {
      display: 'Độ ưu tiên',
      data: []
    }
  })

  const filteredTodos = useMemo(() => todos
    .filter((todo) => {
      // Filter by completion status
      if (filterCompleted) {
        return todo.completed
      }
      return true
    })
    .filter((todo) => {
      // Filter by priority
      if (filterPriority.length > 0) {
        return filterPriority.includes(todo.priority)
      }
      return true
    })
    .filter((todo) => {
      // Filter by search term
      if (filterName) {
        return (
          todo.title.toLowerCase().includes(filterName.toLowerCase()) ||
            todo.description.toLowerCase().includes(filterName.toLowerCase())
        )
      }
      return true
    }), [todos, filterCompleted, filterPriority, filterName])

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true)
  }

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false)
  }

  const handleCloseDetails = () => {
    setSelectedTodo(null)
  }

  const handleClearFilter = useCallback(() => {
    setChipsFilter({
      filterSearch: {
        display: 'Tìm kiếm',
        data: []
      },
      filterTab: [
        {
          display: '',
          data: []
        }
      ],
      filterSelect: {
        display: 'Giáo viên hướng dẫn',
        data: []
      }
    })
    setFilterName('')
    setFilterPriority([])
  }, [])

  const handleDeleteChipData = useCallback((newChipsFilter: ChipsFilter) => {
    setChipsFilter(newChipsFilter)
    Object.keys(newChipsFilter).forEach((key) => {
      const section = newChipsFilter[key as keyof ChipsFilter]

      // Xử lý cho filterSearch
      if (key === 'filterSearch' && section && 'data' in section && Array.isArray(section.data) && section.data.length === 0) {
        setFilterName('')
      }

      // Xử lý cho filterSelect
      if (key === 'filterSelect' && section && 'data' in section && Array.isArray(section.data)) {
        setFilterPriority(section.data.map((item) => item.label))
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
  }, [id])

  const handleFilterPriority = useCallback((newValue: string[]) => {
    setChipsFilter((pvev) => ({
      ...pvev,
      filterSelect: {
        ...pvev.filterSelect,
        data: newValue.map((item, index) => ({ key: id + index, label: item }))
      }
    }))
    setFilterPriority(newValue)
  }
  , [id])

  const hasActiveFilters = filterCompleted || filterPriority.length || filterName !== ''

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          p: 3
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              color: 'primary.main'
            }}
          >
            Nhóm 01
          </Typography>

          <ProgressBar />

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, gap: 1 }}>
            <OutlinedInput
              fullWidth
              value={filterName}
              onChange={handleFilterName}
              placeholder="Tìm kiếm tên công việc..."
              startAdornment={
                <InputAdornment position="start">
                  <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
              endAdornment={
                filterName ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setFilterName('')}
                      edge="end"
                    >
                      <Iconify icon='mingcute:close-line' />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
              sx={{ width: 300, maxWidth: 320 }}
            />
            <Button
              variant={showFilters ? 'contained' : 'outlined'}
              color="primary"
              size='medium'
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<Iconify icon='ic:round-filter-list' />}
              sx={{ flexShrink: 0 }}
            >
              Bộ lọc
            </Button>
          </Box>

          <Fade in={showFilters}>
            <Box
              sx={{
                display: showFilters ? 'flex' : 'none',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2,
                mb: 3,
                borderRadius: 2
              }}
            >
              <MultipleSelectFilter inputLabel='Độ ưu tiên' valueMultipleSelect={['Thấp', 'Trung bình', 'Cao']} filterValue={filterPriority} onFilter={handleFilterPriority}/>

              <FormControlLabel
                control={
                  <Switch
                    checked={filterCompleted}
                    onChange={(e) => setFilterCompleted(e.target.checked)}
                    color="primary"
                  />
                }
                label="Completed only"
                sx={{ mx: 1 }}
              />
            </Box>
          </Fade>

          <ChipsArrayFilter chipData={chipsFilter} handleDeleteChipData={handleDeleteChipData} handleClearFilter={handleClearFilter}/>

          <Button
            variant="contained"
            color="primary"
            size='large'
            startIcon={<Iconify icon='solar:trash-bin-trash-bold' />}
            onClick={handleOpenAddDialog}
            sx={{
              display: 'flex'
            }}
          >
            Thêm công việc mới
          </Button>
        </Box>

        {filteredTodos.length > 0 ? (
          <Box>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              backgroundColor: '#f9fafb',
              borderRadius: 3
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Không tìm thấy công việc nào
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hasActiveFilters
                ? 'Vui lòng xóa bộ lọc để thấy tất cả công việc'
                : 'Thêm công việc mới để bắt đầu'}
            </Typography>
          </Box>
        )}
      </Paper>

      <AddTodo open={addDialogOpen} onClose={handleCloseAddDialog} />
      <TodoDetails open={!!selectedTodo} onClose={handleCloseDetails} />
    </>
  )
}

export default TodoList
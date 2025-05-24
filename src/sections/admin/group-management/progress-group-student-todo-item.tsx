import { motion } from 'framer-motion'
import React, { useCallback } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'

import { useTodo } from './todo-context'
import { getColorByPriority } from './utils'

import type { Todo } from './types'

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const theme = useTheme()
  const { toggleTodo, deleteTodo, setSelectedTodo } = useTodo()

  const handleToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleTodo(todo.id)
  }, [todo.id, toggleTodo])

  const handleDelete = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteTodo(todo.id)
  }, [todo.id, deleteTodo])

  const handleEdit = useCallback(() => {
    setSelectedTodo(todo)
  }, [todo, setSelectedTodo])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Card
        sx={{
          mb: 2,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          opacity: todo.completed ? 0.8 : 1,
          ...todo.completed && {
            backgroundColor: theme.vars.palette.action.disabledBackground
          },
          border: `1px solid ${theme.vars.palette.grey[500]}`
        }}
        onClick={handleEdit}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', maxWidth: '80%' }}>
              <Tooltip title={todo.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}>
                <Checkbox
                  checked={todo.completed}
                  onClick={handleToggle}
                  icon={<Box sx={{
                    width: 20,
                    height: 20,
                    border: `2px solid ${theme.vars.palette.grey[500]}`,
                    borderRadius: 0.7
                  }} />}
                  checkedIcon={<Iconify width={20} icon='solar:check-square-bold' />}
                  sx={{ mr: 1 }}
                />
              </Tooltip>
              <Box sx={{ maxWidth: '90%' }}>
                <Typography
                  variant="h5"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'text.secondary' : 'text.primary',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {todo.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {todo.description}
                </Typography>
              </Box>
            </Box>
            <Tooltip title="Xóa công việc">
              <IconButton
                color="error"
                onClick={handleDelete}
              >
                <Iconify icon='solar:trash-bin-trash-bold' />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Label color={getColorByPriority(todo.priority)}>{todo.priority}</Label>

            {todo.message.length > 0 && (
              <Label startIcon={<Iconify icon='solar:chat-round-line-bold' />}>
                {todo.message.length}
              </Label>
            )}

            {todo.dueDate && (
              <Label startIcon={<Iconify icon='solar:calendar-bold' />}>
                {todo.dueDate}
              </Label>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TodoItem

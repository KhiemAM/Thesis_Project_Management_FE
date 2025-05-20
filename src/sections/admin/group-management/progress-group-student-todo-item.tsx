import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grow from '@mui/material/Grow'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'

import { Iconify } from 'src/components/iconify'

import { useTodo } from './todo-context'

import type { Todo } from './types'

interface TodoItemProps {
  todo: Todo;
}

const priorityColors: Record<string, { bg: string; text: string }> = {
  'Thấp': { bg: '#e0f2fe', text: '#0369a1' }, // light blue
  'Trung bình': { bg: '#fef3c7', text: '#b45309' }, // light orange
  'Cao': { bg: '#fee2e2', text: '#b91c1c' } // light red
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, setSelectedTodo } = useTodo()

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleTodo(todo.id)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteTodo(todo.id)
  }

  const handleEdit = () => {
    setSelectedTodo(todo)
  }

  // Format date to be more readable
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Grow in timeout={300}>
      <Card
        sx={{
          mb: 2,
          position: 'relative',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
          opacity: todo.completed ? 0.8 : 1,
          backgroundColor: todo.completed ? 'rgba(249, 250, 251, 0.7)' : '#ffffff',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }
        }}
        onClick={handleEdit}
      >
        <CardContent sx={{ pb: '16px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
            <Tooltip title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}>
              <Checkbox
                checked={todo.completed}
                onClick={handleToggle}
                color="primary"
                icon={<Box sx={{
                  width: 20,
                  height: 20,
                  border: '2px solid #d1d5db',
                  borderRadius: '4px'
                }} />}
                checkedIcon={<Iconify icon='solar:trash-bin-trash-bold' />}
                sx={{
                  p: 0.5,
                  mr: 1.5,
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main'
                  }
                }}
              />
            </Tooltip>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                  mb: 0.5,
                  fontWeight: 600
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1.5,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {todo.description}
              </Typography>
            </Box>
            <Tooltip title="Delete task">
              <IconButton
                size="small"
                color="error"
                onClick={handleDelete}
                sx={{
                  ml: 1,
                  opacity: 0.6,
                  '&:hover': { opacity: 1 }
                }}
              >
                <Iconify icon='solar:trash-bin-trash-bold' />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            <Chip
              label={todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              size="small"
              sx={{
                backgroundColor: priorityColors[todo.priority]?.bg,
                color: priorityColors[todo.priority]?.text,
                fontWeight: 500,
                height: 24
              }}
            />

            {todo.comments.length > 0 && (
              <Chip
                icon={<Iconify icon='solar:trash-bin-trash-bold' />}
                label={`${todo.comments.length}`}
                size="small"
                sx={{ height: 24 }}
              />
            )}

            {todo.results.length > 0 && (
              <Chip
                icon={todo.results.some(r => r.type === 'image') ?
                  <Iconify icon='solar:alt-arrow-left-line-duotone' /> :
                  <Iconify icon='solar:alt-arrow-down-line-duotone' />
                }
                label={`${todo.results.length}`}
                size="small"
                sx={{ height: 24 }}
              />
            )}

            {todo.dueDate && (
              <Chip
                icon={<Iconify icon='solar:trash-bin-trash-bold' />}
                label={formatDate(todo.dueDate)}
                size="small"
                sx={{ height: 24 }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Grow>
  )
}

export default TodoItem
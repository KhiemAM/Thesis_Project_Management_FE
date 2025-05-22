import type { SelectChangeEvent } from '@mui/material/Select'

import React, { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'

import { useTodo } from './todo-context'
import { getColorByPriority } from './utils'
import MessageSection from './progress-group-student-message-section'

import type { Todo } from './types'

interface TodoDetailsProps {
  open: boolean;
  onClose: () => void;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ open, onClose }) => {
  const { selectedTodo, updateTodo } = useTodo()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Todo | null>(null)

  useEffect(() => {
    if (selectedTodo) {
      setEditForm(selectedTodo)
    }
  }, [selectedTodo])

  const handleEditToggle = useCallback(() => {
    setIsEditing(!isEditing)
  }, [isEditing])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return

    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  const handlePriorityChange = (e: SelectChangeEvent<string>) => {
    if (!editForm) return
    setEditForm({ ...editForm, priority: e.target.value })
  }

  const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return
    setEditForm({ ...editForm, completed: e.target.checked })
  }

  const handleSave = () => {
    if (editForm) {
      updateTodo(editForm)
      setIsEditing(false)
    }
  }

  const handleCloseDialog = () => {
    setIsEditing(false)
    onClose()
  }

  if (!selectedTodo || !editForm) {
    return null
  }

  // Format date to be more readable
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date set'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isEditing ? (
          <Typography variant="h6">Chỉnh sửa công việc</Typography>
        ) : (
          <Typography variant="h6">Chi tiết công việc</Typography>
        )}
        <Box>
          {!isEditing && (
            <IconButton
              edge="end"
              color="primary"
              onClick={handleEditToggle}
              aria-label="edit"
              sx={{ mr: 1 }}
            >
              <Iconify icon='solar:pen-bold' />
            </IconButton>
          )}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <Iconify icon='mingcute:close-line' />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {isEditing ? (
          <Box component="form" sx={{ pt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Task Title"
              name="title"
              value={editForm.title}
              onChange={handleFormChange}
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              rows={3}
              value={editForm.description}
              onChange={handleFormChange}
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  value={editForm.priority}
                  label="Priority"
                  onChange={handlePriorityChange}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>

              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date (Optional)"
                  value={editForm.dueDate ? new Date(editForm.dueDate) : null}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal'
                    }
                  }}
                />
              </LocalizationProvider> */}
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={editForm.completed}
                  onChange={handleCompletedChange}
                  color="primary"
                />
              }
              label="Mark as completed"
              sx={{ mt: 1 }}
            />
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #e5e7eb' }}>
              <Typography variant="h5" gutterBottom>
                {selectedTodo.title}
              </Typography>

              <Typography variant="body1" gutterBottom whiteSpace="pre-wrap">
                {selectedTodo.description || 'Không có mô tả'}
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Độ ưu tiên:
                  </Typography>
                  <Label color={getColorByPriority(selectedTodo.priority)}>{selectedTodo.priority}</Label>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Trạng thái:
                  </Typography>
                  <Label color={selectedTodo.completed ? 'success' : 'error'}>
                    {selectedTodo.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}
                  </Label>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon='solar:calendar-bold' />
                  <Typography variant="body2" color="text.secondary">
                    Ngày hết hạn:
                  </Typography>
                  <Label color='default'>{selectedTodo.dueDate}</Label>
                </Box>
              </Box>
            </Box>

            <Box>
              <MessageSection
                todoId={selectedTodo.id}
                results={selectedTodo.results}
                comments={selectedTodo.comments}
              />
            </Box>
          </>
        )}
      </DialogContent>

      {isEditing && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setIsEditing(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            startIcon={<Iconify icon='solar:trash-bin-trash-bold' />}
          >
            Save Changes
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default TodoDetails
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

import { fDate } from 'src/utils/format-time'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'

import { getColorByPriority } from './utils'
import MessageSection from './progress-group-student-message-section'

import type { Task } from './types'

interface TodoDetailsProps {
  open: boolean;
  onClose: () => void;
  todo: Task | null;
}

const TodoDetails: React.FC<TodoDetailsProps> = ({ open, onClose, todo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Task | null>(null)

  useEffect(() => {
    if (todo) {
      setEditForm(todo)
    }
  }, [todo])

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

  // const handleSave = () => {
  //   if (editForm) {
  //     updateTodo(editForm)
  //     setIsEditing(false)
  //   }
  // }

  const handleCloseDialog = () => {
    setIsEditing(false)
    onClose()
  }

  if (!todo || !editForm) {
    return null
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
          <Typography variant="h6" component='span'>Chỉnh sửa công việc</Typography>
        ) : (
          <Typography variant="h6" component='span'>Chi tiết công việc</Typography>
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
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #e5e7eb' }}>
              <Typography variant="h5" gutterBottom>
                {todo.title}
              </Typography>

              <Typography variant="body1" gutterBottom whiteSpace="pre-wrap">
                {todo.description || 'Không có mô tả'}
              </Typography>

              <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Độ ưu tiên:
                  </Typography>
                  <Label color={getColorByPriority(todo.priority_text)}>{todo.priority_text}</Label>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Trạng thái:
                  </Typography>
                  <Label color={todo.status == '2' ? 'success' : 'error'}>
                    {todo.status == '2' ? 'Hoàn thành' : 'Chưa hoàn thành'}
                  </Label>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon='solar:calendar-bold' />
                  <Typography variant="body2" color="text.secondary">
                    Ngày hết hạn:
                  </Typography>
                  <Label color='default'>{fDate(todo.due_date)}</Label>
                </Box>
              </Box>
            </Box>

            <Box>
              <MessageSection
                todoId={todo.id}
                messages={todo.comments}
              />
            </Box>
          </>
        )}
      </DialogContent>

      {isEditing && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setIsEditing(false)} color="inherit">
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            // onClick={handleSave}
            startIcon={<Iconify icon='solar:trash-bin-trash-bold' />}
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default TodoDetails
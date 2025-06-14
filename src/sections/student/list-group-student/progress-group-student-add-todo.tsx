import type {
  SelectChangeEvent
} from '@mui/material'

import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { useTodo } from './todo-context'

interface AddTodoProps {
  open: boolean;
  onClose: () => void;
}

const initialState = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: null as string | null
}

const AddTodo: React.FC<AddTodoProps> = ({ open, onClose }) => {
  const { addTodo } = useTodo()
  const [formState, setFormState] = useState(initialState)
  const [errors, setErrors] = useState({
    title: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (name === 'title' && value.trim()) {
      setErrors((prev) => ({ ...prev, title: false }))
    }
  }

  const handlePriorityChange = (e: SelectChangeEvent<string>) => {
    setFormState((prev) => ({ ...prev, priority: e.target.value }))
  }

  const handleDateChange = (value: any /* PickerValue */, _context: any) => {
    let date: Date | null = null
    if (value instanceof Date) {
      date = value
    } else if (value && typeof value === 'object' && typeof value.toDate === 'function') {
      // For Dayjs or similar objects
      date = value.toDate()
    }
    setFormState((prev) => ({
      ...prev,
      dueDate: date ? date.toISOString().split('T')[0] : null
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formState.title.trim()) {
      setErrors((prev) => ({ ...prev, title: true }))
      return
    }

    // Add new todo
    addTodo({
      title: formState.title,
      description: formState.description,
      completed: false,
      priority: formState.priority,
      dueDate: formState.dueDate,
      message: []
    })

    // Reset form and close dialog
    setFormState(initialState)
    onClose()
  }

  const handleCancel = () => {
    setFormState(initialState)
    setErrors({ title: false })
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: 600 }}>Add New Task</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Task Title"
            name="title"
            autoFocus
            value={formState.title}
            onChange={handleChange}
            error={errors.title}
            helperText={errors.title ? 'Title is required' : ''}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formState.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={formState.priority}
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
              value={formState.dueDate ? new Date(formState.dueDate) : null}
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
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleCancel}
          color="inherit"
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Add Task
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddTodo
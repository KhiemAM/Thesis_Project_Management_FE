import type { SelectChangeEvent } from '@mui/material/Select'
import type { TransitionProps } from '@mui/material/transitions'

import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Slide from '@mui/material/Slide'
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
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import FormControlLabel from '@mui/material/FormControlLabel'
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { Iconify } from 'src/components/iconify'

import { useTodo } from './todo-context'
import ResultSection from './progress-group-student-result-section'
import CommentSection from './progress-group-student-comment-section'

import type { Todo } from './types'

interface TodoDetailsProps {
  open: boolean;
  onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TodoDetails: React.FC<TodoDetailsProps> = ({ open, onClose }) => {
  const { selectedTodo, updateTodo } = useTodo()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<Todo | null>(null)
  const [tabValue, setTabValue] = useState(0)

  useEffect(() => {
    if (selectedTodo) {
      setEditForm({ ...selectedTodo })
    }
  }, [selectedTodo])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editForm) return

    const { name, value } = e.target
    setEditForm({ ...editForm, [name]: value })
  }

  const handlePriorityChange = (e: SelectChangeEvent<string>) => {
    if (!editForm) return
    setEditForm({ ...editForm, priority: e.target.value })
  }

  const handleDateChange = (value: unknown /* PickerValue */, _context: any) => {
    if (!editForm) return
    let dateObj: Date | null = null
    if (value && typeof value === 'object' && 'toDate' in value && typeof value['toDate'] === 'function') {
      // Dayjs object
      dateObj = value['toDate']()
    } else if (value instanceof Date) {
      dateObj = value
    }
    setEditForm({
      ...editForm,
      dueDate: dateObj ? dateObj.toISOString().split('T')[0] : null
    })
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

  const handleClose = () => {
    setIsEditing(false)
    setTabValue(0)
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
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isEditing ? (
            <Typography variant="h6">Edit Task</Typography>
          ) : (
            <Typography variant="h6">Task Details</Typography>
          )}
        </Box>
        <Box>
          {!isEditing && (
            <IconButton
              edge="end"
              color="primary"
              onClick={handleEditToggle}
              aria-label="edit"
              sx={{ mr: 1 }}
            >
              <Iconify icon='solar:trash-bin-trash-bold' />
            </IconButton>
          )}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Iconify icon='solar:trash-bin-trash-bold' />
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
          <Box>
            <Box sx={{ mb: 3, pb: 2, borderBottom: '1px solid #e5e7eb' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {selectedTodo.title}
              </Typography>

              <Typography variant="body1" gutterBottom sx={{ whiteSpace: 'pre-wrap' }}>
                {selectedTodo.description || 'No description provided.'}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Priority:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color:
                        selectedTodo.priority === 'high' ? '#b91c1c' :
                          selectedTodo.priority === 'medium' ? '#b45309' :
                            '#0369a1'
                    }}
                  >
                    {selectedTodo.priority.charAt(0).toUpperCase() + selectedTodo.priority.slice(1)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                    Status:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: selectedTodo.completed ? '#047857' : '#4b5563'
                    }}
                  >
                    {selectedTodo.completed ? 'Completed' : 'Pending'}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Iconify icon='solar:trash-bin-trash-bold' />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    Due: {formatDate(selectedTodo.dueDate)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="task details tabs"
                >
                  <Tab label="Results" id="tab-0" aria-controls="tabpanel-0" />
                  <Tab label="Comments" id="tab-1" aria-controls="tabpanel-1" />
                </Tabs>
              </Box>

              <Box
                role="tabpanel"
                hidden={tabValue !== 0}
                id="tabpanel-0"
                aria-labelledby="tab-0"
              >
                {tabValue === 0 && (
                  <ResultSection todoId={selectedTodo.id} results={selectedTodo.results} />
                )}
              </Box>

              <Box
                role="tabpanel"
                hidden={tabValue !== 1}
                id="tabpanel-1"
                aria-labelledby="tab-1"
              >
                {tabValue === 1 && (
                  <CommentSection todoId={selectedTodo.id} comments={selectedTodo.comments} />
                )}
              </Box>
            </Box>
          </Box>
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
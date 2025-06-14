import { useMemo } from 'react'

import Box from '@mui/material/Box'
import { useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

import { useTodo } from './todo-context'

const ProgressBar = () => {
  const { todos } = useTodo()
  const theme = useTheme()

  const progress = useMemo(() => {
    if (todos.length === 0) return 0
    const completedTasks = todos.filter(todo => todo.completed).length
    return (completedTasks / todos.length) * 100
  }, [todos])

  const getProgressColor = (value: number) => {
    if (value < 30) return theme.vars.palette.error.main
    if (value < 70) return theme.vars.palette.warning.main
    return theme.vars.palette.success.main
  }

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Thanh tiến độ công việc
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight="medium">
          {Math.round(progress)}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: theme.palette.grey[200],
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            backgroundColor: getProgressColor(progress),
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease'
          }
        }}
      />
    </Box>
  )
}

export default ProgressBar

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { RouterLink } from 'src/routes/components'

import { DashboardContent } from 'src/layouts/dashboard'

import { Iconify } from 'src/components/iconify'

import { TodoProvider } from '../todo-context'
import TodoList from '../progress-group-student-todo-list'


// ----------------------------------------------------------------------

export function ProgressGroupStudentView() {

  return (
    <DashboardContent>
      <Box
        component={RouterLink}
        href='/group/list'
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          color: 'text.primary',
          textDecoration: 'none'
        }}
        gap={1}
      >
        <Iconify icon='solar:alt-arrow-left-line-duotone'/>
        <Typography variant="h4" sx={{ flexGrow: 1 }} >
            Quản lý tiến độ nhóm
        </Typography>
      </Box>

      <TodoProvider>
        <TodoList />
      </TodoProvider>

    </DashboardContent>
  )
}

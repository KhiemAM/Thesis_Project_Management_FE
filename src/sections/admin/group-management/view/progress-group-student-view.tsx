
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { RouterLink } from 'src/routes/components'

import groupApi from 'src/axios/group'
import { useLoading } from 'src/context'
import { DashboardContent } from 'src/layouts/dashboard'

import { Iconify } from 'src/components/iconify'

import { TodoProvider } from '../todo-context'
import TodoList from '../progress-group-student-todo-list'

import type { Group } from '../types'


// ----------------------------------------------------------------------

export function ProgressGroupStudentView() {
  const { id } = useParams()
  const { setIsLoading } = useLoading()
  const [group, setGroup] = useState<Group | null>(null)

  const fetchGroupInformation = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await groupApi.getGroupById(id as string)
      setGroup(res.data)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, id])

  useEffect(() => {
    fetchGroupInformation()
  }, [fetchGroupInformation])

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
        <TodoList
          group={group}
        />
      </TodoProvider>

    </DashboardContent>
  )
}

import { useState, useEffect, useCallback } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'

import groupApi from 'src/axios/group'
import { useLoading } from 'src/context'
import { DashboardContent } from 'src/layouts/dashboard'

import { PostItem } from '../list-group-student-item'
import { PostSort } from '../list-group-student-sort'
import { PostSearch } from '../list-group-student-search'

import type { Group } from '../types'

// ----------------------------------------------------------------------

export function ListGroupStudentView() {
  const { setIsLoading } = useLoading()
  const [sortBy, setSortBy] = useState('latest')
  const [_groupStudent, setGroupStudent] = useState<Group[]>([])
  const [page, setPage] = useState(1)
  const [rowsPerPage] = useState(8)

  const fetchGroupStudent = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await groupApi.getGroups()
      const newData = res.data.map((item: Group, index: number) => ({
        ...item,
        coverImage: `/assets/images/cover/cover-${index + 1}.webp`,
        members: item.members.map((member, memberIndex) => ({
          ...member,
          avatarUrl: `/assets/images/avatar/avatar-${index + memberIndex + 1}.webp`
        }))
      }))
      setGroupStudent(newData)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  useEffect(() => {
    fetchGroupStudent()
  }, [fetchGroupStudent])

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort)
  }, [])

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }, [])

  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentItems = _groupStudent.slice(startIndex, endIndex)

  return (
    <DashboardContent>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Danh sách nhóm đã tạo
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <PostSearch posts={_groupStudent} />
        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' }
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {currentItems.map((post) => (
          <Grid
            key={post.id}
            size={{
              xs: 12,
              sm: 6,
              md: 3
            }}
          >
            <PostItem post={post} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        page={page}
        onChange={handlePageChange}
        count={Math.ceil(_groupStudent.length / rowsPerPage)}
        color="primary"
        sx={{ mt: 8, mx: 'auto' }}
      />
    </DashboardContent>
  )
}

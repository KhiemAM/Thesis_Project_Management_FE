import { useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'

import { _groupStudent } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'

import { PostItem } from '../list-group-student-item'
import { PostSort } from '../list-group-student-sort'
import { PostSearch } from '../list-group-student-search'

// ----------------------------------------------------------------------

export function ListGroupStudentView() {
  const [sortBy, setSortBy] = useState('latest')

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort)
  }, [])

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
          Danh sách nhóm sinh viên
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
        {_groupStudent.map((post) => (
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

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  )
}

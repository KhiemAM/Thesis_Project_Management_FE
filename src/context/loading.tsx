import React from 'react'

import { Backdrop, CircularProgress } from '@mui/material'

interface LoadingProps {
  loading: boolean
  size?: number
}

const Loading: React.FC<LoadingProps> = ({ loading, size = 40 }) => (
  <Backdrop
    sx={{ color: 'inherit', zIndex: (theme) => theme.zIndex.modal + 1 }}
    open={loading}
  >
    <CircularProgress color="inherit" size={size} />
  </Backdrop>
)

export default Loading

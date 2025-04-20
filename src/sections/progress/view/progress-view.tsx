
import Typography from '@mui/material/Typography'

import { DashboardContent } from 'src/layouts/dashboard'

import Board from '../Boards/_id'

// ----------------------------------------------------------------------
export function ProductsView() {

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Tiến độ
      </Typography>

      <Board />

    </DashboardContent>
  )
}

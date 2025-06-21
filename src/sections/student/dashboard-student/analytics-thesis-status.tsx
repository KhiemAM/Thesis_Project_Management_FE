import type { CardProps } from '@mui/material/Card'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import LinearProgress from '@mui/material/LinearProgress'

import { fPercent } from 'src/utils/format-number'

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string
  subheader?: string
  data: {
    label: string
    value: number
    total: number
    color?: string
  }[]
}

export function AnalyticsThesisStatus({ title, subheader, data, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ px: 3, py: 2 }}>
        {data.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
      </Stack>
    </Card>
  )
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
  progress: Props['data'][number]
}

function ProgressItem({ progress }: ProgressItemProps) {
  const { label, value, total, color = 'primary' } = progress

  return (
    <Box>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography variant="subtitle2">{fPercent((value / total) * 100)}</Typography>
      </Box>      <LinearProgress
        variant="determinate"
        value={(value / total) * 100}
        color={color as any}
        sx={{
          height: 8,
          bgcolor: (theme) => theme.palette.grey[500]
        }}
      />

      <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {value} / {total}
        </Typography>
      </Box>
    </Box>
  )
}

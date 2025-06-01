import type { Dayjs } from 'dayjs'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'

import { Label } from 'src/components/label'
import { Iconify } from 'src/components/iconify'

import { getColorByStatus } from './utils'

// ----------------------------------------------------------------------

// Tạo một MotionTableRow từ MUI TableRow với cách sử dụng mới
const MotionTableRow = motion.create(styled(TableRow)({}))

export type FunctionProps = {
  id: string;
  name: string;
  description: string;
  path: string;
  parent_name: string;
  type: string;
  status: string;
  create_datetime: Dayjs;
  update_datetime: Dayjs;
  children?: FunctionProps[];
};

type UserTableRowDialogProps = {
  row: FunctionProps;
  level?: number;
};

export function FunctionTableRowDialog({ row, level = 0 }: UserTableRowDialogProps) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <MotionTableRow
        hover
        tabIndex={-1}
        role="checkbox"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        sx={
          level === 0
            ? {
              '&.MuiTableRow-root': {
                borderBottom: '1px solid',
                borderTop: '1px solid',
                backgroundColor: (theme) => theme.vars.palette.action.selected,
                '&:hover': {
                  backgroundColor: (theme) => theme.vars.palette.action.focus
                }
              }
            }
            : {}
        }
      >
        <TableCell sx={{ pl: 3 + 5 * level }}>
          {row.name}
          {(row.children?.length ?? 0) > 0 && (
            <IconButton onClick={toggleExpand} size="small">
              <Iconify icon={expanded ? 'solar:alt-arrow-down-line-duotone' : 'solar:alt-arrow-right-line-duotone'} />
            </IconButton>
          )}
        </TableCell>

        <TableCell>{row.description}</TableCell>
        <TableCell>{row.path}</TableCell>
        <TableCell>{row.parent_name}</TableCell>
        <TableCell align='center'>{row.type}</TableCell>
        <TableCell align='center'>
          <Label color={getColorByStatus(row.status)}>{row.status}</Label>
        </TableCell>
      </MotionTableRow>

      <AnimatePresence>
        {expanded && row.children?.map((child) => (
          <FunctionTableRowDialog
            key={child.id}
            row={child}
            level={level + 1}
          />
        ))}
      </AnimatePresence>
    </>
  )
}

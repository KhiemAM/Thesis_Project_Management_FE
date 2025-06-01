import Box from '@mui/material/Box'
import { styled } from '@mui/material'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableHead from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import { visuallyHidden } from './utils'

// ----------------------------------------------------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '& .MuiButtonBase-root': {
    color: theme.vars.palette.background.paper,
    '& .MuiSvgIcon-root': {
      color: theme.vars.palette.background.paper
    },
    '&.MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon': {
      color: theme.vars.palette.background.paper,
      opacity: 1
    },
    '&.MuiTableSortLabel-root.Mui-active': {
      color: theme.vars.palette.background.paper
    },
    '&:hover': {
      color: theme.vars.palette.background.paper
    }
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.vars.palette.primary.main
  }
}))
// ----------------------------------------------------------------------

type UserTableHeadProps = {
  orderBy: string;
  rowCount: number;
  numSelected: number;
  order: 'asc' | 'desc';
  onSort: (id: string) => void;
  headLabel: Record<string, any>[];
  onSelectAllRows: (checked: boolean) => void;
};

export function UserTableHead({
  order,
  onSort,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onSelectAllRows
}: UserTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onSelectAllRows(event.target.checked)
            }
          />
        </StyledTableCell>

        {headLabel.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

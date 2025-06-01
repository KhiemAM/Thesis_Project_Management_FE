import { styled } from '@mui/material'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'


// ----------------------------------------------------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-root': {
    color: theme.vars.palette.background.paper,
  },
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.vars.palette.primary.main
  }
}))
// ----------------------------------------------------------------------

type RoleTableHeadNoSortProps = {
  headLabel: Record<string, any>[];
};

export function RoleTableHeadNoSort({
  headLabel
}: RoleTableHeadNoSortProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

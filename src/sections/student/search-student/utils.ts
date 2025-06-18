import type { ChipsFilter } from 'src/components/chip/types'

import type { ProfileProps } from './user-table-row'

// ----------------------------------------------------------------------

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)'
} as const

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0
}

// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

// ----------------------------------------------------------------------

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (
  a: {
    [key in Key]: number | string;
  },
  b: {
    [key in Key]: number | string;
  }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: ProfileProps[];
  comparator: (a: any, b: any) => number;
  filter: ChipsFilter;
};

export function applyFilter({ inputData, comparator, filter }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const)

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  inputData = stabilizedThis.map((el) => el[0])

  if (filter.filterSearch.data.length > 0) {
    inputData = inputData.filter(
      (item) => `${item.information.last_name} ${item.information.first_name}`.toLowerCase().indexOf(filter.filterSearch.data[0].label.toLowerCase()) !== -1 || item.student_info.student_code.toLowerCase().indexOf(filter.filterSearch.data[0].label.toLowerCase()) !== -1
    )
  }

  // if (Array.isArray(filter.filterTab) && filter.filterTab.length > 0) {
  //   // Hàm lấy các label hợp lệ từ filterTab
  //   const getLabels = (type: string) =>
  //     filter.filterTab
  //       .filter((item) => item.display === type)
  //       .flatMap((item) => item.data)
  //       .map((chip) => chip.label)
  //       .filter((label) => label !== 'Tất cả')

  //   // Lấy danh sách labels cho department và status
  //   const statusLabels = getLabels('Trạng thái')

  //   // Lọc inputData theo cả department và status
  //   inputData = inputData.filter((item) =>
  //     (!statusLabels.length || statusLabels.includes(item.is_active ? 'Hoạt động' : 'Ngừng hoạt động'))
  //   )
  // }

  // if (filter.filterInstructor.data.length > 0) {
  //   const instructorLabels = filter.filterInstructor.data.map((item) => item.label)
  //   inputData = inputData.filter((item) => instructorLabels.includes(item.instructor)
  //   )
  // }

  return inputData
}

export const getColorByIsActive = (isActive: boolean) => {
  switch (isActive) {
  case true:
    return 'success'
  case false:
    return 'error'
  default:
    return 'default'
  }
}
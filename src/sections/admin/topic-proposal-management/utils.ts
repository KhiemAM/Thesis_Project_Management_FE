import type { ChipsFilter } from 'src/components/chip/types'

import { getTopicStatusText } from 'src/constants/topic-status'

import type { TopicProps } from './topic-proposal-table-row'

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
  inputData: TopicProps[];
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
      (item) => item.name.toLowerCase().indexOf(filter.filterSearch.data[0].label.toLowerCase()) !== -1
    )
  }

  if (Array.isArray(filter.filterTab) && filter.filterTab.length > 0) {
    // Hàm lấy các label hợp lệ từ filterTab
    const getLabels = (type: string) =>
      filter.filterTab
        .filter((item) => item.display === type)
        .flatMap((item) => item.data)
        .map((chip) => chip.label)
        .filter((label) => label !== 'Tất cả')

    // Lấy danh sách labels cho department và status
    const departmentLabels = getLabels('Loại đề tài')
    const statusLabels = getLabels('Trạng thái')

    // Lọc inputData theo cả department và status
    inputData = inputData.filter((item) =>
      (!departmentLabels.length || departmentLabels.includes(item.name_thesis_type)) &&
    (!statusLabels.length || statusLabels.includes(item.status))
    )
  }

  if (filter.filterSelect.data.length > 0) {
    const instructorLabels = filter.filterSelect.data.map((item) => item.label)
    inputData = inputData.filter((item) =>
      item.instructors.some((instructor) => instructorLabels.includes(instructor.name))
    )
  }

  return inputData
}

export const getColorByDepartment = (department: string) => {
  switch (department) {
  case 'KTPM':
    return 'primary'
  case 'HTTT':
    return 'warning'
  case 'KHDL&TTNT':
    return 'error'
  case 'MMT-ATTT':
    return 'success'
  default:
    return 'default'
  }
}

export const getColorByStatus = (status: string) => {
  switch (status) {
  case getTopicStatusText(3):
    return 'warning'
  case getTopicStatusText(1):
    return 'info'
  case getTopicStatusText(0):
    return 'error'
  case getTopicStatusText(2):
    return 'primary'
  case getTopicStatusText(4):
    return 'success'
  case getTopicStatusText(5):
    return 'error'
  default:
    return 'default'
  }
}

export const getColorByThesisType = (department: string) => {
  switch (department) {
  case 'Khóa luận':
    return 'primary'
  case 'Đồ án':
    return 'secondary'
  default:
    return 'default'
  }
}

export const getDataFilterByTabs = (data: TopicProps[], key: keyof TopicProps, value: string) => {
  if (value === 'Tất cả') {
    return data
  }
  return data.filter((item) => (item as any)[key] === value)
}
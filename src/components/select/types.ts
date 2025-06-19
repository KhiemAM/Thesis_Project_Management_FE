export interface MultipleSelectFilterProps {
  inputLabel?: string
  valueMultipleSelect: string[]
  filterValue: string[]
  onFilter: (newValue: string[]) => void
}
interface Column {
  key: string
  label: string
  render?: (item: any) => React.ReactNode
  width?: number // flex width
}

export interface MultipleSelectTextFieldProps {
  data: any[]
  columns: Column[]
  inputLabel?: string
  value: any[]
  onChange: (value: any[]) => void
  error?: boolean
  valueKey: string // key để lấy giá trị khi select
  displayKey: string // key để hiển thị trong renderValue
}

export interface SingleSelectTextFieldProps {
  data: any[]
  columns: Column[]
  inputLabel?: string
  value: any
  onChange: (value: any) => void
  error?: boolean
  valueKey?: string
  displayKey?: string
}

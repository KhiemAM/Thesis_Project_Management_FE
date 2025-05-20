export interface MultipleSelectFilterProps {
  inputLabel?: string
  valueMultipleSelect: string[]
  filterValue: string[]
  onFilter: (newValue: string[]) => void
}

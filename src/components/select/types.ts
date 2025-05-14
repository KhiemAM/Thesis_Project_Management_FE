export interface MultipleSelectFilterProps {
  valueMultipleSelect: string[]
  filterValue: string[]
  onFilter: (newValue: string[]) => void
}

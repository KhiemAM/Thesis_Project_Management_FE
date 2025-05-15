import type { FunctionProps } from 'src/sections/admin/function-management/function-table-row'

export interface CheckboxListProps {
  items: FunctionProps[];
  label: keyof FunctionProps;
}
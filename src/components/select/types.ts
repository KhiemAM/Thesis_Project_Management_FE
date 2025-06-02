export interface MultipleSelectFilterProps {
  inputLabel?: string
  valueMultipleSelect: string[]
  filterValue: string[]
  onFilter: (newValue: string[]) => void
}

export type MultipleSelectTextFieldPops = {
  data: { value: string; label: string }[];
  inputLabel?: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean; 
};
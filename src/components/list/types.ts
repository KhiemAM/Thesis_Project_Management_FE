export interface UniversalCheckboxTreeProps<T extends Record<string, any>> {
  items: T[];
  label: keyof T | ((item: T) => React.ReactNode);
  valueKey?: keyof T;
  childrenKey?: keyof T;
  defaultChecked?: string[];
  checkedIds?: string[];
  onChange?: (checkedIds: string[], checkedItems: T[]) => void;
}

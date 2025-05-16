export interface ChipData {
  key: string;
  label: string;
}

export interface ChipsProps {
  display: string;
  data: ChipData[];
}
export interface ChipsFilter {
  filterSearch: ChipsProps;
  filterTab: ChipsProps[];
  filterSelect: ChipsProps;
}

export interface ChipsArrayFilterProps {
  chipData: ChipsFilter
  handleDeleteChipData: (ChipsFilter: ChipsFilter) => void
  handleClearFilter: () => void
}
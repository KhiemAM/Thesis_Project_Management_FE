export interface ChipData {
  key: string;
  label: string;
}

export interface ChipsFilter {
  filterSearch: {
    display: string;
    data: ChipData[];
  };
  filterTab: {
    display: string;
    data: ChipData[];
  };
  filterSelect: {
    display: string;
    data: ChipData[];
  };
}

export interface ChipsArrayFilterProps {
  chipData: ChipsFilter
  handleDeleteChipData: (ChipsFilter: ChipsFilter) => void
  handleClearFilter: () => void
}
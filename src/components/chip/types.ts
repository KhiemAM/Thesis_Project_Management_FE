export interface ChipData {
  key: string;
  label: string;
}

export interface ChipsFilter {
  filterName: {
    display: string;
    data: ChipData[];
  };
  filterDepartment: {
    display: string;
    data: ChipData[];
  };
  filterInstructor: {
    display: string;
    data: ChipData[];
  };
}

export interface ChipsArrayFilterProps {
  chipData: ChipsFilter
  handleDeleteChipData: (ChipsFilter: ChipsFilter) => void
  handleClearFilter: () => void
}
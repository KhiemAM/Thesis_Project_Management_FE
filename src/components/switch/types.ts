export interface IOSSwitchesProps {
  label: string;
  isChecked: boolean;
  handleChecked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
import { ProcessingMethod, ProcessingMethodSchema } from "@/backend";
import { MultiSelect } from "../../features/common/form/multi-select";
import { FC } from "react";


export interface ProcessingMethodsSelectProps {  
  value?: ProcessingMethod[];
  onChange?: (value: ProcessingMethod[]) => void;
}

export const ProcessingMethodsSelect: FC<ProcessingMethodsSelectProps> = ({ value, onChange }) => {
  const options = ProcessingMethodSchema.options;
  return (
    <MultiSelect<ProcessingMethod> options={options} value={value} onChange={onChange} />
  );
};

import { useState } from "react";

export const CheckboxInputComponent = ({
  label,
  input,
  defaultChecked,
}: {
  label: string;
  input: string;
  defaultChecked: boolean;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);
  return (
    <label className='flex items-center gap-2 text-sm mb-2'>
      <input
        name={input}
        type='checkbox'
        checked={isChecked}
        onChange={(e) => {
          setIsChecked(e.target.checked);
        }}
      />
      {label.replace(/^./, label[0].toUpperCase())}
    </label>
  );
};

import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Props {
  onValueChange: (value: Date) => void;
}

export const SpecificDatePicker: React.FC<Props> = ({ onValueChange }) => {
  const [dayTime, setTime] = useState("");

  const handleBlur = (value: string) => {
    setTime(value);
    onValueChange(new Date(value));
  };

  return (
    <div className="col-span-2 flex items-center justify-evenly gap-3 rounded-lg border-2 border-accent">
      <div className="flex-1 p-3">
        <label className="label">
          <span className="label-text">Select specific time</span>
        </label>
        <div className="flex  items-center justify-evenly gap-2 rounded-lg border-2 border-accent px-2">
          <div className="form-control w-full">
            <input
              type="datetime-local"
              value={dayTime}
              max={60}
              onChange={({ target }) => handleBlur(target.value)}
              placeholder="0"
              className="input w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

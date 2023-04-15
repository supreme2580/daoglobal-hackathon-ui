import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface Props {
  onValueChange: (value: number) => void;
}

export const SpecificDatePicker: React.FC<Props> = ({ onValueChange }) => {
  const [{ minutes, hours, days }, setTime] = useState({
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const handleBlur = (name: string, value: string) => {
    setTime((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (minutes || hours || days) {
      const minuteToSec = minutes * 60,
        hourToSec = hours * 60 * 60,
        dayToSec = hours * 60 * 60 * 24;

      onValueChange(minuteToSec + hourToSec + dayToSec);
    }
    return () => setTime({ minutes: 0, hours: 0, days: 0 });
  }, [minutes, hours, days, onValueChange]);

  return (
    <div className="col-span-2 flex items-center justify-evenly gap-3 rounded-lg border-2 border-accent p-5">
      <div className="flex-1 rounded-lg border-2 border-accent p-3">
        <label className="label">
          <span className="label-text">Minutes</span>
        </label>
        <div className="flex  items-center justify-evenly gap-2 rounded-lg border-2 border-accent px-2">
          <button type="button">
            <PlusSmallIcon width={16} height={16} />
          </button>
          <div className="form-control w-full max-w-xs">
            <input
              type="number"
              value={minutes}
              name="minutes"
              max={60}
              onBlur={({ target }) => handleBlur(target.name, target.value)}
              placeholder="0"
              className="input w-full max-w-xs"
            />
          </div>
          <button type="button">
            <MinusSmallIcon width={16} height={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 rounded-lg  border-2 border-accent p-3">
        <label className="label">
          <span className="label-text">Hours</span>
        </label>
        <div className="flex items-center justify-evenly gap-2 rounded-lg border-2 border-accent px-2">
          <button type="button">
            <PlusSmallIcon width={16} height={16} />
          </button>
          <div className="form-control w-full max-w-xs">
            <input
              type="number"
              placeholder="0"
              value={hours}
              name="hours"
              max={24}
              onBlur={({ target }) => handleBlur(target.name, target.value)}
              className="input input w-full max-w-xs"
            />
          </div>
          <button type="button">
            <MinusSmallIcon width={16} height={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 rounded-lg border-2 border-accent p-3">
        <label className="label">
          <span className="label-text">Days</span>
        </label>
        <div className="flex items-center justify-evenly gap-2 rounded-lg border-2 border-accent px-2">
          <button type="button">
            <PlusSmallIcon width={16} height={16} />
          </button>
          <div className="form-control w-full max-w-xs">
            <input
              type="number"
              value={days}
              name="days"
              onBlur={({ target }) => handleBlur(target.name, target.value)}
              placeholder="0"
              className="input input w-full max-w-xs"
            />
          </div>
          <button type="button">
            <MinusSmallIcon width={16} height={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

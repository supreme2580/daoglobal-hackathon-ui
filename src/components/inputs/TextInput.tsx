import classNames from "classnames";
import { type UseFormRegister } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<Record<string, string>>;
  label: string;
  name: string;
  inputClass?: string;
  hasError?: string;
}

export const TextInput: React.FC<Props> = ({
  label,
  hasError,
  register,
  name,
  inputClass,
  ...props
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      <input
        className={classNames(
          "input-bordered input-accent input w-full",

          inputClass
        )}
        {...register(name)}
        {...props}
      />
      {hasError && (
        <label className="label">
          <span className="label-text-alt text-error">{hasError}</span>
        </label>
      )}
    </div>
  );
};

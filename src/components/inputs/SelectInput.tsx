import classNames from "classnames";
import { UseFormRegister } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  children?: React.ReactNode;
  hasError?: string;
  selectClass?: string;
}

export const SelectInput: React.FC<Props> = ({
  name,
  label,
  register,
  children,
  selectClass,
  hasError,
  ...props
}) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-xl font-bold">{label}</span>
      </label>
      <select
        {...register(name)}
        className={classNames("select-bordered select-accent select", selectClass)}
        defaultValue=""
        {...props}
      >
        {children}
      </select>
      {hasError && (
        <label className="label">
          <span className="label-text-alt text-error">{hasError}</span>
        </label>
      )}
    </div>
  );
};

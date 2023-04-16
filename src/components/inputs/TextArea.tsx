import classNames from "classnames";
import { type UseFormRegister } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegister<Record<string, string>>;
  label: string;
  name: string;
  inputClass?: string;
  hasError?: string;
}

export const TextArea: React.FC<Props> = ({
  label,
  inputClass,
  hasError,
  register,
  name,
  ...props
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      <textarea
        className={classNames(
          "textarea-bordered textarea-accent textarea h-24",
          inputClass
        )}
        {...register(name)}
        {...props}
      ></textarea>
      {hasError && (
        <label className="label">
          <span className="label-text-alt">{hasError}</span>
        </label>
      )}
    </div>
  );
};

import { ButtonType } from "../../types/typings";

export default function Button({ text, icon, clickFunction }: ButtonType) {
  return (
    <button
      className="remove-text-transform btn-success btn-xs btn-md btn w-full space-x-0.5 text-white sm:w-auto"
      onClick={() => clickFunction()}
    >
      <div>{icon}</div>
      <div>{text}</div>
    </button>
  );
}

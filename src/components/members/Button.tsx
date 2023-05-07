import { ButtonType } from "../../types/typings";

export default function Button({ text, clickFunction }: ButtonType) {
  return (
    <button
      className="remove-text-transform btn-success btn-xs btn-md btn w-full text-white sm:w-auto"
      onClick={() => clickFunction()}
    >
      {text}
    </button>
  );
}

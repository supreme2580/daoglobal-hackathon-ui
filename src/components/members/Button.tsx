import { ButtonType } from "../../types/typings";

export default function Button({ text, clickFunction }: ButtonType) {
    return(
        <button className="btn btn-xs btn-md remove-text-transform btn-success text-white w-full sm:w-auto" 
        onClick={() => clickFunction()}>{text}</button>
    )
}
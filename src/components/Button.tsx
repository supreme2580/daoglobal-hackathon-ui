import { ClickType } from "@/types/types";

export default function Button({ clickFunction }: ClickType) {
    return(
        <button className="btn btn-xs btn-md remove-text-transform btn-success text-white w-full sm:w-auto" 
        onClick={() => clickFunction()}>Manage Members</button>
    )
}
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function InputSearch() {
    return(
        <div className="form-control w-full">
            <div className="input-group w-full">
                <input type="text" placeholder="Search…" className="input input-ghost bg-black w-full md:w-[535px] !outline-0 focus:border-none" />
                <button className="btn btn-square bg-black">
                    <MagnifyingGlassIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}
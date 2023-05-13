import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function InputSearch() {
  return (
    <div className="form-control w-full">
      <div className="input-group w-full">
        <input
          type="text"
          placeholder="Search…"
          className="input-ghost input w-full bg-secondary px-8 placeholder-primary !outline-0 focus:border-none md:w-[500px]"
        />
        <button className="btn-square btn border-secondary bg-secondary hover:border-secondary hover:bg-secondary">
          <MagnifyingGlassIcon className="h-6 w-6 text-primary" />
        </button>
      </div>
    </div>
  );
}

import { useMintDaoboxNFT } from "@hooks/lens/useMintDaoboxNFT";
import Button from "./Button";

export default function MembersCardCount({ memberCount }: { memberCount: number | undefined }) {
  const { write: mint } = useMintDaoboxNFT();

  return (
    <div className="card w-full bg-[#191B1E] text-neutral-content">
      <div className="flex h-full w-full flex-col space-y-2.5 px-8 py-8 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-2.5">
          <h2 className="card-title text-white">{memberCount ?? 0} Members</h2>
          <p className="font-semibold text-white">Wallet based</p>
        </div>
        <div>
          <Button
            text="Mint Token"
            clickFunction={() => {
              mint?.();
            }}
          />
        </div>
      </div>
    </div>
  );
}

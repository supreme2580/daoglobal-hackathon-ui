import Image from "next/image";
import Button from "./Button";
import { truncateAddress } from "@utils/addresses";
import { ClipboardDocumentIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import { Address } from "wagmi";
import Blockies from "react-blockies";
import { useDelegateNFT } from "@hooks/lens/useDelegateNFT";

export default function MemberProfileCard() {
  const router = useRouter();
  let { member } = router.query;
  const memberAddress = member as Address;
  const [clipped, setClipped] = useState("");

  const { write, submitStatus } = useDelegateNFT(memberAddress);

  return (
    <div className="card w-full bg-secondary text-neutral-content">
      <div className="flex h-full w-full flex-col space-y-2.5 px-8 py-8 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-2.5">
          <div className="flex w-full items-center space-x-3">
            <div className="relative h-10 w-10 shrink-0">
              <Blockies
                seed={memberAddress}
                size={11}
                className="overflow-hidden rounded-full ring-1 ring-primary"
              />
            </div>
            <h2 className="card-title text-primary">Okhai.eth</h2>
          </div>
          <div className="flex items-center space-x-1">
            <p className="text-sm font-semibold text-primary">
              {truncateAddress(memberAddress ?? "")}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(memberAddress).catch((error) => console.log(error));
                setClipped(memberAddress);
              }}
            >
              {clipped !== "" ? (
                <CheckBadgeIcon className="h-5 w-5 text-primary" />
              ) : (
                <ClipboardDocumentIcon className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
        <div>
          <Button
            text="Delegate"
            clickFunction={() => {
              write?.();
            }}
          />
        </div>
      </div>
    </div>
  );
}

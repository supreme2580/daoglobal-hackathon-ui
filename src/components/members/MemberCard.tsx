import { ArrowRightIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import Image from "next/legacy/image";
import Link from "next/link";
import { truncateAddress } from "../../utils/addresses";
import { Address } from "wagmi";
import { useBalanceAndPower } from "@hooks/lens/useBalanceAndPower";
import Blockies from "react-blockies";

export default function MemberCard({ member }: { member: Address }) {
  const { token } = useBalanceAndPower(member);

  return (
    <Link
      href={`/members/${member}`}
      className="border-neutral card w-full bg-secondary text-neutral-content shadow-xl hover:bg-secondary/50"
    >
      <div className="card-body items-center space-y-1 text-center">
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center space-x-3">
            <div className="relative h-10 w-10 shrink-0">
              <div className="avatar">
                <Blockies
                  seed={member}
                  size={10}
                  className="overflow-hidden rounded-full ring-2 ring-primary"
                />
              </div>
            </div>
            <h2 className="card-title max-w-full truncate text-primary">
              {truncateAddress(member ?? "")}
            </h2>
          </div>
          <div>
            <IdentificationIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
        <div className="w-full space-y-2.5">
          <div className="flex w-full items-center justify-start space-x-2">
            <div className="relative h-4 w-4">
              <Image src={"/bal-light.png"} layout="fill" alt="image" />
            </div>
            <p className="text-start text-primary">Token balance: {token?.balance ?? 0}</p>
          </div>
          <div className="flex w-full items-center justify-start space-x-2">
            <div className="relative h-4 w-4">
              <Image src={"/voting-power-light.png"} layout="fill" alt="image" />
            </div>
            <p className="text-start text-primary">Voting power: {token?.power ?? 0}</p>
          </div>
          <Link
            href={"/members/member"}
            className="flex max-w-fit items-center justify-start space-x-0.5"
          >
            <div>
              <p className="text-start text-sm text-daoboxg">View member profile</p>
            </div>
            <div>
              <ArrowRightIcon className="h-4 w-4 text-daoboxg" />
            </div>
          </Link>
        </div>
      </div>
    </Link>
  );
}

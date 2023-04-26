import { ArrowRightIcon, IdentificationIcon } from "@heroicons/react/24/outline"
import Image from "next/legacy/image"
import Link from "next/link"
import { truncateAddress } from "../../utils/addresses"

export default function MemberCard() {
    return (
      <Link
        href={"/members/member"}
        className="border-neutral shadow-xl card w-full bg-secondary text-neutral-content hover:bg-secondary/50"
      >
        <div className="card-body items-center space-y-1 text-center">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-full items-center space-x-3">
              <div className="relative h-10 w-10 shrink-0">
                <Image src={"/profile.png"} layout="fill" alt="Profile image" />
              </div>
              <h2 className="card-title max-w-full truncate text-primary">
                {truncateAddress("0x5C04F69c9603A808BF4157Ef959F1Ed1e16c0F73")}
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
              <p className="text-start text-primary">Token balance: 0.07 ETH</p>
            </div>
            <div className="flex w-full items-center justify-start space-x-2">
              <div className="relative h-4 w-4">
                <Image
                  src={"/voting-power-light.png"}
                  layout="fill"
                  alt="image"
                />
              </div>
              <p className="text-start text-primary">Voting power: 2.07</p>
            </div>
            <Link
              href={"/members/member"}
              className="flex max-w-fit items-center justify-start space-x-0.5"
            >
              <div>
                <p className="text-start text-sm text-daoboxg">
                  View member profile
                </p>
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
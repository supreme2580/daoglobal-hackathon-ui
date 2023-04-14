import { ArrowRightIcon, IdentificationIcon } from "@heroicons/react/24/outline"
import Image from "next/legacy/image"
import Link from "next/link"
import truncateEthAddress from 'truncate-eth-address'

export default function MemberCard() {
    return(
        <div className="card w-full bg-secondary text-neutral-content">
            <div className="card-body items-center text-center space-y-1">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center space-x-3 w-full">
                        <div className="w-10 h-10 relative shrink-0">
                            <Image src={"/profile.png"} layout="fill" alt="Profile image" />
                        </div>
                        <h2 className="card-title max-w-full truncate text-white">{truncateEthAddress("0x5C04F69c9603A808BF4157Ef959F1Ed1e16c0F73")}</h2>
                    </div>
                    <div>
                        <IdentificationIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
                <div className="w-full space-y-1">
                    <div className="flex space-x-2 items-center justify-start w-full">
                        <div className="w-4 h-4 relative">
                            <Image src={"/bal-light.png"} layout="fill" alt="image" />
                        </div>
                        <p className="text-start">Token balance: 0.07 ETH</p>
                    </div>
                    <div className="flex space-x-2 items-center justify-start w-full">
                        <div className="w-4 h-4 relative">
                            <Image src={"/voting-power-light.png"} layout="fill" alt="image" />
                        </div>
                        <p className="text-start">voting power: 2.07</p>
                    </div>
                    <Link href={"/"} className="flex items-center justify-start w-40 space-x-0.5">
                        <div>
                            <p className="text-sm text-start text-daoboxg">View member profile</p>
                        </div>
                        <div>
                            <ArrowRightIcon className="w-4 h-4 text-daoboxg" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
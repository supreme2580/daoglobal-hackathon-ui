import { IdentificationIcon } from "@heroicons/react/24/outline"
import Image from "next/legacy/image"
import truncateEthAddress from 'truncate-eth-address'

export default function MemberCard() {
    return(
        <div className="card w-full bg-black text-neutral-content">
            <div className="card-body items-center text-center">
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
                <p>We are using cookies for no reason.</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Accept</button>
                <button className="btn btn-ghost">Deny</button>
                </div>
            </div>
        </div>
    )
}
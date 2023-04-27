import Image from "next/image";
import Button from "./Button";
import { truncateAddress } from "@utils/addresses";
import { ClipboardDocumentIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function MemberProfileCard() {
    const [clipped, setClipped] = useState("")
    return(
        <div className="card w-full bg-secondary text-neutral-content">
            <div className="px-8 py-8 w-full h-full flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2.5 sm:space-y-0">
                <div className="space-y-2.5">
                    <div className="flex items-center space-x-3 w-full">
                        <div className="w-10 h-10 relative shrink-0">
                            <Image src={"/profile.png"} layout="fill" alt="image" />
                        </div>
                        <h2 className="card-title text-primary">Okhai.eth</h2>
                    </div>
                    <div className="flex items-center space-x-1">
                        <p className="font-semibold text-primary text-sm">{truncateAddress("0x5C04F69c9603A808BF4157Ef959F1Ed1e16c0F73")}</p>
                        <button onClick={() => {
                            navigator.clipboard.writeText("0x5C04F69c9603A808BF4157Ef959F1Ed1e16c0F73").catch(error => console.log(error))
                            setClipped("0x5C04F69c9603A808BF4157Ef959F1Ed1e16c0F73")
                        }}>
                            {
                                clipped !== "" ? <CheckBadgeIcon className="w-5 h-5 text-primary" /> : <ClipboardDocumentIcon className="w-5 h-5 text-white" />
                            }
                        </button>
                    </div>
                </div>
                <div>
                    <Button text="Delegate" clickFunction={() => {
                        console.log("Clicked");
                    }} />
                </div>
            </div>
        </div>
    )
}